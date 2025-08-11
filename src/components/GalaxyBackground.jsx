import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createGalaxyBackground, createCompleteSpaceBackground } from '../utils/backgroundHelpers.js';

/**
 * Galaxy Background Component with Star-field Shader
 * Creates a full-screen Three.js canvas with animated galaxy background
 * Features:
 * - Star-field with galaxy spiral pattern
 * - Subtle parallax movement based on mouse position
 * - Animated rotation and glow effects
 * - Optimized performance with proper cleanup
 */
const GalaxyScene = ({ mousePosition }) => {
  const { scene } = useThree();
  const galaxySystemRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (!scene || isInitialized) return;
    
    // Create galaxy background with enhanced star-field
    galaxySystemRef.current = createCompleteSpaceBackground(scene, {
      includeGalaxy: true,
      includeAmbientStars: true,
      includeHyperspace: false, // Disable hyperspace for subtler effect
      includeGalacticCenter: false, // Keep it simple for home background
      galaxyOptions: {
        count: 12000, // Optimized for performance
        size: 0.01,
        radius: 25,
        branches: 4,
        spin: 1.2,
        randomness: 0.3,
        randomnessPower: 2.5,
        insideColor: '#ff6030',
        outsideColor: '#1b3984',
        opacity: 0.7
      },
      ambientStarsOptions: {
        starCount: 600, // Ambient stars for depth
        radius: 80,
        minRadius: 30,
        starSize: 0.04,
        opacity: 0.5
      }
    });
    
    setIsInitialized(true);
    
    return () => {
      if (galaxySystemRef.current) {
        galaxySystemRef.current.dispose();
      }
    };
  }, [scene, isInitialized]);
  
  // Use useFrame for animation loop (React Three Fiber way)
  useFrame((state, deltaTime) => {
    if (!galaxySystemRef.current) return;
    
    // Update galaxy system
    if (galaxySystemRef.current.update) {
      galaxySystemRef.current.update(deltaTime);
    }
    
    // Subtle parallax effect based on mouse position
    if (mousePosition && galaxySystemRef.current.backgroundElements) {
      const { galaxy, ambientStars } = galaxySystemRef.current.backgroundElements;
      
      if (galaxy?.galaxy) {
        const parallaxStrength = 0.0002;
        galaxy.galaxy.rotation.x = mousePosition.y * parallaxStrength;
        galaxy.galaxy.rotation.z = mousePosition.x * parallaxStrength * 0.5;
      }
      
      if (ambientStars?.stars) {
        const parallaxStrength = 0.0001;
        ambientStars.stars.rotation.x = -mousePosition.y * parallaxStrength;
        ambientStars.stars.rotation.z = -mousePosition.x * parallaxStrength;
      }
    }
  });
  
  return null; // We don't need to render anything, the scene is managed by Three.js
};

const GalaxyBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef();
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Cancel previous RAF to avoid excessive updates
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        // Normalize mouse position to [-1, 1] range
        mousePosition.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1
        };
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 25], 
          fov: 60,
          near: 0.1,
          far: 200
        }}
        style={{
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)'
        }}
        gl={{
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio for performance
      >
        <GalaxyScene mousePosition={mousePosition.current} />
        
        {/* Ambient lighting for subtle illumination */}
        <ambientLight intensity={0.1} />
        
        {/* Optional subtle fog for depth */}
        <fog attach="fog" args={['#000000', 50, 150]} />
      </Canvas>
      
      {/* Optional overlay gradient for better text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </div>
  );
};

export default GalaxyBackground;
