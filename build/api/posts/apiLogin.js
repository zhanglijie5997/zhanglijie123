"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbScheam_1 = require("../../model/mongodbScheam");
const message_1 = require("../../model/todo/message");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("../mongodbClient/mongodb");
exports.apiLogin = (req, res, next) => {
    console.log(req.body);
    mongodbScheam_1.UserMsg.findOne({ email: req.body.email })
        .then(user => {
        console.log(user, '2222');
        let token = req.body.token;
        jsonwebtoken_1.default.verify(token, mongodb_1.secretOrKey, (err, data) => {
            if (err)
                throw err;
            console.log(data, 555);
        });
        // let token = 
        if (user) {
            if (req.body.email == user.email) {
                res.status(200).json(new message_1.publicInfo("success", 1000, {
                    message: "success"
                }));
            }
            else {
                res.status(403).json(new message_1.apiError("default", "password default", 4004));
            }
        }
        else {
            res.status(400).json(new message_1.apiError("default", "place register", 4004));
        }
    });
};
