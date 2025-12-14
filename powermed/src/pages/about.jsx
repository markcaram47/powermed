import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/home.css';
import logoImage from '../assets/images/logo.png';

const About = () => {
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
        {/* Content will be added step by step */}
        <div className="about-body-section">
          {/* Content placeholder */}
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

export default About;
