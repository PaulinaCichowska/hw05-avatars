import multer from "multer";
import path from "path";
import { v4 } from "uuid"
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const storeImageDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storeImageDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export const uploadMiddleware = multer({ storage: storage });
