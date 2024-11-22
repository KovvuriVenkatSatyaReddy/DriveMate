import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Unique file name
    },
});

export const upload = multer({ storage });



// const storage = multer.memoryStorage();
// export const upload = multer({ storage });