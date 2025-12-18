import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import '../styles/home.css';
import '../styles/products.css';
import '../styles/products_category.css';
import logoImage from '../assets/images/logo.png';
import footerLogoImage from '../assets/images/footer_lg.png';
import locIcon from '../assets/images/footer_icons/loc.png';
import mailIcon from '../assets/images/footer_icons/mail.png';
import callIcon from '../assets/images/footer_icons/call.png';
import socialsImage from '../assets/images/footer_icons/socials.png';
import cat1Bg from '../assets/images/product_category/cat1_bg.png';
import cat2Bg from '../assets/images/product_category/cat2_bg.png';
import cat3Bg from '../assets/images/product_category/cat3_bg.png';
import cat4Bg from '../assets/images/product_category/cat4_bg.png';
import cat5Bg from '../assets/images/product_category/cat5_bg.png';
import cat6Bg from '../assets/images/product_category/cat6_bg.png';
import cat7Bg from '../assets/images/product_category/cat7_bg.png';
import cat8Bg from '../assets/images/product_category/cat8_bg.png';
import cat9Bg from '../assets/images/product_category/cat9_bg.png';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const ProductsCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Background images mapping (kept for display purposes)
  const backgroundImages = {
    'weight-management': cat1Bg,
    'regenerative-repair': cat2Bg,
    'growth-hormone': cat3Bg,
    'cognitive-mood': cat4Bg,
    'skin-beauty': cat5Bg,
    'sexual-wellness': cat6Bg,
    'fat-burner': cat7Bg,
    'hormones-growth': cat8Bg,
    'vitamins-cofactors': cat9Bg,
  };

  // Fetch category and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First, fetch all categories to find the matching one
        const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
        const categoriesData = await categoriesResponse.json();
        
        const categoriesList = Array.isArray(categoriesData) 
          ? categoriesData 
          : (categoriesData.data || []);
        
        // Find category by slug or name match
        const foundCategory = categoriesList.find(cat => {
          const categorySlug = cat.slug || cat.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          return categorySlug === categoryId;
        });

        if (foundCategory) {
          setCategory(foundCategory);
          
          // Fetch products for this category
          const categoryDbId = foundCategory._id || foundCategory.id;
          const productsResponse = await fetch(`${API_BASE_URL}/products?category=${categoryDbId}`);
          const productsData = await productsResponse.json();
          
          setProducts(Array.isArray(productsData) ? productsData : []);
        } else {
          console.error('Category not found:', categoryId);
          setCategory(null);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching category/products:', error);
        setCategory(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.details?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get background image for category - use static mapping based on URL categoryId
  // Try to match the URL categoryId, with fallback to partial matching
  const getBackgroundImage = () => {
    if (!categoryId) return cat1Bg;
    
    // Try exact match first
    if (backgroundImages[categoryId]) {
      return backgroundImages[categoryId];
    }
    
    // Try partial matching - check if categoryId contains any background key
    const slugKeys = Object.keys(backgroundImages);
    for (const key of slugKeys) {
      if (categoryId.includes(key)) {
        return backgroundImages[key];
      }
    }
    
    // Default fallback
    return cat1Bg;
  };

  const backgroundImage = getBackgroundImage();
  
  // Get category title - format with line breaks for better display
  const getCategoryTitle = (categoryName) => {
    if (!categoryName) return 'Products';
    
    // Split by common separators or keep as is
    // You can customize this based on your category naming conventions
    const words = categoryName.split(/[&,]/).map(w => w.trim());
    
    if (words.length > 1) {
      return (
        <>
          {words.map((word, index) => (
            <React.Fragment key={index}>
              {word}
              {index < words.length - 1 && <br />}
            </React.Fragment>
          ))}
        </>
      );
    }
    
    // For single words or phrases, try to break at logical points
    const parts = categoryName.split(/(?=[&,])/);
    if (parts.length > 1) {
      return (
        <>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part.trim()}
              {index < parts.length - 1 && <br />}
            </React.Fragment>
          ))}
        </>
      );
    }
    
    return categoryName;
  };

  const categoryTitle = category ? getCategoryTitle(category.name) : (categoryId || 'Products');

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
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="category-banner-content">
              <div className="category-banner-left">
                <h1 className="category-banner-title">{categoryTitle}</h1>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="products-search-button">
                <span className="search-icon">🔍</span>
              </button>
            </div>
          </div>

          {/* Info Text */}
          <div className="products-info-text">
            <p className="products-info-line1">
              {loading 
                ? 'Loading...' 
                : `Showing ${filteredProducts.length > 0 ? 1 : 0}-${filteredProducts.length} item(s)`}
            </p>
            <p className="products-info-line2">Below is the list of our available PowerMed products.</p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#666666' }}>
              Loading products...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-categories-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-item-card">
                  <div className="product-item-image-container">
                    <img 
                      src={product.image || 'https://via.placeholder.com/200x200/E0E0E0/999999?text=Product'} 
                      alt={product.name}
                      className="product-item-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200/E0E0E0/999999?text=Product';
                      }}
                    />
                  </div>
                  <h3 className="product-item-name">{product.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#666666' }}>
              {searchTerm ? 'No products found matching your search.' : 'No products available in this category.'}
            </div>
          )}
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

export default ProductsCategory;
