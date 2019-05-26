import { RequestHandler } from "express-serve-static-core";
import { NewPost } from "../../interface/instance";
import { DataStore } from "../../data/data";
import { getFileUpload } from "../upload/static";

export const apiUploadImg: RequestHandler = (req, res, next) => {
    console.log(req.params.id,555);

    const userIndex = DataStore.post.findIndex((item: any) => {
        return item.id == req.params.id
    });

    console.log(userIndex,666);

    const oldData = DataStore.post[userIndex];

    if (userIndex === -1) {

        res.status(404).json({
            status: "4004",
            message: "default"
        })
    } else {
        //    上传图片
        const upload = getFileUpload(req.app.get("env"));
        upload(req,res,err => {
            if(err){
                res.status(404).json({
                    status:"4004",
                    message:"default"
                })
                return
            }else {
                oldData.img.push(req.file.filename)
                // console.log(req.file.filename)
                res.status(200).json({
                    status:1000,
                    message:"success"
                })
            }
        })
    }



}