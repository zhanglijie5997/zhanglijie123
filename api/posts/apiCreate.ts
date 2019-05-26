import { RequestHandler } from 'express'

import uuid from 'uuid/v4'
import { DataStore } from '../../data/data';
import { NewPost } from '../../interface/instance';
import { apiError, publicInfo } from '../../model/todo/message';

export const apiCreate: RequestHandler = (req, res, next) => {
    // console.log(req.body);
    const requireFile  = ["title","body"];
    const giveReq = Object.getOwnPropertyNames(req.body);
    if (!requireFile.every(fild => giveReq.includes(fild))) {
        console.log(110)
        let data = new apiError("Data missing", "not all require", 4004);
        console.log(data)
        return res.json(data) 
    }
    const user:NewPost = {
        id:uuid(),
        userId: req.body.userId || 1,
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        current: req.body.current,
        img:[]
    };
    DataStore.post.push(user);
    // res.json(user)
    res.json(new publicInfo("success",1000,{
        post: user    
    }))
}


