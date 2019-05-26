import { DataStore } from '../../data/data';

import { RequestHandler } from 'express';
import { PostMsg } from '../../model/postMsg';


// 请求所有数据
export const apiGetPosts: RequestHandler = (req,res,next) => {
    res.json(DataStore.post.map((item:any) => {
        // console.log(item,'555')
        return new PostMsg(item)
    }))
}

