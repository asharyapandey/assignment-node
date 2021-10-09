import { CompanyCategoryDocument } from "../../source/api/models/CompanyCategory.model";

declare global {
    namespace Express {
        interface Request {
            currentUser: CompanyCategoryDocument;
        }
    }
}
