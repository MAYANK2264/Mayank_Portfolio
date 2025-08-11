import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleStarNavigation = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  // Page fade-in effect on mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Create simple CSS/HTML stars instead of Three.js
  useEffect(() => {
    const starData = [
      { name: 'About', route: '/about', top: '25%', left: '20%' },
      { name: 'Skills', route: '/skills', top: '20%', left: '80%' },
      { name: 'Experience', route: '/experience', top: '70%', left: '15%' },
      { name: 'Certificates', route: '/certificates', top: '75%', left: '85%' },
      { name: 'Contact', route: '/contact', top: '85%', left: '50%' }
    ];
    setStars(starData);
  }, []);

  const StarComponent = ({ star, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const starRef = useRef();

    useEffect(() => {
      // Add twinkling animation
      const interval = setInterval(() => {
        if (starRef.current) {
          const opacity = 0.7 + Math.random() * 0.3;
          starRef.current.style.opacity = opacity;
        }
      }, 1000 + Math.random() * 2000);

      return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
      setIsTransitioning(true);
      
      // Wait for fade-out animation then navigate
      setTimeout(() => {
        navigate(star.route);
      }, 800); // Match transition duration
    };

    return (
      <div
        ref={starRef}
        className="absolute cursor-pointer transition-all duration-300 transform"
        style={{
          top: star.top,
          left: star.left,
          transform: 'translate(-50%, -50%)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Star shape using CSS */}
        <div
          className={`star-container relative transition-all duration-300 ${
            isHovered ? 'scale-150' : 'scale-100'
          }`}
        >
          {/* Glow effect */}
          <div className="star-glow" />
          
          {/* Main star shape */}
          <div className="star-shape relative" />

          {/* Tooltip */}
          {isHovered && (
            <div
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                         bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg 
                         text-sm font-medium whitespace-nowrap pointer-events-none
                         border border-purple-500/40"
              style={{
                boxShadow: '0 4px 12px rgba(145, 94, 255, 0.3), 0 0 20px rgba(145, 94, 255, 0.2)'
              }}
            >
              {star.name}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Page fade-in wrapper */}
      <div className={`${fadeIn ? 'page-fade-in' : 'opacity-0'}`}>
        {/* Star container */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            {stars.map((star, index) => (
              <StarComponent key={star.name} star={star} index={index} />
            ))}
          </div>
        </div>

        {/* Welcome text - centered */}
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center">
            <h1 className="text-white font-black text-4xl md:text-6xl lg:text-7xl mb-6">
              Welcome to My <span className="text-[#915eff]">Portfolio</span>
            </h1>
            <p className="text-white text-lg md:text-xl">
              Click on a star to explore my journey
            </p>
          </div>
        </div>
      </div>

      {/* Page transition overlay */}
      <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}>
        <div className="transition-content">
          <div>Navigating...</div>
        </div>
      </div>
    </>
  );
};

export default SimpleStarNavigation;
