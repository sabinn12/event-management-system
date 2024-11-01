import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('');

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scroll position and set active section
  const handleScroll = () => {
    const sections = ['home-section', 'view-events'];
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateToSection = (sectionId: string) => {
    if (router.pathname === '/') {
      handleScrollToSection(sectionId);
    } else {
      router.push('/');
      setTimeout(() => handleScrollToSection(sectionId), 50);
    }
  };

  const isLoginPage = router.pathname === '/login';
  const isHomeActive = !isLoginPage && activeSection === 'home-section';
  const isViewEventsActive = activeSection === 'view-events';

  return (
    <header className={styles.headerWrapper}>
      <nav className={`navbar navbar-expand-lg ${styles.navbarCustom}`}>
        <div className="container">
          {/* Brand Name */}
          <Link href="/" className="navbar-brand">
            <span className={styles.brandName}>Event Management System</span>
          </Link>

          {/* Navbar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Show Home link on all pages, but inactive on the login page */}
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${styles.navLink} ${isHomeActive ? styles.activeLink : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection('home-section');
                  }}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a
                  href="#view-events"
                  className={`nav-link ${styles.navLink} ${isViewEventsActive ? styles.activeLink : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection('view-events');
                  }}
                >
                  View Events
                </a>
              </li>

              <li className="nav-item">
                <Link
                  href="/login"
                  className={`nav-link ${styles.navLink} ${isLoginPage ? styles.activeLink : ''}`}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
