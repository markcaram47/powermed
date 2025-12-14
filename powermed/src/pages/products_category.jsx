import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import '../styles/home.css';
import '../styles/products.css';
import '../styles/products_category.css';
import logoImage from '../assets/images/logo.png';
import cat1Bg from '../assets/images/product_category/cat1_bg.png';
import cat2Bg from '../assets/images/product_category/cat2_bg.png';
import cat3Bg from '../assets/images/product_category/cat3_bg.png';
import cat4Bg from '../assets/images/product_category/cat4_bg.png';
import cat5Bg from '../assets/images/product_category/cat5_bg.png';
import cat6Bg from '../assets/images/product_category/cat6_bg.png';
import cat7Bg from '../assets/images/product_category/cat7_bg.png';
import cat8Bg from '../assets/images/product_category/cat8_bg.png';
import cat9Bg from '../assets/images/product_category/cat9_bg.png';

const ProductsCategory = () => {
  const { categoryId } = useParams();

  // Category data with products
  const categories = {
    'weight-management': {
      title: 'Weight Management & Metabolic Support Peptides',
      backgroundImage: cat1Bg,
      products: [
        'Semaglutide',
        'Tirzepatide',
        'Retatrutide',
        'Cagrilintide',
        'Survodutide',
        'AOD9604',
        '5-Amino-1MQ',
        'MOTS-C'
      ]
    },
    'regenerative-repair': {
      title: 'Regenerative, Repair & Anti-Aging Peptides',
      backgroundImage: cat2Bg,
      products: [
        'BPC-157',
        'TB-500',
        'GHK-Cu',
        'Epitalon',
        'SS-31',
        'DSIP'
      ]
    },
    'growth-hormone': {
      title: 'Growth Hormone, Modulating Peptides',
      backgroundImage: cat3Bg,
      products: [
        'CJC-1295 (DAC)',
        'CJC-1295 (no DAC)',
        'CJC + Ipamorelin',
        'Ipamorelin',
        'Sermorelin',
        'Tesamorelin'
      ]
    },
    'cognitive-mood': {
      title: 'Cognitive, Mood & Stress Support Peptides',
      backgroundImage: cat4Bg,
      products: [
        'Selank',
        'Semax',
        'DSIP'
      ]
    },
    'skin-beauty': {
      title: 'Skin, Beauty & Cosmetic Peptides',
      backgroundImage: cat5Bg,
      products: [
        'Snap-8',
        'GHK-Cu',
        'BB20',
        'GLOW (GHK-Cu + TB-500 + BPC-157)',
        'KLOW (BPC + TB-500 + GHK-Cu + KPV)'
      ]
    },
    'sexual-wellness': {
      title: 'Sexual Wellness Peptides',
      backgroundImage: cat6Bg,
      products: [
        'PT-141 (Bremelanotide)',
        'Kisspeptin-10',
        'Oxytocin'
      ]
    },
    'fat-burner': {
      title: 'Fat Burner Injectables (Not Peptides)',
      backgroundImage: cat7Bg,
      products: [
        'Lipo-C',
        'Lemon Bottle'
      ]
    },
    'hormones-growth': {
      title: 'Hormones & Growth Factors (Not Peptides)',
      backgroundImage: cat8Bg,
      products: [
       'HCG',
       'HGH',
       'IGF-1 LR3',
      ]
    },
    'vitamins-cofactors': {
      title: 'Vitamins, Cofactors & Others',
      backgroundImage: cat9Bg,
      products: [
        'NAD+',
        'Bac Water',
        'Acid Water',
        'Botox'
      ]
    }
  };

  // Get current category data
  const currentCategory = categories[categoryId] || categories['weight-management'];

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
        {/* First Div - Category Banner */}
        <div className="category-banner-section">
          <div 
            className="category-banner-background"
            style={{ backgroundImage: `url(${currentCategory.backgroundImage})` }}
          >
            <div className="category-banner-content">
              <div className="category-banner-left">
                <h1 className="category-banner-title">{currentCategory.title}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Second Div - Products Grid */}
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
            <p className="products-info-line1">Showing 1-{currentCategory.products.length} item(s)</p>
            <p className="products-info-line2">Below is the list of our available PowerMed products.</p>
          </div>

          {/* Products Grid */}
          <div className="products-categories-grid">
            {currentCategory.products.map((product, index) => (
              <div key={index} className="product-item-card">
                <div className="product-item-image-container">
                  <img 
                    src="https://via.placeholder.com/200x200/E0E0E0/999999?text=Product" 
                    alt={product}
                    className="product-item-image"
                  />
                </div>
                <h3 className="product-item-name">{product}</h3>
              </div>
            ))}
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

export default ProductsCategory;
