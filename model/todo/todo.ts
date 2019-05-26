export class Todo {
    id:string;
    postId:number;
    start:number;
    message:string;
    userName:string;
    price:number;
    current:string;
    constructor(data:any){
        this.id = data.id;
        this.postId = data.postId;
        this.start = data.start;
        this.message = data.message;
        this.userName = data.userName;
        this.price = data.price;
        this.current = data.current;
    }
}