require('dotenv').config()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')

const generate_token = async (data) => {
    return await jwt.sign(
        data,
        process.env.JWT_ACCESS_TOKEN_SECRET
    )
}

const verify_token = async (token) => {
    return await jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET
    )
}

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, 'public/uploads'))
        },
        filename: function (req, file, cb) {
            const ext = file.mimetype.split("/")[1];
            cb(null, `${file.originalname}-${Date.now()}.${ext}`);
        }
    }
)

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

const upload_image = multer(
    {
        storage,
        fileFilter: imageFilter
    }
).single('file')

module.exports = {
    generate_token,
    verify_token,
    upload_image
}