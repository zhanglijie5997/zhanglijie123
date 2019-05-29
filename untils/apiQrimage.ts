import qr from 'qr-image';
import fs from 'fs'
import url from 'url'
export default (req:any,res:any) => {
    var par = url.parse(req.url, true).query;
    var thisUrl = par.url;
    var thisParam = par.id;
    var imgUrl = thisUrl + '?id=' + thisParam;
    var img = qr.image(imgUrl, { size: 10 });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    img.pipe(res);
} 