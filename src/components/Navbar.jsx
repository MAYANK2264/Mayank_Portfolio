import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';


const navLinks = [
  { id: "home", title: "Home", path: "/" },
  { id: "about", title: "About", path: "/about" },
  { id: "experience", title: "Experience", path: "/experience" },
  { id: "projects", title: "Projects", path: "/projects" },
  { id: "skills", title: "Skills", path: "/skills" },
  { id: "certificates", title: "Certificates", path: "/certificates" },
  { id: "contact", title: "Contact", path: "/contact" }
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', !darkMode);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-indigo-500 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
                }`}
              >
                {link.title}
                {location.pathname === link.path && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 transition-all"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 md:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ height: isOpen ? 'auto' : 0 }}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
