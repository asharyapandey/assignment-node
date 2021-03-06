import mongoose from "mongoose";

export interface CompanyCategoryData {
    title: string;
}

export interface CompanyCategoryDocument
    extends CompanyCategoryData,
        mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

export const companyCategorySchema = new mongoose.Schema(
    {
        // ID is automatically generated by mongoDB
        title: {
            type: String,
            required: true,
        },
    },
    {
        // createdAt & updatedAt is also automatically generated
        timestamps: true,
    }
);

const CompanyCategory = mongoose.model<CompanyCategoryDocument>(
    "companyCategory",
    companyCategorySchema
);

export default CompanyCategory;
