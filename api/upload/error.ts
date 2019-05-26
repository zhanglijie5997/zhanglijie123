import { ErrorRequestHandler } from "express-serve-static-core";

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const env: string = req.app.get("env");
    switch (env) {
        case "developoment":

            console.log(err);
            return res.status(err.status).json(err)
        case "produceion":
            return res.status(err.status).json(err.publicVersion)
        default:
            break;
    }
}