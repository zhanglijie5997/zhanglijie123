import express from 'express';
import { apiGetPosts } from './api/posts/getPost';
import { apiGetPostsDetail } from './api/posts/apiGetPostsDetail';
import { apiCreate } from './api/posts/apiCreate';
import bodyParser, { json } from 'body-parser';
import { apiDeletePost } from './api/posts/apiDeletePost';
import { apiPutPost } from './api/posts/apiPutPost';
import { CumtoRequestHandler } from './interface/express';
import path from 'path'
import { apiUploadImg } from './api/posts/apiUploadImg';
import { apiErrorHandler } from './api/upload/error';
import { apiError } from './model/todo/message';
import redis from 'redis';
import uuid from "uuid/v4"
import http from 'http'
import webSocket from './api/websocket/websocket'



const authenticator: CumtoRequestHandler = (req, res, next) => {
    const username = "zhanglijie";
    req.user = username;

    next();
}

const logger: CumtoRequestHandler = (req, res, next) => {
    console.log(`user - ${req.user}`)
    console.log(`${new Date()} - ${req.method} - ${req.path}`);
    next();
}
const app = express();

// console.log(DataStore.post)

// 解析post请求
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// 配置图片static指向路径
app.use("/static", express.static(path.resolve("./", "public", "img")))

app.use(authenticator)

app.use(logger)


// 路由
app.get("/", (req, res, next) => {
    res.send(`DataStore.post`)
})

// 查询所有数据
app.get("/tor", apiGetPosts)

// 选择查询数据
app.get("/tor/:id", apiGetPostsDetail)

// 插入数据
app.post("/posts", apiCreate)

// 删除数据
app.delete("/posts/:id", apiDeletePost)

// 更新数据
app.put("/posts/:id", apiPutPost)

// 上传图片
app.post("/posts/:id/img", apiUploadImg)

app.use((req, res, next) => {

    if (req.accepts('application/json')) {
        console.log(req.accepts())
        next();
    } else {
        console.log(555);
    }
})


app.get("/headers", (req, res, next) => {
    res.json({
        headers: req.headers
    })
})

// 处理错误信息
app.use(apiErrorHandler);

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
webSocket(wss, WebSocket);



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

})