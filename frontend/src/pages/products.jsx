import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/home.css';
import '../styles/products.css';
import logoImage from '../assets/images/logo.png';
import productHomeImage from '../assets/images/product_home.jpeg';
import footerLogoImage from '../assets/images/footer_lg.png';
import locIcon from '../assets/images/footer_icons/loc.png';
import mailIcon from '../assets/images/footer_icons/mail.png';
import callIcon from '../assets/images/footer_icons/call.png';
import socialsImage from '../assets/images/footer_icons/socials.png';

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch('http://localhost:5001/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Categories API response:', data);
        
        if (data.success && data.data) {
          console.log('Setting categories:', data.data);
          setCategories(data.data);
        } else {
          console.error('Error fetching categories - invalid response:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img 
              src={logoImage} 
              alt="PowerMed Logo" 
              className="logo"
            />
          </div>
        </div>
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Products
            <span className="dropdown-arrow">▼</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Contact Us
          </NavLink>
        </nav>
      </header>

      {/* Body */}
      <main className="main-content">
        {/* First Div - Product Image Header */}
        <div className="products-header-section">
          <img 
            src={productHomeImage} 
            alt="PowerMed Products" 
            className="products-header-image"
          />
        </div>

        {/* Second Div - Categories Grid */}
        <div className="products-categories-section">
          {/* Search Bar */}
          <div className="products-search-container">
            <div className="products-search-bar">
              <input 
                type="text" 
                placeholder="Search...." 
                className="products-search-input"
              />
              <button className="products-search-button">
                <span className="search-icon">🔍</span>
              </button>
            </div>
          </div>

          {/* Info Text */}
          <div className="products-info-text">
            <p className="products-info-line1">
              Showing {loadingCategories ? '...' : `1-${categories.length}`} item(s)
            </p>
            <p className="products-info-line2">Below is the list of our available PowerBath.</p>
          </div>

          {/* Categories Grid */}
          <div className="products-categories-grid">
            {loadingCategories ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#666666' }}>
                Loading categories...
              </div>
            ) : categories.length > 0 ? (
              categories.map((category, index) => {
                // Use slug for route, fallback to generated slug from name
                const routeSlug = category.slug || category.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '');
                
                // Construct image URL - use database image if available, otherwise placeholder
                const imageUrl = category.image 
                  ? `http://localhost:5001${category.image}`
                  : 'https://via.placeholder.com/200x200/E0E0E0/999999?text=Product';
                
                return (
                  <Link 
                    key={category._id || index} 
                    to={`/products/${routeSlug}`} 
                    className="category-card"
                  >
                    <div className="category-image-container">
                      <img 
                        src={imageUrl}
                        alt={category.name}
                        className="category-image"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.target.src = 'https://via.placeholder.com/200x200/E0E0E0/999999?text=Product';
                        }}
                      />
                    </div>
                    <h3 className="category-name">{category.name}</h3>
                  </Link>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#666666' }}>
                No categories available
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-slogan">
              <div className="footer-slogan-line1">Glow today,</div>
              <div className="footer-slogan-line2">thank yourself</div>
              <div className="footer-slogan-line3">tomorrow.</div>
            </div>
          </div>
          
          <div className="footer-right">
            <div className="footer-contact">
              <h3 className="footer-contact-title">Reach out to us</h3>
              <div className="footer-contact-item">
                <img src={locIcon} alt="Location" className="footer-icon" />
                <p>Add: 11th Avenue Bonifacio Global City, Taguig</p>
              </div>
              <div className="footer-contact-item">
                <img src={mailIcon} alt="Email" className="footer-icon" />
                <p>powermed.ph@gmail.com</p>
              </div>
              <div className="footer-contact-item">
                <img src={callIcon} alt="Phone" className="footer-icon" />
                <p>Phone: 0917 708 3801</p>
              </div>
              <div className="footer-social">
                <img src={socialsImage} alt="Social Media" className="footer-social-image" />
              </div>
            </div>
            
            <div className="footer-logo">
              <img 
                src={footerLogoImage} 
                alt="PowerMed Logo" 
                className="footer-logo-image"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
