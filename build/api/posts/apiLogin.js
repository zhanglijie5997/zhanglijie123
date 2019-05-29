"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbScheam_1 = require("../../model/mongodbScheam");
const message_1 = require("../../model/todo/message");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("../mongodbClient/mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.apiLogin = (req, res, next) => {
    console.log(req.body);
    // 查询是否存在用户
    mongodbScheam_1.UserMsg.findOne({ email: req.body.email })
        .then(user => {
        console.log(user, '2222');
        // jwt.verify(token,secretOrKey,(err:any,data:any) => {
        //     if(err) throw err;
        //     console.log(data,555)
        // })
        // let token = 
        if (user) {
            // 密码效验
            bcrypt_1.default.compare(req.body.password, user.password)
                .then((isMatch) => {
                if (isMatch) {
                    const rule = {
                        id: user.id,
                        password: user.password
                    };
                    jsonwebtoken_1.default.sign(rule, mongodb_1.secretOrKey, { expiresIn: 3600 }, (err, data) => {
                        if (err)
                            throw err;
                        return res.json(new message_1.publicInfo("success", 200, {
                            token: data
                        }));
                    });
                    // jwt.sign("规则","加密名字","过期时间",()=>{})
                }
                else {
                    return res.status(400).json(new message_1.apiError("default", "password default", 4004));
                }
            })
                .catch(err => { throw err; });
        }
        else {
            res.status(400).json(new message_1.apiError("default", "place register", 4004));
        }
    });
};
