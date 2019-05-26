import { RequestHandler } from "express-serve-static-core";
import { NewPost } from "../../interface/instance";
import { DataStore } from "../../data/data";

export const apiPutPost:RequestHandler = (req,res,next) => {
    console.log(req.params.id);

    const userIndex = DataStore.post.findIndex((item:any) => {
        return item.id == req.params.id
    });

    console.log(userIndex);

    const oldData = DataStore.post[userIndex];

    if(userIndex > -1 ) {
        const updateUser:NewPost = {
            id:req.params.id,
            userId: req.body.userId || oldData.userId,
            title: req.body.title || oldData.title,
            body: req.body.body || oldData.body,
            price: req.body.price || oldData.price,
            current: req.body.current || oldData.current,
            img:oldData.img
        };

        DataStore.post[userIndex] = updateUser;
        res.status(200).json({
            status:"1000",
            message:"success"
        })
    }else {
        res.status(404).json({
            status:"4004",
            message:"Data Update failed"
        })
    }
    

   
}