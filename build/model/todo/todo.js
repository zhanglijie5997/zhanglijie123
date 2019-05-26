"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor(data) {
        this.id = data.id;
        this.postId = data.postId;
        this.start = data.start;
        this.message = data.message;
        this.userName = data.userName;
        this.price = data.price;
        this.current = data.current;
    }
}
exports.Todo = Todo;
