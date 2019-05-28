import { publicInfo } from "../../model/todo/message";

export default (req:any,res:any,next:any) => {
    const data = req.body;
    const result = JSON.stringify({ code: 0, data: 'http://game.qingxiet.com/?id=' + data.data });
    res.end(result)
}