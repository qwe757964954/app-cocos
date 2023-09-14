import { md5 } from 'bos/base/crypto/md5';
import { log } from "cc";
import { IGetSTSResp, OSS as OSSService } from 'idl/mpff/storage/oss.v1';
import COS_CLZ from './lib/cos-js-sdk-v5.js';
import { DEBUG } from 'cc/env';
// import * from "idl/mpff/storage/oss.v1";

const COSCODE = "COS://"
const OSSCODE = "OSS://"

export class OSS {
    private static instance: OSS;

    private STSResp: IGetSTSResp | null = null

    private cos: COS = null

    private m_retryNum: number = 0;     //当前尝试次数
    private m_MaxRetryNum: number = 3;  //最大重视次数

    private constructor() { }

    public static getInstance() {
        if (!OSS.instance) {
            OSS.instance = new OSS();
        }
        return OSS.instance;
    }



    public isExpired(): boolean {
        let expire = this.STSResp?.credentials.expire || 0
        return expire < Math.floor(new Date().getTime() / 1000)
    }

    public getObjectUrl(key: string, cb: (url: string) => void) {
        if (this.cos) {
            if (this.isExpired()) {
                this.init();
            }
            this.cos.getObjectUrl({
                Bucket: this.STSResp.credentials.bucket, /* 填写自己的 bucket，必须字段 */
                Region: this.STSResp.credentials.region,     /* 存储桶所在地域，必须字段 */
                Key: this.STSResp.credentials.dir + key,           /* 列出目录 a 下所有文件，非必须 */
            }, function (err, data) {
                if (err) {
                    console.log(err);
                    cb("")
                    return;
                }
                cb(data.Url);
            });
        } else {
            cb("")
        }
    }

    async getObjectUrlAsync(key: string): Promise<string> {
        return new Promise<string>(r => {
            this.getObjectUrl(key, r)
        })
    }

    async init() {
        let { err, resp } = await OSSService.GetSTS({})
        if (err) {
            if (this.m_retryNum < this.m_MaxRetryNum) {
                this.m_retryNum++;
                this.init();
            }
            return
        }
        log("init success", resp)
        this.m_retryNum = 0;
        this.STSResp = resp
        var cos = new COS_CLZ({
            // getAuthorization 必选参数
            getAuthorization: function (_, callback) {
                // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/blob/master/scope.md
                // 异步获取临时密钥
                let credentials = resp.credentials
                let data: any = {
                    TmpSecretId: credentials!.accessKeyID,
                    TmpSecretKey: credentials!.accessKeySecret,
                    SecurityToken: credentials!.securityToken,
                    // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: Math.floor(new Date().getTime() / 1000), // 时间戳，单位秒，如：1580000000
                    ExpiredTime: credentials!.expire, // 时间戳，单位秒，如：1580000000
                    ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
                }
                callback(data);

            }
        });
        this.cos = cos
    }

    async putObject(key: string, file: COS.UploadBody, onProgress: (progressData: number) => void) {
        if (this.cos) {
            if (this.isExpired()) {
                await this.init();
            }
            return new Promise<{ err, url: string }>((resolve, reject) => {
                this.cos.putObject({
                    Bucket: this.STSResp.credentials.bucket, /* 填写自己的 bucket，必须字段 */
                    Region: this.STSResp.credentials.region,     /* 存储桶所在地域，必须字段 */
                    Key: this.STSResp.credentials.dir + key,           /* 列出目录 a 下所有文件，非必须 */
                    Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
                    onProgress: function (progressData) {
                        if (onProgress) {
                            onProgress(progressData.percent)
                        }
                    }
                }, function (err, data) {
                    resolve({ err: err, url: key })
                });
            })
        }
    }

    async uploadFile(file: COS.UploadBody, opt?: { prefix: string, onProgress?: (progressData: number) => void }) {
        let prefix = opt?.prefix || ""
        let key: string
        if (file instanceof ArrayBuffer) {
            key = md5(file)
        } else if (typeof file == "string") {
            key = md5(file)
        } else {
            console.warn("uploadFile在native平台仅支持string/ArrayBuffer")
            key = md5(await file.arrayBuffer())
        }
        key = prefix + key
        let isExist = await this.doesObjectExist(key)

        let url = COSCODE + key
        if (isExist == true) {
            return new Promise<{ err, url: string }>((resolve, reject) => {
                resolve({ err: null, url: url })
            })
        } else {
            let ret = await this.putObject(key, file, opt.onProgress)
            return new Promise<{ err, url: string }>((resolve, reject) => {
                resolve({ err: ret.err, url: url })
            })
        }
    }

    async doesObjectExist(key: string) {
        if (this.cos) {
            if (this.isExpired()) {
                await this.init();
            }
            return new Promise((resolve, reject) => {
                this.cos.headObject({
                    Bucket: this.STSResp.credentials.bucket, /* 填写自己的 bucket，必须字段 */
                    Region: this.STSResp.credentials.region,     /* 存储桶所在地域，必须字段 */
                    Key: this.STSResp.credentials.dir + key,           /* 列出目录 a 下所有文件，非必须 */
                }, function (err, data) {
                    if (data) {
                        resolve(true)
                    } else if (err.statusCode == 404) {
                        // console.log('对象不存在');
                        resolve(false)
                    } else if (err.statusCode == 403) {
                        resolve(false)
                    }
                });
            })
        }
    }
}


// http://266qsdk-1251100214.cos.ap-shanghai.myqcloud.com/007f01d96d040e6459ac136997752d01.jpg?q-sign-algorithm=sha1&q-ak=AKIDFdbYvTpkmN3sMqQLq93uRYRZ4D0YayUGeV3Ngvd_YHvzPKWaoa8xNxWS7XgAlyhH&q-sign-time=1685445831;1685448470&q-key-time=1685445831;1685448470&q-header-list=host&q-url-param-list=&q-signature=eb35f47c4aa01d82aab164b737dd3a5297b220e6&x-cos-security-token=4hEyjjtAfofSn2A9rgGmrYuxB8OhDm0a2b2b1c91d0af811674bdac405193508bNpXPtJGW72gM2M5VRFgJFoDk8Y1aK-H3DXtQ5YBiux-LW5Md6WvKfAzSBPSpBb6ja6hDohF9Ny2bXzeM95pWsusgl_0zjhNoTVFIVrjpK2WIF5j48mGN2By8YrokXD-5DjMyzHW3KK1UgniXkws0U-X9g1S0_QB28tAKLAFydhWOhZ1D71fVGoUkDdIP9gOMhsHeGzojBrycR6_yZfKFg9nTiRFmA8ekmsFAEXLYoQdVziuzIEidGDRxT18iG7OfbL1HIvV5_G2FlaBOwq2z6z2ldIboqVhuKwm3XElVt9seQG9o69gT2_8K3v8uRaNTOHuXQXLt1MSUjSaAG4JfFM3Awj75GMpzrIA70utMxzl2u00Z5pWEEyXIbmuxH3ACc7pPBHbRfTgopSGMPKPEct-7uXjFYdKHH58eVtzbJNleLTWD8u0tOrPZ65xblz0W8-tRwbExulveKSnaKpxISPFE4AGu--yTHppY59sDVRoZMKq0lS-dGLp6ahOiBnRb4P8h0WbTCDBFI_TtP6KU501PpqzE6M0_s9_QVi6nIxqxCyOW0BZQ6PS9OqyR13IV2bqkgg3CByOICyySPJc3MzXwtD3JGKXbaoay3G8dULTbrfgfjD7-neWSlP6XEGJr