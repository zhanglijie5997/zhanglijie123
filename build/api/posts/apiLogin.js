"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbScheam_1 = require("../../model/mongodbScheam");
const message_1 = require("../../model/todo/message");
exports.apiLogin = (req, res, next) => {
    console.log(req.body);
    mongodbScheam_1.UserMsg.findOne({ email: req.body.email })
        .then(user => {
        console.log(user, '2222');
        if (user) {
            if (req.body.password == user.password) {
                // res.status(200).json({
                //     status:200,
                //     message:"success"
                // })
                res.status(200).json(new message_1.publicInfo("success", 1000, {
                    message: "success"
                }));
            }
            else {
                // res.status(403).json({
                //     status:403,
                //     message:"password default"
                // })
                res.status(403).json(new message_1.apiError("default", "password default", 4004));
            }
        }
        else {
            // res.status(200).json({
            //     status:200,
            //     message:"place register"
            // })
            res.status(400).json(new message_1.apiError("default", "place register", 4004));
        }
    });
};
