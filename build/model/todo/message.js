"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class apiError extends Error {
    /**
     *
     * @param name     名称
     * @param message  信息
     * @param status   状态码
     */
    constructor(name, message, status) {
        super();
        this.status = status;
        this.name = name;
        this.message = message;
        this.status = status;
    }
}
exports.apiError = apiError;
class publicInfo {
    constructor(message, status, data) {
        this.status = status;
        this.data = data;
    }
}
exports.publicInfo = publicInfo;
