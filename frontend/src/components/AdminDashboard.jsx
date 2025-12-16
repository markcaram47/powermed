import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'products', or 'categories'

  useEffect(() => {
    fetchData();
  }, []);

  // Refresh data when switching back to overview
  useEffect(() => {
    if (activeView === 'overview') {
      fetchData();
    }
  }, [activeView]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products`),
        fetch(`${API_BASE_URL}/categories`)
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(Array.isArray(productsData) ? productsData : []);
      }

      if (categoriesRes.ok) {
        const categoriesResult = await categoriesRes.json();
        const categoriesData = Array.isArray(categoriesResult) 
          ? categoriesResult 
          : (categoriesResult.data || []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const categoryId = product.category?._id || product.category;
    const categoryName = product.category?.name || 'Uncategorized';
    
    if (!acc[categoryId]) {
      acc[categoryId] = {
        categoryId,
        categoryName,
        products: []
      };
    }
    acc[categoryId].products.push(product);
    return acc;
  }, {});

  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (activeView === 'products') {
    return (
      <div className="admin-dashboard-content">
        <div className="dashboard-header-section">
          <button 
            onClick={() => {
              setActiveView('overview');
              fetchData(); // Refresh data when going back
            }} 
            className="back-to-overview-btn"
          >
            ← Back to Overview
          </button>
          <h2>Product Management</h2>
        </div>
        <ProductManagement onProductChange={fetchData} />
      </div>
    );
  }

  if (activeView === 'categories') {
    return (
      <div className="admin-dashboard-content">
        <div className="dashboard-header-section">
          <button 
            onClick={() => {
              setActiveView('overview');
              fetchData(); // Refresh data when going back
            }} 
            className="back-to-overview-btn"
          >
            ← Back to Overview
          </button>
          <h2>Category Management</h2>
        </div>
        <CategoryManagement onCategoryChange={fetchData} />
      </div>
    );
  }

  return (
    <div className="admin-dashboard-content">
      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card stat-card-products">
          <div className="stat-icon stat-icon-products">📦</div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card stat-card-categories">
          <div className="stat-icon stat-icon-categories">📁</div>
          <div className="stat-info">
            <h3>{stats.totalCategories}</h3>
            <p>Total Categories</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-actions">
        <button 
          onClick={() => setActiveView('products')}
          className="action-btn primary"
        >
          <span className="action-icon">⚙️</span>
          Manage Products
        </button>
        <button 
          onClick={() => setActiveView('categories')}
          className="action-btn primary"
        >
          <span className="action-icon">📁</span>
          Manage Categories
        </button>
      </div>

      {/* Products by Category */}
      <div className="dashboard-section">
        <h2 className="section-title">Products by Category</h2>
        
        {Object.keys(productsByCategory).length === 0 ? (
          <div className="empty-state">
            <p>No products found. Start by adding your first product!</p>
            <button 
              onClick={() => setActiveView('products')}
              className="action-btn primary"
            >
              Add Product
            </button>
          </div>
        ) : (
          <div className="categories-grid">
            {Object.values(productsByCategory).map((categoryGroup) => (
              <div key={categoryGroup.categoryId} className="category-card">
                <div className="category-card-header">
                  <h3>{categoryGroup.categoryName}</h3>
                  <span className="product-count">
                    {categoryGroup.products.length} {categoryGroup.products.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
                <div className="category-products">
                  {categoryGroup.products.slice(0, 5).map((product) => (
                    <div key={product._id} className="product-item">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="product-item-image"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div className="product-item-info">
                        <h4>{product.name}</h4>
                        <p className="product-price">₱{parseFloat(product.price || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  {categoryGroup.products.length > 5 && (
                    <div className="more-products">
                      +{categoryGroup.products.length - 5} more products
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

