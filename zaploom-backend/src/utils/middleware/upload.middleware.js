/**
 * Upload Middleware - image-only multer
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../../../uploads');
const imagesDir = path.join(uploadsDir, 'images');

[uploadsDir, imagesDir].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, imagesDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
        cb(null, `${name}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});

const imageFileFilter = (req, file, cb) => {
    const allowedExt = /\.(jpeg|jpg|png|gif|webp|svg)$/i;
    const allowedMime = /^image\/(jpeg|jpg|png|gif|webp|svg\+xml)$/;
    const ok = allowedExt.test(file.originalname) && allowedMime.test(file.mimetype);
    cb(ok ? null : new Error('Only image files allowed (jpeg, jpg, png, gif, webp, svg)'), ok);
};

const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFileFilter,
});

module.exports = { uploadImage };
