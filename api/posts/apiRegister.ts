import { UserMsg } from "../../model/mongodbScheam";
import { publicInfo, apiError } from "../../model/todo/message";

export default (req: any, res: any, next: any) => {
    // console.log(req.body);
    const userEmail = req.body.email;
    console.log(userEmail)
    // 查找是否存在用户
    UserMsg.findOne({ email: userEmail })
        .then(user => {
         
            // 存在用户
            if (user) {
                // res.status(404).json({
                //     status: 40004,
                //     message: "User already exists"
                // })
                res.json(new apiError("User already exists","User already exists",4004))
                console.log(`注册账号存在`)
            } else {
                // 不存在就写入
                const newUser = new UserMsg({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                newUser.save((err, next) => {
                    if (err) throw err;
                   
                    
                    res.json(new publicInfo("success",1000,{
                        email:req.body.email,
                    }))
                    console.log(`新用户添加成功`)
                })

            }
        })
    return true;
}