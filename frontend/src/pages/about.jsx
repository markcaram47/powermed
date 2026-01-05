import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/about.css';
import logoImage from '../assets/images/logo.png';
import footerLogoImage from '../assets/images/footer_lg.png';
import locIcon from '../assets/images/footer_icons/loc.png';
import mailIcon from '../assets/images/footer_icons/mail.png';
import callIcon from '../assets/images/footer_icons/call.png';
import socialsImage from '../assets/images/footer_icons/socials.png';

const About = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  // mobile menu toggle functions 
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };
  
    const closeMobileMenu = () => {
      setMobileMenuOpen(false);
    };
  
    //header on scroll 
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
  
    // Footer animation on scroll 
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
    <div className="about-container">
     {/* Header */}
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

      {/* Body */}
      <main className="main-content">
        {/* top section */}
        <div className="about-top-section">
          <div className="about-top-bg">
            <img src="https://figmage.com/images/kKS3O_7EJOjxAOyuiFS5Q.png" alt="top bg" />
            <h1>About</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          </div>
          <div className="about-top-img">
            <img src="https://figmage.com/images/kqyZf935P1GjyNEoVfrSO.png" alt="" />
          </div>
          <div className="about-top-decor1">
            <img src="https://figmage.com/images/ovb7rHHALxduHkL8j7-ON.png" alt="" />
          </div>
        </div>

        {/* middle section */}
        <div className="atext-container">
          <h2>We make sure each customers blah blah blah</h2>
          <div className="small-text">
            <div className="leftside-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div className="rightside-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
          </div>
        </div>

        {/* video section */}

        <div className="video-info">
          <div className="vid-container">
            <div className="vid">
              <iframe
                width="100%"
                height="350"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="vid-title">
              <p>PowerMed</p>
            </div>
          </div>
          <div className="vid-text">
            <h2>We  blah blah blah blah blah blah blah</h2>
            <div className="dvd-txt">
              <div className="abtDivider"></div>
              <div className="txt-side">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  </p>
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

export default About;
