"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mongodb 连接地址
exports.clientMongodb = "mongodb://zhanglijie5997:zhang_5997@ds261716.mlab.com:61716/login_test";
// jwt 第二个参数
exports.secretOrKey = "secret";
//  mongodb 连接返回函数
exports.mongodbFn = (err, db) => {
    if (err)
        throw err;
};
