import multer from "multer";

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const fileName = `IMAGE-${new Date().toDateString()}-${
            file.originalname
        }`;
        cb(null, fileName);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const imageUpload = multer({ storage: fileStorage, fileFilter });
