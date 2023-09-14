
const COLOR_BLACK = "#cccccc"
const COLOR_BLUE = "#497ed5"

export namespace Utils {

    export function richtext(msg: string) {
        msg = msg.replace(/<<</g, `<color=${COLOR_BLUE}>`)
            .replace(/>>>/g, "</color>")
        msg = `<color=${COLOR_BLACK}>` + msg + "</color>"
        return msg
    }
}