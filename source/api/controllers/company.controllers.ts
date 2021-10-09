import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
    SUCCESS,
} from "../constants/status-codes.constants";
import label from "../labels/label";
import Company from "../models/Company.model";

export const getCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const SEND_CATEGORY_DETAILS = "YES";
        const page: number = parseInt(req?.query.page as string) || 1;
        const limit = 10;

        const sendCategoryDetails = req?.query.sendCategoryDetails as string;

        let companies;

        if (sendCategoryDetails === SEND_CATEGORY_DETAILS) {
            companies = await Company.find({})
                .skip(page * limit - limit)
                .limit(limit)
                .populate("categoryID");
        } else {
            companies = await Company.find({})
                .skip(page * limit - limit)
                .limit(limit);
        }

        const totalCompanies = await Company.countDocuments({});

        return res.status(SUCCESS).json({
            message: label.company.companiesFetched,
            result: companies,
            page: page,
            totalCount: totalCompanies,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.company.companiesFetchError,
            result: [],
        });
    }
};
export const getSingleCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const SEND_CATEGORY_DETAILS = "YES";

        const sendCategoryDetails = req?.query.sendCategoryDetails as string;

        let company;

        if (sendCategoryDetails === SEND_CATEGORY_DETAILS) {
            company = await Company.findOne({ _id: id }).populate("categoryID");
        } else {
            company = await Company.findOne({ _id: id });
        }

        return res.status(SUCCESS).json({
            message: label.company.companyFetched,
            result: company,
        });
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.company.companyFetchError,
            result: {},
        });
    }
};

export const addCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categoryID, title, description, status } = req.body;

        let image;

        if (req.file) {
            image = req.file.path;
        }

        const company = new Company({
            title,
            categoryID,
            description,
            status,
            image,
        });

        const createdCompany = await company.save();
        return res.status(CREATED).json({
            message: label.company.companyAdded,
            result: createdCompany,
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

export const editCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const company = await Company.findOne({ _id: id });
        // perform action if only that company is available on database
        if (company) {
            let image = company.image;
            if (req.file) {
                image = req.file.path;
                // delete old file if new file is present
                const imagesFolderPath = path.join(
                    __dirname,
                    "../",
                    "../",
                    "../"
                );
                fs.unlinkSync(imagesFolderPath + company.image);
            }

            const dataToUpdate = { ...req.body, image };
            const updatedCategory = await Company.findOneAndUpdate(
                { _id: id },
                { ...dataToUpdate },
                { new: true }
            );
            return res.status(SUCCESS).json({
                message: label.category.categoryEdited,
                result: updatedCategory,
            });
        } else {
            return res.status(BAD_REQUEST).json({
                message: label.company.companyNotFound,
                result: {},
            });
        }
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.company.companyEditError,
            result: {},
        });
    }
};

export const deleteCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const company = await Company.findOne({ _id: id });
        // perform action if only that company is available on database
        if (company) {
            const imagesFolderPath = path.join(__dirname, "../", "../", "../");

            const deletedCategory = await Company.findOneAndDelete({
                _id: id,
            });
            if (deletedCategory?.image) {
                // delete file
                fs.unlink(imagesFolderPath + deletedCategory.image, () => {
                    return res.status(SUCCESS).json({
                        message: label.company.companyDeleted,
                        result: deletedCategory,
                    });
                });
            } else {
                return res.status(SUCCESS).json({
                    message: label.company.companyDeleted,
                    result: deletedCategory,
                });
            }
        } else {
            return res.status(BAD_REQUEST).json({
                message: label.company.companyNotFound,
                result: {},
            });
        }
    } catch (error: any) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({
            devMessage: error.message,
            message: label.company.companyDeleteError,
            result: {},
        });
    }
};
