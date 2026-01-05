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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); //CHE 
  
  // QNA Section States
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ visible: false, question: '', answer: '' });

  // Hardcoded FAQs
  const homeFAQs = [
    {
      question: "What are peptides and how do they work?",
      answer: "Peptides are short chains of amino acids that act as signaling molecules in the body. They can help regulate various biological functions including metabolism, tissue repair, and hormone production."
    },
    {
      question: "Are your products safe and tested?",
      answer: "Yes, all our products undergo strict quality control and testing procedures. We ensure that every product meets pharmaceutical-grade standards before reaching our customers."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within Metro Manila and 5-7 business days for provincial areas. Express shipping options are also available."
    },
    {
      question: "Do I need a prescription for peptide products?",
      answer: "Some peptide products may require a prescription depending on local regulations. We recommend consulting with a healthcare professional before starting any new supplement regimen."
    }
  ];

  const carouselCategories = [
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

  // QNA Section Handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email submission
    setTimeout(() => {
      alert(`Thank you! We'll contact you at ${email}`);
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handlePopup = (question, answer) => {
    setPopup({ visible: true, question, answer });
  };

  const closePopup = () => {
    setPopup({ visible: false, question: '', answer: '' });
  };

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

  // Sample products for each category (placeholder data)
  const categoryProducts = [
    [
      { name: 'Semaglutide', dosage: '40/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Tirzepatide', dosage: '45/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Retatrutide', dosage: '65/5mg', description: 'All our products underwent strict quality control' }
    ],
    ...Array(8).fill([
      { name: 'Product 1', dosage: '40/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Product 2', dosage: '45/5mg', description: 'All our products underwent strict quality control' },
      { name: 'Product 3', dosage: '65/5mg', description: 'All our products underwent strict quality control' }
    ])
  ];

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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    if (currentImageIndex === 0) {
      const track = document.querySelector('.carousel-track');
      track.style.transition = 'none';
      setCurrentImageIndex(productImages.length);
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
        setCurrentImageIndex(productImages.length - 1);
      }, 50);
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getCurrentCategory = () => {
    if (categories.length > 0 && categories[currentImageIndex] && categories[currentImageIndex].name) {
      const name = categories[currentImageIndex].name;
      if (name && typeof name === 'string') {
        const parts = name.split(' & ');
        if (parts.length > 1) {
          return {
            line1: parts[0] + ' &',
            line2: parts.slice(1).join(' & ')
          };
        }
        const dashSplit = name.split('–');
        if (dashSplit.length > 1) {
          return {
            line1: dashSplit[0] + '–',
            line2: dashSplit.slice(1).join('–')
          };
        }
        const midPoint = Math.ceil(name.length / 2);
        const spaceIndex = name.lastIndexOf(' ', midPoint);
        if (spaceIndex > 0) {
          return {
            line1: name.substring(0, spaceIndex),
            line2: name.substring(spaceIndex + 1)
          };
        }
        return {
          line1: name,
          line2: ''
        };
      }
    }
    const fallbackIndex = currentImageIndex < carouselCategories.length ? currentImageIndex : 0;
    return carouselCategories[fallbackIndex] || { line1: '', line2: '' };
  };
  
  const currentCategory = getCurrentCategory();

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

  // mobile menu toggle functions CHE
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  //header on scroll CHE
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Footer animation on scroll CHE
  useEffect(() => {
    const footer = document.querySelector(".footer");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("footer-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footer) observer.observe(footer);
  }, []);


  return (
    <div className="home-container">
      {/* Header CHE */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img src={logoImage} alt="PowerMed Logo" className="logo" />
          </div>
        </div>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>

        <div 
          className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        ></div>

        <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <button className="mobile-menu-close" onClick={closeMobileMenu}>
            ×
          </button>

          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMobileMenu}
          >
            Products <span className="dropdown-arrow">▼</span>
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMobileMenu}
          >
            Contact Us
          </NavLink>
        </nav>
      </header>

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
              <div className="carousel-container">
                <div 
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  onTransitionEnd={() => {
                    if (currentImageIndex === productImages.length) {
                      const track = document.querySelector('.carousel-track');
                      track.style.transition = 'none';
                      setCurrentImageIndex(0);
                      setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease-in-out';
                      }, 50);
                    }
                  }}
                >
                  {productImages.map((image, index) => (
                    <div key={image.id} className="carousel-slide">
                      <img 
                        src={image.url} 
                        alt={`Product ${image.id}`}
                        className="product-image"
                      />
                    </div>
                  ))}
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

        {/* Features Section */}
        <div className="features-section">
          <div className="decorative-pills">
            <img src={pillsImage} alt="Decorative Pills" className="pills-image" />
          </div>
          
          <div className="features-content">
            <div className="features-left">
              <h2 className="features-title">Lorem ipsum dolor sit amet is olor.</h2>
              <div className="doctor-image-container">
                <img src={doctorImage} alt="Doctor" className="doctor-image" />
              </div>
            </div>
            
            <div className="features-right">
              <div className="features-grid">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="feature-card">
                    <div className="feature-icon"></div>
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

        {/* Products Section */}
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
                    <div className="product-bubble">{product.dosage}</div>
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
                [1, 2, 3].map((item) => (
                  <div key={item} className="product-card">
                    <div className="product-bubble">--</div>
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

        {/* QNA Section - Hardcoded */}
        <div className="qna">
          <div className="Qemail">
            <h1>Got A Question <br />For Power<span>M</span>ed?</h1>
            <p>If there are questions you want to ask, <br />
            we will answer all your questions.</p>

            <div className="Qemail-container">
              <form className="QemailForm" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="emailInput"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  aria-label="Email address"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="submitButton"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>

          <div className="Qfaqs">
            <p>Maybe your question has already been <br />answered. Check this out:</p>
            <div className="Qdivider"></div>
            
            {homeFAQs.map((faq, index) => (
              <React.Fragment key={index}>
                <div className={`Q${index + 1}`}>
                  <button onClick={() => handlePopup(faq.question, faq.answer)}>
                    <span>{faq.question}</span>
                  </button>
                </div>
                <div className="Qdivider"></div>
              </React.Fragment>
            ))}
          </div>
          
          {popup.visible && (
            <div className="lp-popup-overlay" onClick={closePopup}>
              <div className="lp-popup-box" onClick={(e) => e.stopPropagation()}>
                <h2>{popup.question}</h2>
                <p>{popup.answer}</p>
                <button onClick={closePopup} className="popup-close">Close</button>
              </div>
            </div>
          )}
        </div>
      </main>

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