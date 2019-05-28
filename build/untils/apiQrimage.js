"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qr_image_1 = __importDefault(require("qr-image"));
const url_1 = __importDefault(require("url"));
exports.default = (req, res) => {
    var par = url_1.default.parse(req.url, true).query;
    var thisUrl = par.url;
    var thisParam = par.id;
    var imgUrl = thisUrl + '?id=' + thisParam;
    var img = qr_image_1.default.image(imgUrl, { size: 10 });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    img.pipe(res);
};
