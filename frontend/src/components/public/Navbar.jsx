import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';

const logoIcon = '/images/logo-icon.png';
const logoDark = '/images/logo-dark.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/packages', label: t('nav.packages') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-100/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoDark}
              alt="Future Finish"
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logoIcon;
              }}
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold tracking-tight">
                <span className="text-gradient-brand">FUTURE</span>
                <span className="text-white/90 ml-1.5">FINISH</span>
              </h1>
              <p className="text-[9px] text-muted-light tracking-[0.25em] uppercase">Premium Finishing</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-brand-400 bg-brand-500/10'
                      : 'text-muted-light hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-500 to-accent-cyan rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 ml-3 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-brand-500/10 border border-white/10 hover:border-brand-500/30 text-muted-light hover:text-brand-400 transition-all duration-300 text-sm"
            >
              <FaGlobe className="text-sm" />
              <span className="font-medium">{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-light hover:text-brand-400 hover:border-brand-500/30 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaTimes className="text-lg" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaBars className="text-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass-strong rounded-2xl p-4 mb-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                              : 'text-muted-light hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                  >
                    <button
                      onClick={toggleLanguage}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-brand-500/10 text-muted-light hover:text-brand-400 transition-all duration-300 mt-2 border border-white/10 text-sm"
                    >
                      <FaGlobe />
                      <span className="font-medium">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
