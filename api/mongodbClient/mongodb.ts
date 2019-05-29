
// mongodb 连接地址
export const clientMongodb = "mongodb://zhanglijie5997:zhang_5997@ds261716.mlab.com:61716/login_test";

// jwt 第二个参数
export const secretOrKey = "secret";

//  mongodb 连接返回函数
export const mongodbFn = (err:any,db:any):void=>{
    if(err) throw err;
}

