import { Request, Response, NextFunction } from "express";
import { API_KEY } from "../constants/constants";
import { BAD_REQUEST } from "../constants/status-codes.constants";

export const checkAPIKey = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const apiKey = req.headers["api_key"];
    if (apiKey) {
        if (apiKey === API_KEY) {
            next();
        } else {
            res.status(BAD_REQUEST).json({
                message: "Invalid API Key",
                result: {},
            });

            throw new Error("Invalid API Key");
        }
    } else {
        res.status(BAD_REQUEST).json({
            message: "No API key provided.",
            result: {},
        });

        throw new Error("No API key provided.");
    }
};
