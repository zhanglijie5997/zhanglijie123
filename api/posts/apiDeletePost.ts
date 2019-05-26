import { RequestHandler } from "express";

import { DataStore } from "../../data/data";
import { publicInfo, apiError } from "../../model/todo/message";

export const apiDeletePost:RequestHandler = (req,res,next) => {
    
    const postIndex = DataStore.post.findIndex((item:any) => {
        return item.id == req.params.id;
    })

    if(postIndex > -1) {
        DataStore.post.splice(postIndex,1);
        res.status(200).json(new publicInfo("success",1000,{
            post:"success"
        }))
    }else {
        res.status(404).json(new apiError("don\'t have","default",4004))
    }
    
}