"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const static_1 = require("../upload/static");
exports.apiUploadImg = (req, res, next) => {
    console.log(req.params.id, 555);
    const userIndex = data_1.DataStore.post.findIndex((item) => {
        return item.id == req.params.id;
    });
    console.log(userIndex, 666);
    const oldData = data_1.DataStore.post[userIndex];
    if (userIndex === -1) {
        res.status(404).json({
            status: "4004",
            message: "default"
        });
    }
    else {
        //    上传图片
        const upload = static_1.getFileUpload(req.app.get("env"));
        upload(req, res, err => {
            if (err) {
                res.status(404).json({
                    status: "4004",
                    message: "default"
                });
                return;
            }
            else {
                oldData.img.push(req.file.filename);
                // console.log(req.file.filename)
                res.status(200).json({
                    status: 1000,
                    message: "success"
                });
            }
        });
    }
};
