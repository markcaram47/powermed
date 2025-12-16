import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/home.css';
import '../styles/contact.css';
import logoImage from '../assets/images/logo.png';
import footerLogoImage from '../assets/images/footer_lg.png';
import locIcon from '../assets/images/footer_icons/loc.png';
import mailIcon from '../assets/images/footer_icons/mail.png';
import callIcon from '../assets/images/footer_icons/call.png';
import socialsImage from '../assets/images/footer_icons/socials.png';
import rLocIcon from '../assets/images/contact/r_loc.png';
import rMailIcon from '../assets/images/contact/r_mail.png';
import rCallIcon from '../assets/images/contact/r_call.png';
import rFbIcon from '../assets/images/contact/r_fb.png';
import rIgIcon from '../assets/images/contact/r_ig.png';
import rTiktokIcon from '../assets/images/contact/r_tiktok.png';
import rYtIcon from '../assets/images/contact/r_yt.png';
import rPinIcon from '../assets/images/contact/r_pin.png';

const Contact = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/admin');
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
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
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
        {/* Content will be added step by step */}
        <div className="contact-body-section">
          <div className="contact-banner">
            <h1 className="contact-banner-title">Contact Us</h1>
            <p className="contact-banner-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="contact-form-section">
            <div className="contact-form-left">
              <div className="get-in-touch-content">
                <h2 className="get-in-touch-title">Get In Touch</h2>
                <p className="get-in-touch-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <img src={rLocIcon} alt="Location" className="contact-detail-icon" />
                    <div className="contact-detail-text">
                      <div className="contact-detail-label">HEAD OFFICE</div>
                      <div className="contact-detail-value">11th Avenue Bonifacio Global City, Taguig</div>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <img src={rMailIcon} alt="Email" className="contact-detail-icon" />
                    <div className="contact-detail-text">
                      <div className="contact-detail-label">EMAIL US</div>
                      <div className="contact-detail-value">powermed.ph@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="contact-detail-item">
                    <img src={rCallIcon} alt="Phone" className="contact-detail-icon" />
                    <div className="contact-detail-text">
                      <div className="contact-detail-label">CALL US</div>
                      <div className="contact-detail-value">0917 708 3801</div>
                    </div>
                  </div>
                </div>
                
                <div className="contact-separator"></div>
                
                <div className="social-media-section">
                  <h3 className="social-media-title">FOLLOW OUR SOCIAL MEDIA</h3>
                  <div className="social-media-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                      <img src={rFbIcon} alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                      <img src={rIgIcon} alt="Instagram" className="social-icon" />
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                      <img src={rTiktokIcon} alt="TikTok" className="social-icon" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                      <img src={rYtIcon} alt="YouTube" className="social-icon" />
                    </a>
                    <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                      <img src={rPinIcon} alt="Pinterest" className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-right">
              <div className="contact-form-content">
                <h2 className="contact-form-title">Send Us A Message</h2>
                <form className="contact-form">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-input" 
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      className="form-textarea" 
                      rows="6"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  
                  <div className="form-submit-container">
                    <button type="submit" className="form-submit-btn">SUBMIT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="contact-map-section">
            {/* Google Maps embed will go here */}
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

export default Contact;
