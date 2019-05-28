import { RequestHandler } from "express-serve-static-core";
import { UserMsg } from "../../model/mongodbScheam";
import { publicInfo, apiError } from "../../model/todo/message";

export const apiLogin:RequestHandler = (req,res,next) => {
    console.log(req.body);
    
    UserMsg.findOne({email:req.body.email})
            .then(user => {
                console.log(user,'2222')

                if(user) {
                    if(req.body.password == user.password) {
                        // res.status(200).json({
                        //     status:200,
                        //     message:"success"
                        // })
                        res.status(200).json(new publicInfo("success",1000,{
                            message:"success"
                        }))
                    }else {
                        // res.status(403).json({
                        //     status:403,
                        //     message:"password default"
                        // })
                        res.status(403).json(new apiError("default","password default",4004))
                    }   
                   
                }else {
                    
                    // res.status(200).json({
                    //     status:200,
                    //     message:"place register"
                    // })
                    res.status(400).json(new apiError("default","place register",4004))
                }
            })

}
