"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbScheam_1 = require("../../model/mongodbScheam");
const message_1 = require("../../model/todo/message");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("../mongodbClient/mongodb");
exports.default = (req, res, next) => {
    // console.log(req.body);
    const userEmail = req.body.email;
    console.log(userEmail);
    // 查找是否存在用户
    mongodbScheam_1.UserMsg.findOne({ email: userEmail })
        .then((user) => {
        console.log(user, 666);
        // 存在用户
        if (user) {
            // res.status(404).json({
            //     status: 40004,
            //     message: "User already exists"
            // })
            res.json(new message_1.apiError("User already exists", "User already exists", 4004));
            console.log(`注册账号存在`);
        }
        else {
            // 定义规则
            let newPwd = '';
            const rule = {
                id: req.body.email,
                name: req.body.password
            };
            // jwt.sign("规则","加密名字","过期时间",()=>{});
            new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign(rule, mongodb_1.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err)
                        throw err;
                    // newPwd = token;
                    // console.log(token);
                    resolve(token);
                });
            }).then(data => {
                console.log(data);
                // 不存在就写入
                const newUser = new mongodbScheam_1.UserMsg({
                    name: req.body.name,
                    email: req.body.email,
                    password: data
                });
                newUser.save((err, next) => {
                    if (err)
                        throw err;
                    /* res.status(200).json({
                        status: 1000,
                        message: "loading..."
                    }) */
                    res.json(new message_1.publicInfo("success", 1000, {
                        email: req.body.email,
                        token: data
                    }));
                    console.log(`新用户添加成功`);
                });
            });
        }
    });
};
