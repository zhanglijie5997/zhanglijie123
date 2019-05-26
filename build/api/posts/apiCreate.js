"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const data_1 = require("../../data/data");
const message_1 = require("../../model/todo/message");
exports.apiCreate = (req, res, next) => {
    // console.log(req.body);
    const requireFile = ["title", "body"];
    const giveReq = Object.getOwnPropertyNames(req.body);
    if (!requireFile.every(fild => giveReq.includes(fild))) {
        console.log(110);
        let data = new message_1.apiError("Data missing", "not all require", 4004);
        console.log(data);
        return res.json(data);
    }
    const user = {
        id: v4_1.default(),
        userId: req.body.userId || 1,
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        current: req.body.current,
        img: []
    };
    data_1.DataStore.post.push(user);
    // res.json(user)
    res.json(new message_1.publicInfo("success", 1000, {
        post: user
    }));
};
