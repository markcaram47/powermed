import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/home.css';
import logoImage from '../assets/images/logo.png';
import productImage1 from '../assets/images/c1.png';
import doctorImage from '../assets/images/doc1.png';
import pillsImage from '../assets/images/med1.png';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Array of 9 categories with line breaks (for carousel)
  const categories = [
    {
      line1: 'Weight Management &',
      line2: 'Metabolic Support Peptides'
    },
    {
      line1: 'Regenerative, Repair &',
      line2: 'Anti-Aging Peptides'
    },
    {
      line1: 'Growth Hormone–',
      line2: 'Modulating Peptides'
    },
    {
      line1: 'Cognitive, Mood &',
      line2: 'Stress Support Peptides'
    },
    {
      line1: 'Skin, Beauty &',
      line2: 'Cosmetic Peptides'
    },
    {
      line1: 'Sexual Wellness',
      line2: 'Peptides'
    },
    {
      line1: 'Fat Burner Injectables',
      line2: '(Not Peptides)'
    },
    {
      line1: 'Hormones & Growth Factors',
      line2: '(Not Peptides)'
    },
    {
      line1: 'Vitamins, Cofactors &',
      line2: 'Others'
    }
  ];

  // Full category names for the products section
  const categoryNames = [
    'Weight Management & Metabolic Support Peptides',
    'Regenerative, Repair & Anti-Aging Peptides',
    'Growth Hormone–Modulating Peptides',
    'Cognitive, Mood & Stress Support Peptides',
    'Skin, Beauty & Cosmetic Peptides',
    'Sexual Wellness Peptides',
    'Fat Burner Injectables (Not Peptides)',
    'Hormones & Growth Factors (Not Peptides)',
    'Vitamins, Cofactors & Others'
  ];

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
  const productImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: productImage1
  }));

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  // Get current category based on currentImageIndex
  const currentCategory = categories[currentImageIndex];

  // Testimonials/Reviews data
  const testimonials = [
    {
      name: 'Jordan N.',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      name: 'Michael T.',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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
              {/* Decorative red plus signs - positioned relative to carousel */}
              <div className="decorative-plus-plus">+</div>
              <div className="decorative-plus-plus decorative-plus-2">+</div>
              
              <button className="carousel-btn carousel-prev" onClick={prevImage}>
                ‹
              </button>
              <div className="carousel-container">
                {productImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`carousel-slide ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                  >
                    <img 
                      src={image.url} 
                      alt={`Product ${image.id}`}
                      className="product-image"
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-btn carousel-next" onClick={nextImage}>
                ›
              </button>
              <div className="carousel-dots">
                {productImages.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></span>
                ))}
              </div>
              
              {/* Category Label Bubble - changes with carousel */}
              <div className="category-label">
                <div className="category-line-1">{currentCategory.line1}</div>
                <div className="category-line-2">{currentCategory.line2}</div>
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
              {categoryNames.map((category, index) => (
                <div
                  key={index}
                  className={`category-item ${selectedCategory === index ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(index)}
                >
                  {category}
                </div>
              ))}
            </div>
            
            <div className="products-display">
              {selectedCategory !== null && categoryProducts[selectedCategory] ? (
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

        {/* Fourth Div - Reviews/Testimonials Section */}
        <div className="reviews-section">
          <div className="reviews-container">
            <div className="reviews-header">
              <h2 className="reviews-title">WHAT OTHERS SAY</h2>
              <p className="reviews-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            
            <div className="reviews-carousel-container">
              <button className="review-carousel-btn review-carousel-prev" onClick={prevReview}>
                ‹
              </button>
              
              <div className="reviews-carousel">
                <div 
                  className="reviews-carousel-track"
                  style={{ transform: `translateX(calc(10% - ${currentReviewIndex} * (80% + 2rem)))` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="review-card">
                      <h3 className="review-name">{testimonial.name}</h3>
                      <div className="review-stars">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                      <p className="review-text">{testimonial.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="review-carousel-btn review-carousel-next" onClick={nextReview}>
                ›
              </button>
            </div>
            
            <div className="review-dots">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`review-dot ${index === currentReviewIndex ? 'active' : ''}`}
                  onClick={() => setCurrentReviewIndex(index)}
                ></span>
              ))}
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

export default Home;
