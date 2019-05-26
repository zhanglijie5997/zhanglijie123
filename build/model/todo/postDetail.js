"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postMsg_1 = require("../postMsg");
const todo_1 = require("./todo");
class PostDetail extends postMsg_1.PostMsg {
    /**
     *
     * @param props        posts数据
     * @param todoData     todo数据
     * @param postImages   图片数组
     */
    constructor(props, todoData, postImages) {
        super(props);
        this.price = props.price;
        this.currency = props.current;
        this.todos = todoData.map((item) => {
            return new todo_1.Todo(item);
        });
        this.img = postImages;
    }
}
exports.default = PostDetail;
