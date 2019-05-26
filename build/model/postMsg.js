"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostMsg {
    constructor(data) {
        this.userId = data.userId;
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.img = data.img;
    }
}
exports.PostMsg = PostMsg;
