import express from "express";
import {
    ADD_COMPANY_ROUTE,
    EDIT_COMPANY_ROUTE,
    GET_COMPANY_ROUTE,
    GET_SINGLE_COMPANY_ROUTE,
    DELETE_COMPANY_ROUTE,
} from "../constants/company.constants";
import {
    addCompany,
    getCompanies,
    getSingleCompany,
    editCompany,
    deleteCompany,
} from "../controllers/company.controllers";
import { checkCompanyBody } from "../middlewares/company.middlewares";
import { checkAPIKey } from "../middlewares/middleware";
import { imageUpload } from "../middlewares/multer.middlewares";

const companyRoutes = express.Router();

companyRoutes.post(
    ADD_COMPANY_ROUTE,
    checkAPIKey,
    imageUpload.single("image"),
    checkCompanyBody,
    addCompany
);
companyRoutes.get(GET_COMPANY_ROUTE, checkAPIKey, getCompanies);
companyRoutes.get(GET_SINGLE_COMPANY_ROUTE, checkAPIKey, getSingleCompany);
companyRoutes.put(
    EDIT_COMPANY_ROUTE,
    checkAPIKey,
    imageUpload.single("image"),
    editCompany
);
companyRoutes.delete(DELETE_COMPANY_ROUTE, checkAPIKey, deleteCompany);

export = companyRoutes;
