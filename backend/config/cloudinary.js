const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Validate Cloudinary configuration
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('⚠️  WARNING: Cloudinary credentials not found in environment variables!');
  console.warn('Image uploads will fail. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Configure storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'powermed', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: 'limit',
        quality: 'auto',
      }
    ],
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if Cloudinary is configured
    if (!cloudName || !apiKey || !apiSecret) {
      return cb(new Error('Cloudinary is not configured. Please add Cloudinary credentials to your .env file.'), false);
    }
    
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Helper function to delete image from Cloudinary
const deleteImage = async (publicIdOrUrl) => {
  try {
    if (!publicIdOrUrl) return;
    
    let imagePublicId = publicIdOrUrl;
    
    // If it's a Cloudinary URL, extract the public_id
    if (publicIdOrUrl.includes('cloudinary.com')) {
      // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{filename}.{ext}
      // or: https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{filename}.{ext}
      try {
        // Try to extract public_id using Cloudinary's utility
        // Extract the path after /upload/
        const uploadIndex = publicIdOrUrl.indexOf('/upload/');
        if (uploadIndex !== -1) {
          const pathAfterUpload = publicIdOrUrl.substring(uploadIndex + '/upload/'.length);
          // Remove version if present (v123456/)
          const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
          // Get path without extension
          const lastDotIndex = pathWithoutVersion.lastIndexOf('.');
          imagePublicId = lastDotIndex !== -1 
            ? pathWithoutVersion.substring(0, lastDotIndex)
            : pathWithoutVersion;
        }
      } catch (extractError) {
        console.error('Error extracting public_id from URL:', extractError);
        // Fallback: try to get public_id from URL using regex
        const match = publicIdOrUrl.match(/\/upload\/[^\/]+\/(.+?)(\.[^.]*)?$/);
        if (match) {
          imagePublicId = match[1];
        }
      }
    }
    
    // Delete the image using the public_id
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  upload,
  deleteImage,
};

