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

    const productData = {
      name: formData.name.trim(),
      image: formData.image ? formData.image.trim() : '',
      details: formData.details ? formData.details.trim() : '',
      price: parseFloat(formData.price),
      category: formData.category.trim()
    };

    // Validate price
    if (isNaN(productData.price) || productData.price < 0) {
      setError('Please enter a valid price');
      return;
    }

    // Debug logging
    console.log('Submitting product data:', productData);
    console.log('Selected category ID:', productData.category);
    console.log('Available categories:', categories);

    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/products/${editingProduct._id}`
        : `${API_BASE_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
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
        fetchProducts();
        if (onProductChange) onProductChange(); // Notify parent to refresh
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Operation failed');
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
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
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
