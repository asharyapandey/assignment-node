import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import categoryRoutes from "../api/routes/category.routes";
import dotenv from "dotenv";
import path from "path";
import companyRoutes from "../api/routes/company.routes";

const VERSION = "/api";

const app = express();

const env = process.env.NODE_ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (env === "development") {
    app.use(morgan("dev"));
}
// setting up the environment variables according to the environment i.e production/ development
if (env === "development") {
    dotenv.config({
        path: path.join(__dirname, "../", "../", ".env.development"),
    });
} else {
    dotenv.config({
        path: path.join(__dirname, "../", "../", ".env.production"),
    });
}

// adding routes

app.use(VERSION, categoryRoutes);
app.use(VERSION, companyRoutes);

export default app;
