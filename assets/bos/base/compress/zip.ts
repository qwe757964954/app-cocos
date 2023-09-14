import { NATIVE } from "cc/env";

export namespace zip {
    /**
     * 解压zip文件
     * @param zipFile 
     * @param outDir 
     * @returns error
     */
    export function unzip(zipFile: string, outDir: string): string {
        if (!NATIVE) {
            throw new Error("仅支持native")
        }
        let p_zip = window["p_zip"]
        return p_zip.unzip(zipFile, outDir)
    }

    /**
     * 把目录压缩为zip
     * @param srcDir 
     * @param outFile 
     * @param level 压缩等级  0-10，默认值6
     * @returns error
     */
    export function zip(srcDir: string, outFile: string, level: number = 6): string {
        if (!NATIVE) {
            throw new Error("仅支持native")
        }
        let p_zip = window["p_zip"]
        return p_zip.zip(srcDir, outFile, level)
    }
}