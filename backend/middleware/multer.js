import multer from "multer";

const storage = multer.memoryStorage();

// Single upload
export const singleUpload = multer({ storage }).single("profileImage");

// Multiple upload
export const multipleUpload = multer({ storage }).array("files", 5);