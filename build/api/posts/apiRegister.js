"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbScheam_1 = require("../../model/mongodbScheam");
const message_1 = require("../../model/todo/message");
exports.default = (req, res, next) => {
    // console.log(req.body);
    const userEmail = req.body.email;
    console.log(userEmail);
    // 查找是否存在用户
    mongodbScheam_1.UserMsg.findOne({ email: userEmail })
        .then(user => {
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
            // 不存在就写入
            const newUser = new mongodbScheam_1.UserMsg({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save((err, next) => {
                if (err)
                    throw err;
                res.json(new message_1.publicInfo("success", 1000, {
                    email: req.body.email,
                }));
                console.log(`新用户添加成功`);
            });
        }
    });
    return true;
};
