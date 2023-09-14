export { }

declare global {

    /**
     * 敏感词库 (仅native平台)
     * 
     * @example
     * ```ts
     * let sensitive = new p_sensitive.WordDetectorUTF8()
     * 
     * sensitive.add_entry([1,"毛",0,0,1])
     * sensitive.add_entries([
     *  [2,"泽",0,0,1],
     *  [3,"东",0,0,1],
     * ])
     * 
     * let text = sensitive.replace_all("mz东", "*")
     * let flag = sensitive.is_valid("m泽东")
     * 
     * sensitve.delete_entry([1,"毛",0,0,1])
     * sensitve.delete_entries([
     *  [2,"泽",0,0,1],
     *  [3,"东",0,0,1],
     * ])
     * sensitive.clearall_entries()
     * ```
     */
    namespace p_sensitive {

        type Entry = [
            id: number,
            text: string,
            sensitive_type: number,
            match_mode: MatchMode,
            version: number,
        ]

        enum MatchMode {
            MatchModeDefault = 0,
            MatchModeNormal = 1,
            MatchModePinyin = 2,
        }

        class WordDetectorUTF8 {
            get version(): number
            add_entry(entry: Entry): void
            add_entries(entries: Entry[]): void
            delete_entry(entry: Entry): void
            delete_entries(entries: Entry[]): void
            clear_all_entries(): void
            is_valid(text: string): boolean
            replace_all(text: string, replacement: string): string
            convert_to_pinyin(text: string, seperator: string): string
        }

    }

}
