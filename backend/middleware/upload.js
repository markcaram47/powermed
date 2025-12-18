const multer = require('multer');
const { upload } = require('../config/cloudinary');

// Error handler for multer errors
const handleUploadError = (err, req, res, next) => {
  if (err) {
    console.error('Upload error:', err);
    
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 5MB.',
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum count is 5.',
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    }
    
    // Handle other errors (like file type validation or Cloudinary config)
    return res.status(400).json({
      success: false,
      message: err.message || 'Error uploading file',
    });
  }
  
  next();
};

// Middleware for single image upload (optional - won't fail if no file)
const uploadSingle = (fieldName = 'image') => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      // If there's an error, pass it to the error handler
      if (err) {
        return handleUploadError(err, req, res, next);
      }
      // Otherwise continue
      next();
    });
  };
};

// Middleware for multiple image uploads
const uploadMultiple = (fieldName = 'images', maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  handleUploadError,
};

