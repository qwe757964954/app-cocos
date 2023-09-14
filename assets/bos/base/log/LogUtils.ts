export function getCallStack(index: number): string {
    var e = new Error();
    var lines = e.stack!.split("\n");
    var line = lines[index]
    return line.trim()
}

export function getDateString(): string {
    let d = new Date();
    let str = d.getHours().toString();
    let timeStr = "";
    timeStr += (str.length == 1 ? "0" + str : str) + ":";
    str = d.getMinutes().toString();
    timeStr += (str.length == 1 ? "0" + str : str) + ":";
    str = d.getSeconds().toString();
    timeStr += (str.length == 1 ? "0" + str : str) + ":";
    str = d.getMilliseconds().toString();
    if (str.length == 1) str = "00" + str;
    if (str.length == 2) str = "0" + str;
    timeStr += str;

    return timeStr;
}