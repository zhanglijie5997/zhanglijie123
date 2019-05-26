import { DataStore } from '../../data/data';

import { RequestHandler } from 'express';

import PostDetail from '../../model/todo/postDetail';


// 请求单个数据
export const apiGetPostsDetail: RequestHandler = (req,res,next) => {

    const selectedPost = DataStore.post.find((element:any) => element.id == req.params.id);

    console.log(selectedPost);

   if(selectedPost) {
       const selectTodos = DataStore.todo.filter((data:any,index:number) => {
           return data.postId == req.params.id;
       })

       const imgUrls:string[] = selectedPost.img.map((item:any,index:number) => {
           if(req.app.get("env") == "development") {
                return "http://localhost:8091/static/" + item 
           }else {
               return "https://www.baiud.com/" + item
           }
       });
       console.log(imgUrls,444)

       res.json(new PostDetail(selectedPost,selectTodos,imgUrls))
   }else {
        res.status(404).json({status:4001,message:"dont\'t have"})
   }
   
}