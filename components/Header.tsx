import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();

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
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${styles.navLink} ${
                    router.pathname === '/' ? styles.activeLink : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/events"
                  className={`nav-link ${styles.navLink} ${
                    router.pathname === '/events' ? styles.activeLink : ''
                  }`}
                >
                  View Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/login"
                  className={`nav-link ${styles.navLink} ${
                    router.pathname === '/login' ? styles.activeLink : ''
                  }`}
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
