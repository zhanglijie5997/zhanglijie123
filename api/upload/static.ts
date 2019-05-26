import { RequestHandler } from "express";
import multer from 'multer';
import path from 'path'
import uuid = require("uuid");

export function getFileUpload(env: string): RequestHandler {
    switch (env) {
        case "development":
            const fildId = uuid();
            const fildStore =  multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null,path.resolve("./","public","img"))
                },
                filename: function (req, file, cb) {
                    cb(null,fildId + path.extname(file.originalname))
                }
            })

            return multer({storage:fildStore}).single("file");
            
        case "production":
            return (req, res, next) => {
                next();
            }
        default:
            return (req, res, next) => {
                next();
            };
    }
}