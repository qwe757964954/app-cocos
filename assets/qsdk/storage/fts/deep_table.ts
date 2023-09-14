export class DeepTable {

    private __data: { [key: string]: DeepTable } = {}
    private __values: { [key: string]: any } = {}

    get(key: string): DeepTable {
        let value = this.__data[key]
        if (value == null) {
            value = new DeepTable()
            this.__data[key] = value
        }
        return value
    }

    each(fun: (key: string, tb: DeepTable) => void) {
        for (let key in this.__data) {
            fun(key, this.__data[key])
        }
    }

    getValue(key: string): any {
        return this.__values[key]
    }

    setValue(key: string, value: any) {
        this.__values[key] = value
    }

    eachValues(fun: (key: string, value: any) => void) {
        for (let key in this.__values) {
            fun(key, this.__values[key])
        }
    }
}