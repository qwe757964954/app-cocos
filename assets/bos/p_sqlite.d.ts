export { }

declare global {
    namespace p_sqlite {

        interface DB { }

        /**
         * sqlite.exec 的返回值
         */
        interface NativeExecResult {
            finish?: boolean
            errmsg?: string
            updated: number
            rowid: number
            keys?: string[]
            values?: string[]
            rows: { keys: string[], values: string[] }[]
        }

        type ExecCallback = (result: NativeExecResult) => void

        /**
         * 创建或者打开数据库
         * @param filePath 绝对路径
         * @returns db句柄
         */
        function open(filePath: string): DB

        /**
         * 关闭数据库
         * @param db 
         * @returns 返回错误
         */
        function close(db: DB): string

        /**
         * 执行语句
         * @param db 
         * @param sql 
         * @param cb
         * @param callOnce  如果传true，查询操作只会回调一次，结果里会有 rows 字段，是所有查询到的数据
         */
        function exec(db: DB, sql: string, cb?: ExecCallback, callOnce?: boolean): string

        /**
         * 加载一个sqlite插件
         * @param db 
         * @param lib 
         * @param entry  入口函数，传空就自动查找
         * 
         * @returns 错误
         */
        function load_plugin(db: DB, lib: string, entry?: string): string
    }
}