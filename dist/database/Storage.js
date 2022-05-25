"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const fs_1 = require("fs");
const util_1 = require("util");
class Storage {
    dbFilePath;
    readKey;
    data = {};
    constructor(dbFilePath, readKey) {
        this.dbFilePath = dbFilePath;
        this.readKey = readKey;
    }
    async read() {
        const fileData = await this.readAndParseFile();
        if (typeof fileData[this.readKey] !== "object") {
            console.log(fileData[this.readKey]);
            throw Error(`Key "${this.readKey}" of file ${this.dbFilePath} must contain an object.`);
        }
        this.data = fileData[this.readKey];
    }
    async write() {
        const promisifyWriteFile = (0, util_1.promisify)(fs_1.writeFile);
        const fileData = await this.readAndParseFile();
        fileData[this.readKey] = this.data;
        await promisifyWriteFile(this.dbFilePath, JSON.stringify(fileData));
    }
    async readAndParseFile() {
        const promisifyReadFile = (0, util_1.promisify)(fs_1.readFile);
        const fileText = await promisifyReadFile(this.dbFilePath, {
            encoding: "utf-8",
        });
        return JSON.parse(fileText);
    }
}
exports.Storage = Storage;
