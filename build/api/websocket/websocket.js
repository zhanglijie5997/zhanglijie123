"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (wss, WebSocket) => {
    const user = [], webSockets = {}; // userID：webSocket 
    // Broadcast to all.
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                console.log(1111);
                client.send(data);
            }
        });
    };
    wss.on('connection', function connection(ws) {
        //    用户名
        let users = '';
        // webSockets[userID] = webSocket;
        // 接收消息
        ws.on('message', function incoming(data) {
            user.push(JSON.parse(data));
            users = JSON.parse(data).id;
            console.log(users, 111);
            // Broadcast to everyone else.
            // 广播给每一位在聊天室的用户
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });
        // 用户退出
        ws.on("close", (msg) => {
            console.log(`${users}离开了`);
            // 广播给在当前聊天室的用户
            // stype("message", ws, null, users)
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    let closeUser = {
                        name: users,
                        value: "离开了"
                    };
                    client.send(JSON.stringify(closeUser));
                }
            });
        });
    });
    /**
     *
     * @param params  类型
     * @param ws      长链接名称
     * @param data    数据
     * @param users   用户名
     */
    function stype(params, ws, data, users) {
        switch (params) {
            case "messgae":
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(data);
                    }
                });
                break;
            case "close":
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        let closeUser = {
                            name: users,
                            value: "离开了"
                        };
                        client.send(JSON.stringify(closeUser));
                    }
                });
                break;
            default:
                break;
        }
    }
};
