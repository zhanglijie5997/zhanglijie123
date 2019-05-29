"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const data = req.body;
    const result = JSON.stringify({ code: 0, data: 'http://game.qingxiet.com/?id=' + data.data });
    res.end(result);
};
