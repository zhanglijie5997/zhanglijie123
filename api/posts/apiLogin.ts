import { RequestHandler } from "express-serve-static-core";
import { UserMsg } from "../../model/mongodbScheam";
import { publicInfo, apiError } from "../../model/todo/message";
import jwt from 'jsonwebtoken'
import { secretOrKey } from "../mongodbClient/mongodb";

export const apiLogin:RequestHandler = (req,res,next) => {
    console.log(req.body);
    
    UserMsg.findOne({email:req.body.email})
            .then(user => {
                console.log(user,'2222');
                let token = req.body.token;
                jwt.verify(token,secretOrKey,(err:any,data:any) => {
                    if(err) throw err;
                    console.log(data,555)
                })
                // let token = 
                if(user) {
                    if(req.body.email == user.email  ) {
                        
                        res.status(200).json(new publicInfo("success",1000,{
                            message:"success"
                        }))
                    }else {
                        res.status(403).json(new apiError("default","password default",4004))
                    }   
                   
                }else {
                    
                    res.status(400).json(new apiError("default","place register",4004))
                }
            })

}
