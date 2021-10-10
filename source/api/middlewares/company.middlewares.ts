import { Request, Response, NextFunction } from "express";
import { API_KEY } from "../constants/constants";
import { BAD_REQUEST } from "../constants/status-codes.constants";
import { ErrorType } from "../types/interfaces";
import { companyValidation } from "../validations/validation";

export const checkCompanyBody = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { status, message }: ErrorType = companyValidation(
        JSON.parse(JSON.stringify(req.body))
    );

    if (status) {
        res.status(BAD_REQUEST).json({
            message,
            result: {},
        });
    } else {
        next();
    }
};
