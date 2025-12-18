const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');
const { uploadSingle, handleUploadError } = require('../middleware/upload');
const { deleteImage } = require('../config/cloudinary');

// GET all categories
router.get('/', async (req, res) => {
  try {
    // Fetch all categories - no filter to ensure we get all documents
    const allDocs = await Category.find({})
      .sort({ order: 1, name: 1 });
    
    console.log(`Found ${allDocs.length} documents in database`);
    
    // Transform the data - handle both array of documents and single document with nested objects
    let categories = [];
    
    if (allDocs.length > 0) {
      const firstDoc = allDocs[0];
      
      // Check if the document has numeric keys (nested structure)
      const hasNumericKeys = Object.keys(firstDoc.toObject()).some(key => !isNaN(parseInt(key)));
      
      if (hasNumericKeys) {
        // Transform nested object structure to array
        const docObj = firstDoc.toObject();
        categories = Object.keys(docObj)
          .filter(key => !isNaN(parseInt(key)))
          .map(key => docObj[key])
          .filter(item => item && item.name); // Only include items with a name
      } else {
        // Normal array of documents
        categories = allDocs.map(doc => doc.toObject());
      }
    }
    
    console.log(`Transformed to ${categories.length} categories`);
    console.log('Sample category:', categories[0] ? JSON.stringify(categories[0], null, 2) : 'No categories');
    
    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
});

// POST create new category (Admin only)
router.post('/', protect, uploadSingle('image'), async (req, res) => {
  try {
    const { name, type, description, slug, order, isActive } = req.body;

    if (!name) {
      // Delete uploaded file if validation fails
      if (req.file) {
        await deleteImage(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    // Use uploaded image URL if file was uploaded
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary returns the URL in req.file.path
    }

    const category = new Category({
      name,
      type: type || '',
      description: description || '',
      slug: slug || '',
      image: imageUrl,
      order: order ? parseInt(order) : 0,
      isActive: isActive !== undefined ? isActive : true
    });

    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      data: savedCategory
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      await deleteImage(req.file.path);
    }
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
});

// PUT update category (Admin only)
router.put('/:id', protect, uploadSingle('image'), async (req, res) => {
  try {
    // Get existing category to delete old image if needed
    const existingCategory = await Category.findById(req.params.id);
    if (!existingCategory) {
      // Delete uploaded file if category not found
      if (req.file) {
        await deleteImage(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const { name, type, description, slug, order, isActive, image } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (type !== undefined) updateData.type = type;
    if (description !== undefined) updateData.description = description;
    if (slug !== undefined) updateData.slug = slug;
    if (order !== undefined) updateData.order = parseInt(order);
    if (isActive !== undefined) updateData.isActive = isActive;

    // Handle image update
    if (req.file) {
      // New image uploaded - use Cloudinary URL
      updateData.image = req.file.path;
      // Delete old image from Cloudinary if it exists and is a Cloudinary URL
      if (existingCategory.image && existingCategory.image.includes('cloudinary.com')) {
        try {
          await deleteImage(existingCategory.image);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
          // Continue even if deletion fails
        }
      }
    } else if (image !== undefined) {
      // Image URL provided directly (not a file upload)
      updateData.image = image;
      // If changing to a new URL and old one is from Cloudinary, delete old image
      if (existingCategory.image && existingCategory.image.includes('cloudinary.com') && image !== existingCategory.image) {
        try {
          await deleteImage(existingCategory.image);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      await deleteImage(req.file.path);
    }
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
});

// DELETE category (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Delete image from Cloudinary if it exists and is a Cloudinary URL
    if (category.image && category.image.includes('cloudinary.com')) {
      try {
        await deleteImage(category.image);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
        // Continue with category deletion even if image deletion fails
      }
    }

    // Delete the category
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
});

module.exports = router;

