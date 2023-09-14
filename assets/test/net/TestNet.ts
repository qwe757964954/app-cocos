import { md5 } from 'bos/base/crypto/md5';
import { Net, NetImage } from 'bos/exports';
import { XComponent } from 'bos/framework/component/XComponent';
import { SpriteFrame, _decorator, native } from 'cc';
import { NATIVE } from 'cc/env';
import { Picture } from 'qsdk/exports';
const { ccclass, property } = _decorator;

/**
 * Net.downloader / NetImage / Picture  相关测试
 */
@ccclass('TestNet')
export class TestNet extends XComponent {

    @property(NetImage)
    private netImg: NetImage

    @property(Picture)
    private picture: Picture

    @property(Picture)
    private pictures: Picture[] = []

    start() {
        this.netImg.node.on(NetImage.EVENT_IMAGE_LOADED, (frame: SpriteFrame) => {
            console.log("图片加载完成", frame)
            if (frame) {
                console.log("图片大小", frame.width, frame.originalSize)
            }
        })
        this.netImg.setUrl("https://httpbin.veikr.com/image/png").then(frame => {
            console.log(frame.width, frame.originalSize)
        })

        let urls = [
            "http://266qsdk-1251100214.cos.ap-shanghai.myqcloud.com/mp_resource/im_a18b0f3fc6da6fef558e3105a14a7d21?q-sign-algorithm=sha1&q-ak=AKIDe0O84PXDQPevU3eaLYRwsadNc7x4pT40gBqnEM0VbpZbV43_wZUonNg-fBZ5mYDD&q-sign-time=1689129464;1689130851&q-key-time=1689129464;1689130851&q-header-list=host&q-url-param-list=&q-signature=4827e238aaad1293f39cc60a9f5d70ee64414e96&x-cos-security-token=1QwyARupimyBf67SmMGyELG1zaMjXX5a73e3ffbaa0812817d00142c9e29150c1_3ORLtlkWmXF52heoHE_cscIGbs8BYg8nzbi4EnN05KI5IN6zjVrp34tdFeByBCVNb8nUAbD6N9tJuglZrpEfAijRRMSNOzbAHPIKZ16fWXmB9Ht6a-Uqrb-siyycihNgJr6IDtl_uS4eTwkp1ujeP9GQPBxRdA13mOqYR71wXZPSP6PQHsW4xwDYOfnDS9xYsoFsGuXPyhHofwiLA3nBLCWD_q-egsSgU9QmuqEHeImrRVZARtr569SR84bWxtprMyZatzsH75pLy9RZIOVy0op2iOQj8O37JWCFznd6GBJ8Q2VZCCjKJynvgJvWzQiWt-3UoSXB8uxDEfoXiIDBGKDaG0N7jwmFEeZIl7fWf2Eyz5hGSgCbg7GNPJQt5qAv3_cuuaHdUbOUrne5ZBTmtUZZ-cng4Mb3KeYot--cjiSFvLAcg5QXZTqMIAfURNjrplb8fkH-Y0nepqPIdutY17MT3qru78p_6db6T7LxJnzdrlVgxAfI_ytl5N4MOMGd0CoddLeFDUrzowwtiPZ2rBGXUNGJOOWv4AqTPqnbhe5nf_J73d4nRNdXdtknyj3StUYcFVVg1fRivZW6Ba1S1kTjkNCmi2EnDTgnXrKFO6Qu8uiVEdy2FWGj1k-tj4F&imageMogr2/thumbnail/500x540",
            "http://266qsdk-1251100214.cos.ap-shanghai.myqcloud.com/mp_resource/im_eba966af93929bfacca76b3db42fa3b7?q-sign-algorithm=sha1&q-ak=AKIDe0O84PXDQPevU3eaLYRwsadNc7x4pT40gBqnEM0VbpZbV43_wZUonNg-fBZ5mYDD&q-sign-time=1689129464;1689130851&q-key-time=1689129464;1689130851&q-header-list=host&q-url-param-list=&q-signature=32b8f332c82f42d23f4c58eaae307bbe8bbecd2b&x-cos-security-token=1QwyARupimyBf67SmMGyELG1zaMjXX5a73e3ffbaa0812817d00142c9e29150c1_3ORLtlkWmXF52heoHE_cscIGbs8BYg8nzbi4EnN05KI5IN6zjVrp34tdFeByBCVNb8nUAbD6N9tJuglZrpEfAijRRMSNOzbAHPIKZ16fWXmB9Ht6a-Uqrb-siyycihNgJr6IDtl_uS4eTwkp1ujeP9GQPBxRdA13mOqYR71wXZPSP6PQHsW4xwDYOfnDS9xYsoFsGuXPyhHofwiLA3nBLCWD_q-egsSgU9QmuqEHeImrRVZARtr569SR84bWxtprMyZatzsH75pLy9RZIOVy0op2iOQj8O37JWCFznd6GBJ8Q2VZCCjKJynvgJvWzQiWt-3UoSXB8uxDEfoXiIDBGKDaG0N7jwmFEeZIl7fWf2Eyz5hGSgCbg7GNPJQt5qAv3_cuuaHdUbOUrne5ZBTmtUZZ-cng4Mb3KeYot--cjiSFvLAcg5QXZTqMIAfURNjrplb8fkH-Y0nepqPIdutY17MT3qru78p_6db6T7LxJnzdrlVgxAfI_ytl5N4MOMGd0CoddLeFDUrzowwtiPZ2rBGXUNGJOOWv4AqTPqnbhe5nf_J73d4nRNdXdtknyj3StUYcFVVg1fRivZW6Ba1S1kTjkNCmi2EnDTgnXrKFO6Qu8uiVEdy2FWGj1k-tj4F&imageMogr2/thumbnail/500x540",
            "http://266qsdk-1251100214.cos.ap-shanghai.myqcloud.com/mp_resource/im_ddb5f4ec2e1f9d05ee6bb8babb7c88a6?q-sign-algorithm=sha1&q-ak=AKIDe0O84PXDQPevU3eaLYRwsadNc7x4pT40gBqnEM0VbpZbV43_wZUonNg-fBZ5mYDD&q-sign-time=1689129464;1689130851&q-key-time=1689129464;1689130851&q-header-list=host&q-url-param-list=&q-signature=837b150ffc06971a87cca34c2c9f8a8c526af21b&x-cos-security-token=1QwyARupimyBf67SmMGyELG1zaMjXX5a73e3ffbaa0812817d00142c9e29150c1_3ORLtlkWmXF52heoHE_cscIGbs8BYg8nzbi4EnN05KI5IN6zjVrp34tdFeByBCVNb8nUAbD6N9tJuglZrpEfAijRRMSNOzbAHPIKZ16fWXmB9Ht6a-Uqrb-siyycihNgJr6IDtl_uS4eTwkp1ujeP9GQPBxRdA13mOqYR71wXZPSP6PQHsW4xwDYOfnDS9xYsoFsGuXPyhHofwiLA3nBLCWD_q-egsSgU9QmuqEHeImrRVZARtr569SR84bWxtprMyZatzsH75pLy9RZIOVy0op2iOQj8O37JWCFznd6GBJ8Q2VZCCjKJynvgJvWzQiWt-3UoSXB8uxDEfoXiIDBGKDaG0N7jwmFEeZIl7fWf2Eyz5hGSgCbg7GNPJQt5qAv3_cuuaHdUbOUrne5ZBTmtUZZ-cng4Mb3KeYot--cjiSFvLAcg5QXZTqMIAfURNjrplb8fkH-Y0nepqPIdutY17MT3qru78p_6db6T7LxJnzdrlVgxAfI_ytl5N4MOMGd0CoddLeFDUrzowwtiPZ2rBGXUNGJOOWv4AqTPqnbhe5nf_J73d4nRNdXdtknyj3StUYcFVVg1fRivZW6Ba1S1kTjkNCmi2EnDTgnXrKFO6Qu8uiVEdy2FWGj1k-tj4F&imageMogr2/thumbnail/500x540"
        ]

        for (let i = 0; i < 3; i++) {
            this.pictures[i].setUrl(urls[i])
        }

        // this.picture.setUrl("oss://mytestkey.png")
        // this.picture.setUrl("oss://mytestkey.pnt")
        this.picture.setUrl("https://httpbin.veikr.com/image/jpeg")
        this.testDownloader()
    }

