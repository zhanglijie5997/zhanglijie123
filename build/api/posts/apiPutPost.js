"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
exports.apiPutPost = (req, res, next) => {
    console.log(req.params.id);
    const userIndex = data_1.DataStore.post.findIndex((item) => {
        return item.id == req.params.id;
    });
    console.log(userIndex);
    const oldData = data_1.DataStore.post[userIndex];
    if (userIndex > -1) {
        const updateUser = {
            id: req.params.id,
            userId: req.body.userId || oldData.userId,
            title: req.body.title || oldData.title,
            body: req.body.body || oldData.body,
            price: req.body.price || oldData.price,
            current: req.body.current || oldData.current,
            img: oldData.img
        };
        data_1.DataStore.post[userIndex] = updateUser;
        res.status(200).json({
            status: "1000",
            message: "success"
        });
    }
    else {
        res.status(404).json({
            status: "4004",
            message: "Data Update failed"
        });
    }
};
