"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const message_1 = require("../../model/todo/message");
exports.apiDeletePost = (req, res, next) => {
    const postIndex = data_1.DataStore.post.findIndex((item) => {
        return item.id == req.params.id;
    });
    if (postIndex > -1) {
        data_1.DataStore.post.splice(postIndex, 1);
        res.status(200).json(new message_1.publicInfo("success", 1000, {
            post: "success"
        }));
    }
    else {
        res.status(404).json(new message_1.apiError("don\'t have", "default", 4004));
    }
};
