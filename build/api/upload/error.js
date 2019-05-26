"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = (err, req, res, next) => {
    const env = req.app.get("env");
    switch (env) {
        case "developoment":
            console.log(err);
            return res.status(err.status).json(err);
        case "produceion":
            return res.status(err.status).json(err.publicVersion);
        default:
            break;
    }
};
