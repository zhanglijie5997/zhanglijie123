import mongoose, { Schema ,Document, Model,model} from 'mongoose';
import { User } from './insterface/mongooseInstance';

export interface IuserModel extends User,Document{
    fullName(): string;
}

export const UserScheam:Schema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


export const UserMsg:Model<IuserModel> = model<IuserModel>("user",UserScheam)




   


