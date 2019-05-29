import { RequestHandler } from "express-serve-static-core";
import { UserMsg } from "../../model/mongodbScheam";
import { publicInfo, apiError } from "../../model/todo/message";
import jwt from 'jsonwebtoken'
import { secretOrKey } from "../mongodbClient/mongodb";
import bcrypt from 'bcrypt'
export const apiLogin:RequestHandler = (req,res,next) => {
    console.log(req.body);
    // 查询是否存在用户
    UserMsg.findOne({email:req.body.email})
            .then(user => {
                console.log(user,'2222');
               
                // jwt.verify(token,secretOrKey,(err:any,data:any) => {
                //     if(err) throw err;
                //     console.log(data,555)
                // })
                // let token = 
                if(user) {
                    // 密码效验
                    bcrypt.compare(req.body.password, user.password)
                        .then((isMatch:any) => {
                            if(isMatch) {
                                const rule = {
                                    id:user.id,
                                    password:user.password
                                }
                                jwt.sign(rule, secretOrKey, {expiresIn:3600},(err:any,data:any) => {
                                    if(err) throw err;
                                    return res.json(new publicInfo("success", 200, {
                                        token: data
                                    }))
                                })
                                    
                                // jwt.sign("规则","加密名字","过期时间",()=>{})
                               
                            }else {
                                return res.status(400).json(new apiError("default","password default",4004))
                            }
                        })
                        .catch(err => {throw err})
                }else {
                    res.status(400).json(new apiError("default","place register",4004))
                }
            })

}
