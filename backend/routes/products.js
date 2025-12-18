const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');
const { uploadSingle, handleUploadError } = require('../middleware/upload');
const { deleteImage } = require('../config/cloudinary');

// Helper function to find category by ID in nested structure
const findCategoryById = async (categoryId) => {
  try {
    // First try direct findById
    let category = await Category.findById(categoryId);
    if (category) {
      return category;
    }

    // If not found, search in nested structure
    const allDocs = await Category.find({});
    
    for (const doc of allDocs) {
      const docObj = doc.toObject();
      const hasNumericKeys = Object.keys(docObj).some(key => !isNaN(parseInt(key)));
      
      if (hasNumericKeys) {
        // Search in nested structure
        for (const key of Object.keys(docObj)) {
          if (!isNaN(parseInt(key))) {
            const item = docObj[key];
            if (item && (item._id?.toString() === categoryId || item.id?.toString() === categoryId)) {
              // Return a mock category object with the found data
              return {
                _id: item._id || item.id,
                name: item.name,
                slug: item.slug,
                type: item.type
              };
            }
          }
        }
      } else {
        // Check if this document itself matches
        if (doc._id.toString() === categoryId) {
          return doc;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding category:', error);
    return null;
  }
};

// @route   GET /api/products
// @desc    Get all products (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};

    if (category) query.category = category;

    const products = await Product.find(query)
      .sort({ createdAt: -1 });

    // Manually populate categories (since they're in nested structure)
    const productsWithCategories = await Promise.all(
      products.map(async (product) => {
        const productObj = product.toObject();
        if (productObj.category) {
          const categoryData = await findCategoryById(productObj.category.toString());
          productObj.category = categoryData || productObj.category;
        }
        return productObj;
      })
    );

    res.json(productsWithCategories);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Manually populate category (since they're in nested structure)
    const productObj = product.toObject();
    if (productObj.category) {
      const categoryData = await findCategoryById(productObj.category.toString());
      productObj.category = categoryData || productObj.category;
    }

    res.json(productObj);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/', protect, uploadSingle('image'), async (req, res) => {
  try {
    // Log received data for debugging
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file ? { filename: req.file.originalname, path: req.file.path } : 'No file');
    
    const {
      name,
      image,
      details,
      price,
      category
    } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      console.error('Validation failed - missing fields:', { name: !!name, price: !!price, category: !!category });
      // Delete uploaded file if validation fails
      if (req.file) {
        await deleteImage(req.file.path);
      }
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    // Validate category exists
    if (!category || category.trim() === '') {
      if (req.file) {
        await deleteImage(req.file.path);
      }
      return res.status(400).json({ message: 'Category is required' });
    }

    // Check if category ID is valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(category)) {
      if (req.file) {
        await deleteImage(req.file.path);
      }
      console.error('Invalid category ID format:', category);
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    // Use helper function to find category (handles nested structure)
    const categoryExists = await findCategoryById(category);
    if (!categoryExists) {
      if (req.file) {
        await deleteImage(req.file.path);
      }
      console.error('Category not found. ID:', category);
      return res.status(400).json({ message: 'Category not found' });
    }

    // Use uploaded image URL if file was uploaded, otherwise use provided image URL
    let imageUrl = image || '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary returns the URL in req.file.path
    }

    const product = new Product({
      name,
      image: imageUrl,
      details: details || '',
      price: parseFloat(price),
      category
    });

    const savedProduct = await product.save();
    
    // Manually populate category (since they're in nested structure)
    const productObj = savedProduct.toObject();
    if (productObj.category) {
      const categoryData = await findCategoryById(productObj.category.toString());
      productObj.category = categoryData || productObj.category;
    }

    res.status(201).json(productObj);
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      await deleteImage(req.file.path);
    }
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/:id', protect, uploadSingle('image'), async (req, res) => {
  try {
    // Get existing product to delete old image if needed
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      // Delete uploaded file if product not found
      if (req.file) {
        await deleteImage(req.file.path);
      }
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      name,
      image,
      details,
      price,
      category
    } = req.body;

    // Validate category if provided
    if (category) {
      const categoryExists = await findCategoryById(category);
      if (!categoryExists) {
        if (req.file) {
          await deleteImage(req.file.path);
        }
        return res.status(400).json({ message: 'Category not found' });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (details !== undefined) updateData.details = details;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;

    // Handle image update
    if (req.file) {
      // New image uploaded - use Cloudinary URL
      updateData.image = req.file.path;
      // Delete old image from Cloudinary if it exists and is a Cloudinary URL
      if (existingProduct.image && existingProduct.image.includes('cloudinary.com')) {
        try {
          await deleteImage(existingProduct.image);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
          // Continue even if deletion fails
        }
      }
    } else if (image !== undefined) {
      // Image URL provided directly (not a file upload)
      updateData.image = image;
      // If changing to a new URL and old one is from Cloudinary, delete old image
      if (existingProduct.image && existingProduct.image.includes('cloudinary.com') && image !== existingProduct.image) {
        try {
          await deleteImage(existingProduct.image);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Manually populate category (since they're in nested structure)
    const productObj = product.toObject();
    if (productObj.category) {
      const categoryData = await findCategoryById(productObj.category.toString());
      productObj.category = categoryData || productObj.category;
    }

    res.json(productObj);
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      await deleteImage(req.file.path);
    }
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image from Cloudinary if it exists and is a Cloudinary URL
    if (product.image && product.image.includes('cloudinary.com')) {
      try {
        await deleteImage(product.image);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
        // Continue with product deletion even if image deletion fails
      }
    }

    // Delete the product
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

