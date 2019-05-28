
import request from 'request'
export default (wss: any, WebSocket: any) => {
    const user: any[] = [];
    let time:NodeJS.Timer | null  = null,
        webSockets = {}; // userID：webSocket 

    // Broadcast to all.
    wss.broadcast = function broadcast(data: any) {
        wss.clients.forEach(function each(client: any) {
            if (client.readyState === WebSocket.OPEN) {
                console.log(1111)
                client.send(data);
            }
        });
    };



    wss.on('connection', function connection(ws: any) {

        //    用户名
        let users: string = '';
       
        wss.clients.forEach(function each(client: any) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                // client.send(data);
               time = setInterval(() => {
                    request.get("https://www.redbi.com/trade/data/getAllNewest.o?&categoryId=6", (err: any, res: any, body: any) => {
                        if (err) throw err;
                        console.log(body);
                        client.send(body);
                    })
                }, 1000)
                
            }else {
                clearInterval(Number(time))
            }
        });


        
        // webSockets[userID] = webSocket;

        // 接收消息
        ws.on('message', function incoming(data: any) {
            user.push(JSON.parse(data));
            users = JSON.parse(data).name;
            console.log(users, data, 111)
            // Broadcast to everyone else.
            // 广播给每一位在聊天室的用户
            wss.clients.forEach(function each(client: any) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });


        });

        // 用户退出
        ws.on("close", (msg: any) => {
            console.log(`${users}离开了`);
            // 广播给在当前聊天室的用户
            // stype("message", ws, null, users)

            wss.clients.forEach(function each(client: any) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    let closeUser = {
                        name: users,
                        value: "离开了"
                    }
                    client.send(JSON.stringify(closeUser));
                }
            });



        })


    });



    /**
     * 
     * @param params  类型
     * @param ws      长链接名称
     * @param data    数据
     * @param users   用户名
     */
    function stype(params: string, ws: any, data: any, users: string) {
        switch (params) {
            case "messgae":
                wss.clients.forEach(function each(client: any) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(data);
                    }
                });
                break;
            case "close":
                wss.clients.forEach(function each(client: any) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        let closeUser = {
                            name: users,
                            value: "离开了"
                        }
                        client.send(JSON.stringify(closeUser));
                    }
                });
                break;
            default:
                break;
        }
    }

}
