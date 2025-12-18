import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const ProductManagement = ({ onProductChange }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    details: '',
    price: '',
    category: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const getToken = () => {
    return localStorage.getItem('adminToken');
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const result = await response.json();
        // Handle both array response and object with data property
        const categoriesData = Array.isArray(result) ? result : (result.data || []);
        const validCategories = Array.isArray(categoriesData) ? categoriesData : [];
        console.log('Fetched categories:', validCategories);
        setCategories(validCategories);
      } else {
        console.error('Failed to fetch categories:', response.status);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = getToken();
    if (!token) {
      setError('Not authenticated');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.price || !formData.category) {
      setError('Please fill in all required fields (Name, Price, Category)');
      return;
    }

    // Validate price
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      setError('Please enter a valid price');
      return;
    }

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('details', formData.details ? formData.details.trim() : '');
    formDataToSend.append('price', price.toString());
    formDataToSend.append('category', formData.category.trim());
    
    // Append image file if new file is selected
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    } else if (editingProduct && formData.image) {
      // If editing and no new file, send existing image URL (backend will handle keeping it)
      formDataToSend.append('image', formData.image);
    }

    // Debug logging
    console.log('Submitting product data:', {
      name: formData.name.trim(),
      price: price,
      category: formData.category.trim(),
      hasImageFile: !!imageFile
    });

    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/products/${editingProduct._id}`
        : `${API_BASE_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type header - browser will set it with boundary for FormData
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
          name: '',
          image: '',
          details: '',
          price: '',
          category: ''
        });
        setImageFile(null);
        setImagePreview('');
        fetchProducts();
        if (onProductChange) onProductChange(); // Notify parent to refresh
        setTimeout(() => setSuccess(''), 3000);
      } else {
        // Better error handling
        const errorMessage = data.message || data.error || 'Operation failed';
        console.error('Product save error:', errorMessage, data);
        setError(errorMessage);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      image: product.image || '',
      details: product.details || '',
      price: product.price || '',
      category: product.category?._id || product.category || ''
    });
    setImageFile(null);
    setImagePreview(product.image || '');
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    const token = getToken();
    if (!token) {
      setError('Not authenticated');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Product deleted successfully!');
        fetchProducts();
        if (onProductChange) onProductChange(); // Notify parent to refresh
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.message || 'Delete failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error deleting product:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      image: '',
      details: '',
      price: '',
      category: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="product-management">
      <div className="product-management-header">
        <h3>Product Management</h3>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-add-product"
        >
          + Add New Product
        </button>
      </div>

      {error && <div className="admin-message admin-error">{error}</div>}
      {success && <div className="admin-message admin-success">{success}</div>}

      {showForm && (
        <div className="product-form-container">
          <h4>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label>Product Image (Optional)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="preview-image"
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="remove-image-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
              <small className="form-hint">
                Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
              </small>
            </div>

            <div className="form-group">
              <label>Product Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter product details"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Product Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label>Product Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) && categories.map(cat => {
                    const categoryId = cat._id || cat.id;
                    const categoryName = cat.name || 'Unnamed Category';
                    return (
                      <option key={categoryId} value={categoryId}>
                        {categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-list">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">No products found. Add your first product!</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <div className="product-name-cell">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="product-thumbnail"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category?.name || 'N/A'}</td>
                  <td>₱{product.price?.toFixed(2) || '0.00'}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(product)} 
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
