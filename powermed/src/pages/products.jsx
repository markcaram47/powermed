import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/home.css';
import '../styles/products.css';
import logoImage from '../assets/images/logo.png';
import productHomeImage from '../assets/images/product_home.jpeg';

const Products = () => {
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
            <p className="products-info-line1">Showing 1-10 item(s)</p>
            <p className="products-info-line2">Below is the list of our available PowerBath.</p>
          </div>

          {/* Categories Grid */}
          <div className="products-categories-grid">
            <Link to="/products/weight-management" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Weight Management & Metabolic Support Peptides"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Weight Management & Metabolic Support Peptides</h3>
            </Link>

            <Link to="/products/regenerative-repair" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Regenerative, Repair & Anti-Aging Peptides"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Regenerative, Repair & Anti-Aging Peptides</h3>
            </Link>

            <Link to="/products/growth-hormone" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Growth Hormone-Modulating Peptides"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Growth Hormone-Modulating Peptides</h3>
            </Link>

            <Link to="/products/cognitive-mood" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Cognitive, Mood & Stress Support Peptides"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Cognitive, Mood & Stress Support Peptides</h3>
            </Link>

            <Link to="/products/skin-beauty" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Skin, Beauty & Cosmetic Peptides"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Skin, Beauty & Cosmetic Peptides</h3>
            </Link>

            <Link to="/products/sexual-wellness" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Sexual Wellness Peptides"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Sexual Wellness Peptides</h3>
            </Link>

            <Link to="/products/fat-burner" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Fat Burner Injectables"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Fat Burner Injectables</h3>
            </Link>

            <Link to="/products/hormones-growth" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Hormones & Growth Factors"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Hormones & Growth Factors</h3>
            </Link>

            <Link to="/products/vitamins-cofactors" className="category-card">
              <div className="category-image-container">
                <img 
                  src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                  alt="Vitamins, Cofactors & Others"
                  className="category-image"
                />
              </div>
              <h3 className="category-name">Vitamins, Cofactors & Others</h3>
            </Link>
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
                <span className="footer-icon">📍</span>
                <p>Add: 11th Avenue Bonifacio Global City, Taguig</p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">✉️</span>
                <p>powermed.ph@gmail.com</p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">📞</span>
                <p>Phone: 0917 708 3801</p>
              </div>
              <div className="footer-social">
                <span className="social-icon">f</span>
                <span className="social-icon">📷</span>
                <span className="social-icon">🎵</span>
                <span className="social-icon">▶️</span>
                <span className="social-icon">P</span>
              </div>
            </div>
            
            <div className="footer-logo">
              <div className="footer-logo-icon">+</div>
              <p className="footer-logo-text">PowerMed</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
