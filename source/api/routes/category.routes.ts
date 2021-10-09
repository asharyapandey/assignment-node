import express from "express";
import {
    ADD_CATEGORY_ROUTE,
    EDIT_CATEGORY_ROUTE,
    GET_CATEGORY_ROUTE,
    GET_SINGLE_CATEGORY_ROUTE,
    DELETE_CATEGORY_ROUTE,
} from "../constants/category.constants";
import {
    addCategory,
    editCategory,
    deleteCategory,
    getCategory,
    getSingleCategory,
} from "../controllers/category.controllers";
import { checkAPIKey } from "../middlewares/middleware";

const categoryRoutes = express.Router();

categoryRoutes.post(ADD_CATEGORY_ROUTE, checkAPIKey, addCategory);
categoryRoutes.get(GET_CATEGORY_ROUTE, checkAPIKey, getCategory);
categoryRoutes.get(GET_SINGLE_CATEGORY_ROUTE, checkAPIKey, getSingleCategory);
categoryRoutes.put(EDIT_CATEGORY_ROUTE, checkAPIKey, editCategory);
categoryRoutes.delete(DELETE_CATEGORY_ROUTE, checkAPIKey, deleteCategory);

export = categoryRoutes;
