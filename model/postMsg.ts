

export class PostMsg {
    userId: number;
    id: number;
    title: string;
    body: string;
  
    img:string[];
    constructor(data: any) {
        this.userId = data.userId;
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
       
        this.img = data.img
    }
}