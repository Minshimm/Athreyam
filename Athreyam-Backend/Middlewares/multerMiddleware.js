const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `Medicine-${file.originalname}`)
    }
})

// File filter to allow only image uploads
const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
        callback(null, true);
    } else {
        callback(new Error('Only image files are allowed!'), false);
    }
};
const multerMiddleware = multer({storage,fileFilter})

module.exports = multerMiddleware