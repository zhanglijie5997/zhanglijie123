"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPost_1 = require("./api/posts/getPost");
const apiGetPostsDetail_1 = require("./api/posts/apiGetPostsDetail");
const apiCreate_1 = require("./api/posts/apiCreate");
const body_parser_1 = __importDefault(require("body-parser"));
const apiDeletePost_1 = require("./api/posts/apiDeletePost");
const apiPutPost_1 = require("./api/posts/apiPutPost");
const path_1 = __importDefault(require("path"));
const apiUploadImg_1 = require("./api/posts/apiUploadImg");
const error_1 = require("./api/upload/error");
const websocket_1 = __importDefault(require("./api/websocket/websocket"));
const authenticator = (req, res, next) => {
    const username = "zhanglijie";
    req.user = username;
    next();
};
const logger = (req, res, next) => {
    console.log(`user - ${req.user}`);
    console.log(`${new Date()} - ${req.method} - ${req.path}`);
    next();
};
const app = express_1.default();
// console.log(DataStore.post)
// 解析post请求
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// 配置图片static指向路径
app.use("/static", express_1.default.static(path_1.default.resolve("./", "public", "img")));
app.use(authenticator);
app.use(logger);
// 路由
app.get("/", (req, res, next) => {
    res.send(`DataStore.post`);
});
// 查询所有数据
app.get("/tor", getPost_1.apiGetPosts);
// 选择查询数据
app.get("/tor/:id", apiGetPostsDetail_1.apiGetPostsDetail);
// 插入数据
app.post("/posts", apiCreate_1.apiCreate);
// 删除数据
app.delete("/posts/:id", apiDeletePost_1.apiDeletePost);
// 更新数据
app.put("/posts/:id", apiPutPost_1.apiPutPost);
// 上传图片
app.post("/posts/:id/img", apiUploadImg_1.apiUploadImg);
app.use((req, res, next) => {
    if (req.accepts('application/json')) {
        console.log(req.accepts());
        next();
    }
    else {
        console.log(555);
    }
});
app.get("/headers", (req, res, next) => {
    res.json({
        headers: req.headers
    });
});
// 处理错误信息
app.use(error_1.apiErrorHandler);
// GET http://localhost:8091/posts/id2/todos?start=5
/**
 * GET       : req.method                  =>   请求方式
 * http      : req.req.protocal            =>   schame
 * localhost : req.hostname                =>   地址
 * port      : envirment                   =>   端口
 * posts/2/todos : req.originalUrl         =>   接口api地址
 * id2       : req.parmas = {postId:id2}   =>   api地址
 * ?start=5  : req.query = {start:5}       =>   请求参数
 * req.app   : 环境
 * req.body  : 传递过来的内容
 * req.header: 请求头
 * req.secure,req.cookie,req.fresh...
 */
// websocket 链接
// 建立一个websocket服务
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8181 });
// 长连接函数
websocket_1.default(wss, WebSocket);
// 连接redis
// const RDS_PORT = 6379,                 // 端口
//     RDS_HOST = "localhost",           // 服务器IP
//     RDS_PWD = "zxc123",
//     RDS_OPTS = {},                   // 配置项
//     client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
// //  如果连接有密码的用户
// client.auth(RDS_PWD, () => {
//     console.log(`身份验证成功`)
// })
// client.on("ready", () => {
//     console.log(`redis连接成功`)
// })
app.listen(process.env.PORT || 8091, () => {
    console.log(`server start`);
});
