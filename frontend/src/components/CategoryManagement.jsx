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
    type: ''
  });

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

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    const categoryData = {
      name: formData.name.trim(),
      type: formData.type.trim() || ''
    };

    try {
      const url = editingCategory 
        ? `${API_BASE_URL}/categories/${editingCategory._id}`
        : `${API_BASE_URL}/categories`;
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
        setShowForm(false);
        setEditingCategory(null);
        setFormData({
          name: '',
          type: ''
        });
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
      type: category.type || ''
    });
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
      type: ''
    });
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

