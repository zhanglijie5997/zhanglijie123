import { UserMsg } from "../../model/mongodbScheam";
import { publicInfo, apiError } from "../../model/todo/message";
import jwt from 'jsonwebtoken'
import { secretOrKey } from "../mongodbClient/mongodb";
export default (req: any, res: any, next: any) => {
    // console.log(req.body);
    const userEmail = req.body.email;
    console.log(userEmail)
    // 查找是否存在用户
    UserMsg.findOne({ email: userEmail })
        .then((user:any) => {
            console.log(user,666)
            // 存在用户
            if (user) {
                // res.status(404).json({
                //     status: 40004,
                //     message: "User already exists"
                // })
                res.json(new apiError("User already exists","User already exists",4004))
                console.log(`注册账号存在`)
            } else {
                // 定义规则
                let newPwd:string = '';
                const rule = {
                    id: req.body.email,
                    name: req.body.password
                }
                
                // jwt.sign("规则","加密名字","过期时间",()=>{});
                new Promise((resolve,reject) => {
                    jwt.sign(rule, secretOrKey, { expiresIn: 3600 }, (err: any, token: string) => {
                        if (err) throw err;
                        // newPwd = token;
                        // console.log(token);
                        resolve(token);
                    })
                }).then(data => {
                    console.log(data)
                    // 不存在就写入
                    const newUser = new UserMsg({
                        name: req.body.name,
                        email: req.body.email,
                        password: data
                    })

                    newUser.save((err, next) => {
                        if (err) throw err;

                        /* res.status(200).json({
                            status: 1000,
                            message: "loading..."
                        }) */
                        res.json(new publicInfo("success", 1000, {
                            email: req.body.email,
                            token: data
                        }))
                        console.log(`新用户添加成功`)
                    })
                })
                

            }
        })
   
}