"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const postMsg_1 = require("../../model/postMsg");
// 请求所有数据
exports.apiGetPosts = (req, res, next) => {
    res.json(data_1.DataStore.post.map((item) => {
        // console.log(item,'555')
        return new postMsg_1.PostMsg(item);
    }));
};
