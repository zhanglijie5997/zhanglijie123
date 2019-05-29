"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbScheam_1 = require("../../model/mongodbScheam");
const message_1 = require("../../model/todo/message");
const bcrypt_1 = __importDefault(require("bcrypt"));
const gravatar_1 = __importDefault(require("gravatar"));
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
            const saltRounds = 10;
            // 用户头像
            const avatar = gravatar_1.default.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
            const newUser = new mongodbScheam_1.UserMsg({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            // 密码加密
            bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
                bcrypt_1.default.hash(newUser.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser.save((err, next) => {
                        if (err)
                            throw err;
                        res.json(new message_1.publicInfo("success", 1000, {
                            email: req.body.email,
                            password: newUser.password,
                            avatar
                        }));
                        console.log(`新用户添加成功`);
                    });
                });
            });
            // jwt.sign("规则","加密名字","过期时间",()=>{});
            /* new Promise((resolve,reject) => {
                jwt.sign(rule, secretOrKey, { expiresIn: 3600 }, (err: any, token: string) => {
                    if (err) throw err;
                    
                    resolve(token);
                })
            }).then(data => {
                console.log(data)
                // 不存在就写入
                const newUser = new UserMsg({
                    name: req.body.name,
                    email: req.body.email,
                    password: data
                })

                newUser.save((err, next) => {
                    if (err) throw err;

                    
                    res.json(new publicInfo("success", 1000, {
                        email: req.body.email,
                        token: data
                    }))
                    console.log(`新用户添加成功`)
                })
            }) */
        }
    });
};
