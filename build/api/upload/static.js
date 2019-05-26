"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid = require("uuid");
function getFileUpload(env) {
    switch (env) {
        case "development":
            const fildId = uuid();
            const fildStore = multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path_1.default.resolve("./", "public", "img"));
                },
                filename: function (req, file, cb) {
                    cb(null, fildId + path_1.default.extname(file.originalname));
                }
            });
            return multer_1.default({ storage: fildStore }).single("file");
        case "production":
            return (req, res, next) => {
                next();
            };
        default:
            return (req, res, next) => {
                next();
            };
    }
}
exports.getFileUpload = getFileUpload;
