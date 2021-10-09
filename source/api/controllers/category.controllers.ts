import { Request, Response, NextFunction } from "express";
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    SUCCESS,
} from "../constants/status-codes.constants";
import label from "../labels/label";
import CompanyCategory from "../models/CompanyCategory.model";

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page: number = parseInt(req?.query.page as string) || 1;
        const limit = 10;

        const categories = await CompanyCategory.find({})
            .skip(page * limit - limit)
            .limit(limit);

        const totalCategory = await CompanyCategory.countDocuments({});

        return res.status(SUCCESS).json({
            message: label.category.categoriesFetched,
            result: categories,
            page: page,
            totalCount: totalCategory,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.category.categoriesFetchError,
            result: {},
        });
    }
};
export const getSingleCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const category = await CompanyCategory.findOne({ _id: id });

        return res.status(SUCCESS).json({
            message: label.category.categoryFetched,
            result: category,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.category.categoryFetchError,
            result: {},
        });
    }
};

export const addCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title } = req.body;
        const category = new CompanyCategory({ title });

        const createdCategory = await category.save();
        return res.status(CREATED).json({
            message: label.category.categoryAdded,
            result: createdCategory,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.category.categoryAddError,
            result: {},
        });
    }
};

export const editCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const updatedCategory = await CompanyCategory.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );
        return res.status(SUCCESS).json({
            message: label.category.categoryEdited,
            result: updatedCategory,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.category.categoryEditError,
            result: {},
        });
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const deletedCategory = await CompanyCategory.findOneAndDelete({
            _id: id,
        });
        return res.status(SUCCESS).json({
            message: label.category.categoryDeleted,
            result: deletedCategory,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.category.categoryDeleteError,
            result: {},
        });
    }
};
