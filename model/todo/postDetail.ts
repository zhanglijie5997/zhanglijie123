import { PostMsg } from '../postMsg';

import { Todo } from './todo'

export default class PostDetail extends PostMsg{

    price:number;

    currency:string;

    todos:Todo;

    img:string[];

    /**
     * 
     * @param props        posts数据
     * @param todoData     todo数据
     * @param postImages   图片数组
     */
    constructor(props:any,todoData:any,postImages:string[]) {

        super(props)

        this.price = props.price;

        this.currency = props.current;

        this.todos = todoData.map((item:any) => {
            return new Todo(item)
        });

        this.img = postImages;
    }

}