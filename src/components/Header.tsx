import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/story', label: 'Our Story' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/travel-prep', label: 'Travel Prep' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={clsx(styles.header, { [styles.scrolled]: isScrolled })}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>Ikhaya KaMa</span>
          <span className={styles.logoSubtext}>Vacations</span>
        </Link>

        <nav className={clsx(styles.nav, { [styles.navOpen]: isMenuOpen })}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={clsx(styles.navLink, {
                    [styles.navLinkActive]: location.pathname === item.path
                  })}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to="/planner" className={styles.plannerButton}>
            Plan Your Trip
          </Link>
          <button
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className={clsx(styles.hamburger, { [styles.hamburgerOpen]: isMenuOpen })}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
