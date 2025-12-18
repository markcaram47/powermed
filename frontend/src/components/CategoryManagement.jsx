import React, { useState, useEffect } from 'react';
import './CategoryManagement.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const CategoryManagement = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    slug: '',
    order: '',
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const getToken = () => {
    return localStorage.getItem('adminToken');
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (response.ok) {
        const result = await response.json();
        const categoriesData = Array.isArray(result) 
          ? result 
          : (result.data || []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('type', formData.type.trim() || '');
    if (formData.description) formDataToSend.append('description', formData.description.trim());
    if (formData.slug) formDataToSend.append('slug', formData.slug.trim());
    if (formData.order) formDataToSend.append('order', formData.order);
    formDataToSend.append('isActive', formData.isActive);
    
    // Append image file if new file is selected
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    } else if (editingCategory && editingCategory.image) {
      // If editing and no new file, send existing image URL (backend will handle keeping it)
      formDataToSend.append('image', editingCategory.image);
    }

    try {
      const url = editingCategory 
        ? `${API_BASE_URL}/categories/${editingCategory._id}`
        : `${API_BASE_URL}/categories`;
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type header - browser will set it with boundary for FormData
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
        setShowForm(false);
        setEditingCategory(null);
        setFormData({
          name: '',
          type: '',
          description: '',
          slug: '',
          order: '',
          isActive: true
        });
        setImageFile(null);
        setImagePreview('');
        fetchCategories();
        if (onCategoryChange) onCategoryChange();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      type: category.type || '',
      description: category.description || '',
      slug: category.slug || '',
      order: category.order || '',
      isActive: category.isActive !== undefined ? category.isActive : true
    });
    setImageFile(null);
    setImagePreview(category.image || '');
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? Products in this category may be affected.')) {
      return;
    }

    const token = getToken();
    if (!token) {
      setError('Not authenticated');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Category deleted successfully!');
        fetchCategories();
        if (onCategoryChange) onCategoryChange();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Delete failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error deleting category:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      type: '',
      description: '',
      slug: '',
      order: '',
      isActive: true
    });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="category-management">
      <div className="category-management-header">
        <h3>Category Management</h3>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-add-category"
        >
          + Add New Category
        </button>
      </div>

      {error && <div className="admin-message admin-error">{error}</div>}
      {success && <div className="admin-message admin-success">{success}</div>}

      {showForm && (
        <div className="category-form-container">
          <h4>{editingCategory ? 'Edit Category' : 'Add New Category'}</h4>
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-row">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g., peptide, injectable"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category Image (Optional)</label>
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
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter category description"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="category-slug"
                />
              </div>
              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group-checkbox">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <label htmlFor="isActive">Active</label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingCategory ? 'Update Category' : 'Create Category'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="categories-list">
        {loading ? (
          <div className="loading">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="no-categories">No categories found. Add your first category!</div>
        ) : (
          <table className="categories-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category._id}>
                  <td>
                    <div className="category-name-cell">
                      {category.image && (
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="category-thumbnail"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <span>{category.name}</span>
                    </div>
                  </td>
                  <td>{category.type || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(category)} 
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category._id)} 
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

export default CategoryManagement;

