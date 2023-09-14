export interface XFile {
    /**
     * 文件扩展名，包括.  如 .png   .txt
     */
    get ext(): string
    /**
     * 文件名， 仅名字，不含路径。  如  icon.png
     */
    get name(): string
    /**
     * 文件大小。 字节
     */
    get fileSize(): number
    arrayBuffer(): Promise<ArrayBuffer>
}