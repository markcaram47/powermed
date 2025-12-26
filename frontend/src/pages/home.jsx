import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/home.css';
import logoImage from '../assets/images/logo.png';

import productImage1 from '../assets/images/home/pc1.png';
import productImage2 from '../assets/images/home/pc2.png';
import productImage3 from '../assets/images/home/pc3.png';
import productImage4 from '../assets/images/home/pc4.png';
import productImage5 from '../assets/images/home/pc5.png';
import productImage6 from '../assets/images/home/pc6.png';
import productImage7 from '../assets/images/home/pc7.png';
import productImage8 from '../assets/images/home/pc8.png';
import productImage9 from '../assets/images/home/pc9.png';

import doctorImage from '../assets/images/doc1.png';
import pillsImage from '../assets/images/med1.png';
import footerLogoImage from '../assets/images/footer_lg.png';
import locIcon from '../assets/images/footer_icons/loc.png';
import mailIcon from '../assets/images/footer_icons/mail.png';
import callIcon from '../assets/images/footer_icons/call.png';
import socialsImage from '../assets/images/footer_icons/socials.png';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
        // Keep empty array on error so UI shows "No categories available"
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Sample products for each category (placeholder data)
  const categoryProducts = [
    [
      { name: 'Semaglutide', dosage: '40/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Tirzepatide', dosage: '45/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Retatrutide', dosage: '65/5mg', description: 'All our products underwent strict quality control' }
    ],
    // Repeat for other categories - for now using same products
    ...Array(8).fill([
      { name: 'Product 1', dosage: '40/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Product 2', dosage: '45/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Product 3', dosage: '65/5mg', description: 'All our products underwent strict quality control' }
    ])
  ];

  // Array of 9 images for the carousel - using c1.png for all products

  const images = [productImage1, productImage2, productImage3, productImage4, productImage5, productImage6, productImage7, productImage8, productImage9];

  const productImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: images[i]
  }));

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
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
        {/* First Div - Hero Section */}
        <div className="hero-section">
          <div className="hero-left">
            <h1 className="hero-tagline">
              <div className="tagline-line-1">Elevate Your</div>
              <div className="tagline-line-2">Wellness Journey</div>
              <div className="tagline-line-3">
                with <span className="tagline-power">Power</span><span className="tagline-m">M</span><span className="tagline-ed">ed</span>
              </div>
            </h1>
            <button className="shop-now-btn">SHOP NOW</button>
          </div>
          <div className="hero-right">
            <div className="product-carousel">
              {/* The Window (hides overflow) */}
              <div className="carousel-container">
                
                {/* The Track (Moves left/right) */}
                <div 
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  onTransitionEnd={() => {
                    if (currentImageIndex === productImages.length) {
                      // Jump back to first image without animation
                      const track = document.querySelector('.carousel-track');
                      track.style.transition = 'none';
                      setCurrentImageIndex(0);
                      setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease-in-out';
                      }, 50);
                    }
                  }}
                >
                  {/* Original images */}
                  {productImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="carousel-slide"
                    >
                      <img 
                        src={image.url} 
                        alt={`Product ${image.id}`}
                        className="product-image"
                      />
                    </div>
                  ))}
                  {/* Clone first image for seamless loop */}
                  <div className="carousel-slide">
                    <img 
                      src={productImages[0].url} 
                      alt="Product 1"
                      className="product-image"
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Second Div - Features Section */}
        <div className="features-section">
          {/* Decorative pills in top right */}
          <div className="decorative-pills">
            <img 
              src={pillsImage} 
              alt="Decorative Pills" 
              className="pills-image"
            />
          </div>
          
          <div className="features-content">
            <div className="features-left">
              <h2 className="features-title">Lorem ipsum dolor sit amet is olor.</h2>
              <div className="doctor-image-container">
                <img 
                  src={doctorImage} 
                  alt="Doctor" 
                  className="doctor-image"
                />
              </div>
            </div>
            
            <div className="features-right">
              <div className="features-grid">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="feature-card">
                    <div className="feature-icon">
                      {/* Placeholder icon - gray square with rounded corners */}
                    </div>
                    <h3 className="feature-title">Quality Products</h3>
                    <p className="feature-description">
                      All our products underwent strict quality control
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Div - Products Section */}
        <div className="products-section">
          <div className="products-header">
            <h2 className="products-title">Our Products</h2>
            <Link to="/products" className="view-all-link">View All</Link>
          </div>
          
          <div className="products-content">
            <div className="products-categories">
              {loadingCategories ? (
                <div className="loading-categories">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.map((category, index) => (
                  <div
                    key={category._id || index}
                    className={`category-item ${selectedCategory === index ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(index)}
                  >
                    {category.name}
                  </div>
                ))
              ) : (
                <div className="no-categories">No categories available</div>
              )}
            </div>
            
            <div className="products-display">
              {selectedCategory !== null && categories[selectedCategory] && categoryProducts[selectedCategory] ? (
                categoryProducts[selectedCategory].map((product, index) => (
                  <div key={index} className="product-card">
                    <div className="product-bubble">
                      {product.dosage}
                    </div>
                    <div className="product-image-container">
                      <img 
                        src="https://via.placeholder.com/200x300/4A9E9E/FFFFFF?text=Product" 
                        alt={product.name}
                        className="product-vial-image"
                      />
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                  </div>
                ))
              ) : (
                // Show placeholder when no category is selected
                [1, 2, 3].map((item) => (
                  <div key={item} className="product-card">
                    <div className="product-bubble">
                      --
                    </div>
                    <div className="product-image-container">
                      <img 
                        src="https://via.placeholder.com/200x300/E0E0E0/999999?text=Select+Category" 
                        alt="Select Category"
                        className="product-vial-image"
                      />
                    </div>
                    <h3 className="product-name">Select a Category</h3>
                    <p className="product-description">Choose a category to view products</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

       

        {/* Fifth Div - Questions Section */}
        <div className="questions-section">
          <div className="questions-container">
            <div className="questions-left">
              <h2 className="questions-title">
                <div className="questions-title-line1">Got A Question</div>
                <div className="questions-title-line2">
                  For <span className="questions-power">Power</span><span className="questions-m">M</span><span className="questions-ed">ed?</span>
                </div>
              </h2>
              <p className="questions-description">
                <span className="questions-desc-line1">If there are questions you want to ask</span>
                <span className="questions-desc-line2">we we will answer all your question.</span>
              </p>
              <div className="questions-form">
                <input 
                  type="email" 
                  placeholder="Enter Your Email" 
                  className="questions-input"
                />
                <button className="questions-submit-btn">Submit</button>
              </div>
            </div>
            
            <div className="questions-right">
              <h3 className="questions-right-title">
                <span className="questions-right-line1">Maybe your question is have been</span>
                <span className="questions-right-line2">answered. Check this out:</span>
              </h3>
              <div className="questions-list">
                <div className="question-item">
                  <p>Question 1</p>
                </div>
                <div className="question-item">
                  <p>Question 2</p>
                </div>
                <div className="question-item">
                  <p>Question 3</p>
                </div>
                <div className="question-item">
                  <p>Question 4</p>
                </div>
              </div>
            </div>
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

export default Home;
