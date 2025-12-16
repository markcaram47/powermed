const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');

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
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      image,
      details,
      price,
      category
    } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    // Validate category exists
    if (!category || category.trim() === '') {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Check if category ID is valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(category)) {
      console.error('Invalid category ID format:', category);
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    // Use helper function to find category (handles nested structure)
    const categoryExists = await findCategoryById(category);
    if (!categoryExists) {
      console.error('Category not found. ID:', category);
      return res.status(400).json({ message: 'Category not found' });
    }

    const product = new Product({
      name,
      image: image || '',
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
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
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
        return res.status(400).json({ message: 'Category not found' });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (details !== undefined) updateData.details = details;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

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
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