    private async testDownloader() {
        if (!NATIVE) {
            console.log("download仅支持native")
            return
        }

        {
            console.log("------------测试下载文件")
            let url = "https://httpbin.veikr.com/image/webp"
            let r = await Net.downloader.downloadAsync({ url: url })
            console.log(r)
            if (r.success) {
                console.log(r.req.localPath)
                let ab = await Net.downloader.getData(r.req.localPath)
                console.log("read downloaded file in any platform", ab)
                if (NATIVE) {
                    let ab = native.fileUtils.getDataFromFile(r.req.localPath)
                    console.log("read downloaded file in native", ab)
                }
            }
        }

        {
            console.log("-------------把文件下载到指定位置")
            let url = "https://httpbin.veikr.com/image/svg"
            let localPath = ""
            if (NATIVE) {
                localPath = native.fileUtils.getWritablePath() + "/mytestfile.svg"
            } else {
                localPath = md5(url)
            }
            // 也可以直接  localPath = "/sdf/asdf/asfd/asdf.webp" 。 写死的绝对路径在web上也是可用的(模拟的，并不能直接访问本机的这个文件)
            let r = await Net.downloader.downloadAsync({ url: url, localPath: localPath })
            console.log(r)
        }

        {
            console.log("-------不指定localPath,但后续需要直接读此文件")
            let url = "https://httpbin.veikr.com/image/svg"
            let localPath = md5(url)
            localPath = Net.downloader.getLocalPath(localPath)
            console.log("文件的真实路径", localPath)
            let exists = await Net.downloader.exists(localPath)
            console.log("exists", exists)
            let ab = await Net.downloader.getData(localPath)
            console.log("content", ab)
            if (NATIVE) {
                ab = native.fileUtils.getDataFromFile(localPath)
                console.log("read on native", ab)
            }
        }

        {
            console.log("从所有平台删除某文件")
            let url = "https://httpbin.veikr.com/image/svg"
            let localPath = md5(url)
            localPath = Net.downloader.getLocalPath(localPath)
            console.log(url, localPath)
            Net.downloader.delete(localPath)
        }

        {
            console.log("测试同时多个请求下载同一个文件，只会下载一次，但都能收到回调")
            let url = "https://httpbin.veikr.com/json"

            for (let i = 0; i < 10; i++) {
                let task = Net.downloader.download({ url: url }, {
                    onFinish: (r) => {
                        console.log("result", i, r)
                    }
                })
                if (i % 2 == 0) {
                    task.cancel()
                }
            }
        }

        {
            console.log("测试同时多个请求下载同一个文件，保存到不同位置")
            let url = "https://httpbin.veikr.com/json"

            let root = NATIVE ? native.fileUtils.getWritablePath() + "/" : ""
            for (let i = 0; i < 10; i++) {
                let task = Net.downloader.download({ url: url, localPath: `${root}/testfiles_${i}` }, {
                    onFinish: (r) => {
                        console.log("result 2>", i, r)
                    }
                })
                if (i % 2 == 0) {
                    task.cancel()
                }
            }
        }

        {
            console.log("如果localpath相同，但url不同，不可重复添加任务")
            Net.downloader.download({ url: "https://httpbin.veikr.com/json", localPath: "test.json" }, {
                onFinish: (r) => {
                    console.log(r)
                }
            })
            Net.downloader.download({ url: "https://httpbin.veikr.com/stream/1", localPath: "test.json" }, {
                onFinish: (r) => {
                    console.log(r)
                }
            })
        }
    }

}