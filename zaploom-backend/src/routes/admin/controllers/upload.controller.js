/**
 * Upload Controller
 */

const { success, error } = require('../../../utils/response');
const env = require('../../../config/env');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) return error(res, 'No image file provided', 400);
        const imageUrl = `${env.BASE_URL}/uploads/images/${req.file.filename}`;
        return success(res, 'Image uploaded successfully', { url: imageUrl, filename: req.file.filename });
    } catch (err) {
        console.error('Upload Image Error:', err);
        return error(res, 'Failed to upload image');
    }
};

module.exports = { uploadImage };
