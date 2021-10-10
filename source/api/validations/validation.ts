import label from "../labels/label";
import { ErrorType } from "../types/interfaces";

export const categoryValidation = (data: any): ErrorType => {
    let error: ErrorType = {
        status: false,
        message: "",
    };

    if (!data.hasOwnProperty("title")) {
        error.status = true;
        error.message = label.category.validation("Title");
    }

    return error;
};

export const companyValidation = (data: any): ErrorType => {
    let error: ErrorType = {
        status: false,
        message: "",
    };

    if (!data.hasOwnProperty("title")) {
        error.status = true;
        error.message = label.category.validation("Title");
    }
    if (!data.hasOwnProperty("status")) {
        error.status = true;
        error.message = label.category.validation("Status");
    }

    return error;
};
