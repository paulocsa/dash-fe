import React, { useState } from "react";
import {
  FaFlickr,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.headerContainer}>
      {/* Logo - mantém igual em desktop e mobile */}
      <div className={styles.logoContainer}>
        <img 
          src="/sp.svg" 
          alt="Governo de São Paulo" 
          className={styles.logo} 
        />
        <div className={styles.logoText}>
          <strong>SÃO PAULO</strong>
          <span>GOVERNO DO ESTADO</span>
        </div>
      </div>

      {/* Redes sociais (desktop) e hamburger (mobile) */}
      <div className={styles.rightSection}>
        {/* Redes sociais - visível apenas no desktop */}
        <div className={styles.socialContainer}>
          <SocialIcon href="https://www.flickr.com/governosp" icon={<FaFlickr />} />
          <SocialIcon href="https://www.linkedin.com/company/governosp" icon={<FaLinkedinIn />} />
          <SocialIcon href="https://www.tiktok.com/@governosp" icon={<SiTiktok />} />
          <SocialIcon href="https://www.youtube.com/governosp" icon={<FaYoutube />} />
          <SocialIcon href="https://twitter.com/governosp" icon={<FaTwitter />} />
          <SocialIcon href="https://www.instagram.com/governosp" icon={<FaInstagram />} />
          <SocialIcon href="https://www.facebook.com/governosp" icon={<FaFacebookF />} />
          <span className={styles.socialHandle}>/governosp</span>
        </div>

        {/* Botão hamburger - visível apenas no mobile */}
        <button 
          className={styles.hamburgerButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu mobile - aparece quando o hamburger é clicado */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <SocialLink href="https://www.flickr.com/governosp" icon={<FaFlickr />} text="Flickr" />
          <SocialLink href="https://www.linkedin.com/company/governosp" icon={<FaLinkedinIn />} text="LinkedIn" />
          <SocialLink href="https://www.tiktok.com/@governosp" icon={<SiTiktok />} text="TikTok" />
          <SocialLink href="https://www.youtube.com/governosp" icon={<FaYoutube />} text="YouTube" />
          <SocialLink href="https://twitter.com/governosp" icon={<FaTwitter />} text="Twitter" />
          <SocialLink href="https://www.instagram.com/governosp" icon={<FaInstagram />} text="Instagram" />
          <SocialLink href="https://www.facebook.com/governosp" icon={<FaFacebookF />} text="Facebook" />
        </div>
      )}
    </header>
  );
}

// Componente para ícones sociais
function SocialIcon({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
      {icon}
    </a>
  );
}

// Componente para links no menu mobile
function SocialLink({ href, icon, text }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.mobileLink}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}