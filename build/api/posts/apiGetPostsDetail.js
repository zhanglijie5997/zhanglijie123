"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const postDetail_1 = __importDefault(require("../../model/todo/postDetail"));
// 请求单个数据
exports.apiGetPostsDetail = (req, res, next) => {
    const selectedPost = data_1.DataStore.post.find((element) => element.id == req.params.id);
    console.log(selectedPost);
    if (selectedPost) {
        const selectTodos = data_1.DataStore.todo.filter((data, index) => {
            return data.postId == req.params.id;
        });
        const imgUrls = selectedPost.img.map((item, index) => {
            if (req.app.get("env") == "development") {
                return "http://localhost:8091/static/" + item;
            }
            else {
                return "https://www.baiud.com/" + item;
            }
        });
        console.log(imgUrls, 444);
        res.json(new postDetail_1.default(selectedPost, selectTodos, imgUrls));
    }
    else {
        res.status(404).json({ status: 4001, message: "dont\'t have" });
    }
};
