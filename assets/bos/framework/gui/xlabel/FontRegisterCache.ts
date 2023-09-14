export class FontRegisterCache {
    protected constructor() { }
    public static _instance = new FontRegisterCache();
    public static getInstance() {
        return this._instance;
    }

    private _cache: Map<string, string> = new Map();
    private _customFamilyCount = 0;

    public check_register_font_custom(path: string) {
        let tag = this._cache.get(path);
        if (tag != null) {
            return tag;
        }

        tag = `CustomFarmily_${this._customFamilyCount++}`

        this._cache.set(path, tag)

        return tag
    }


}