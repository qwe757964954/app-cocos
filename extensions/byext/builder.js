'use strict';

var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var tools;
(function (tools) {
    function log(...args) {
        console.log("byext", ...args);
    }
    tools.log = log;
    function warn(...args) {
        console.warn("byext", ...args);
    }
    tools.warn = warn;
    function gitHash() {
        console.log("cwd", process.cwd());
        console.log("__filename", __filename);
        console.log("__dirname", __dirname);
        console.log("Editor.Project.path", Editor.Project.path);
        let hash;
        try {
            hash = child_process.execSync("git rev-parse HEAD", { encoding: "utf-8", cwd: Editor.Project.path });
            if (hash) {
                hash = hash.trim();
            }
        }
        catch (e) {
            log(e);
        }
        return hash;
    }
    tools.gitHash = gitHash;
    function isMainProcess() {
        for (let arg of process.argv) {
            if (arg.includes("--type") && arg.includes("renderer")) {
                return false;
            }
        }
        return true;
    }
    tools.isMainProcess = isMainProcess;
    function readDirRecursive(root) {
        let rtn = [];
        function read(parent) {
            let names = fs.readdirSync(parent);
            for (let name of names) {
                let p = path.join(parent, name);
                let stat = fs.statSync(p);
                if (stat.isFile()) {
                    rtn.push(p);
                }
                else if (stat.isDirectory()) {
                    read(p);
                }
            }
        }
        read(root);
        return rtn;
    }
    tools.readDirRecursive = readDirRecursive;
})(tools || (tools = {}));

let load = () => __awaiter(void 0, void 0, void 0, function* () {
    tools.log("builder.load");
});
let unload = () => __awaiter(void 0, void 0, void 0, function* () {
    tools.log("builder.unload");
});
const configs = {
    "*": {
        hooks: "./hooks",
    },
};

exports.configs = configs;
exports.load = load;
exports.unload = unload;
