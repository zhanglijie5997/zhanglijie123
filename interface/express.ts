import { Request, Response } from "express";
import { NextFunction } from "connect";


export interface CumtoRequest extends Request {
    user?:string;

}

export interface CumtoResponse extends Response {
    
}


export type CumtoRequestHandler = 
(req:CumtoRequest,res:CumtoResponse,next:NextFunction) => any;