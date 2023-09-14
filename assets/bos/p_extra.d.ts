export { }

declare global {
    namespace p_extra {
        /**
         * 原生库的版本。 目前是直接使用编译时间戳。 `__TIMESTAMP__`
         */
        const nativeVersion: string
    }
}