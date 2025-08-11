import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/**
 * Utility function to generate evenly spaced positions in a circle around camera
 * This ensures optimal usability by:
 * - Placing stars at consistent z = -5 distance (always in view frustum)
 * - Even angular distribution for easy clicking
 * - Sufficient separation to prevent accidental clicks
 * - Maintaining visual balance in the scene
 */
const generateStarPositions = (starCount, radius = 10, z = -5) => {
  const positions = [];
  const angleStep = (2 * Math.PI) / starCount;
  
  for (let i = 0; i < starCount; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    positions.push([x, y, z]);
  }
  
  return positions;
};

// NavigationStar component - Fixed position stars with hover tooltips for navigation
const NavigationStar = ({ basePosition, route, label }) => {
  const navigate = useNavigate();
  const starRef = useRef();
  const glowRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  // Only subtle pulsing animation, no orbital motion
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Gentle pulsing glow effect
    if (starRef.current && glowRef.current) {
      const pulseIntensity = 1.0 + Math.sin(time * 1.5) * 0.2;
      starRef.current.material.emissiveIntensity = pulseIntensity;
      glowRef.current.material.emissiveIntensity = pulseIntensity * 0.6;
    }
  });
  
  const handlePointerOver = () => {
    setIsHovered(true);
    if (starRef.current) {
      starRef.current.scale.setScalar(1.8);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(2.2);
      glowRef.current.material.emissiveIntensity = 1.0;
    }
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setIsHovered(false);
    if (starRef.current) {
      starRef.current.scale.setScalar(1);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1);
      glowRef.current.material.emissiveIntensity = 0.5;
    }
    document.body.style.cursor = 'default';
  };
  
  const handleClick = () => {
    navigate(route);
  };
  
  return (
    <group position={basePosition}>
      {/* Main star mesh - larger and brighter for better visibility */}
      <mesh
        ref={starRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#915eff"
          emissiveIntensity={1.2}
          transparent
          opacity={1.0}
        />
      </mesh>
      
      {/* Outer glow effect - larger for better visibility */}
      <mesh
        ref={glowRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial 
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={0.7}
          transparent
          opacity={0.6}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Tooltip on hover */}
      {isHovered && (
        <Html
          position={[0, 1.5, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-purple-500/30 text-sm font-medium shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

// Individual Star component (kept for backward compatibility)
const Star = ({ position, route, label }) => {
  const navigate = useNavigate();
  const starRef = useRef();
  const glowRef = useRef();
  
  const handlePointerOver = () => {
    if (starRef.current) {
      starRef.current.scale.setScalar(1.5);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.8);
      glowRef.current.material.emissiveIntensity = 0.8;
    }
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    if (starRef.current) {
      starRef.current.scale.setScalar(1);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1);
      glowRef.current.material.emissiveIntensity = 0.4;
    }
    document.body.style.cursor = 'default';
  };
  
  const handleClick = () => {
    navigate(route);
  };
  
  return (
    <group position={position}>
      {/* Main star mesh */}
      <mesh
        ref={starRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#4444ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow effect mesh */}
      <mesh
        ref={glowRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[1.4, 16, 16]} />
        <meshBasicMaterial 
          color="#6666ff"
          emissive="#6666ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Text label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor="#915eff"
      >
        {label}
      </Text>
    </group>
  );
};

// Main StarNavigation component
const StarNavigation = () => {
  const routes = [
    { name: 'About', route: '/about' },
    { name: 'Skills', route: '/skills' },
    { name: 'Experience', route: '/experience' },
    { name: 'Projects', route: '/projects' },
    { name: 'Certificates', route: '/certificates' },
    { name: 'Contact', route: '/contact' }
  ];

  // Generate optimized star positions - circle around camera at z = -3
  // with sufficient separation for easy clicking and always in view frustum
  // Closer to camera for better visibility
  const starPositions = generateStarPositions(routes.length, 6, -3);
  
  // Combine routes with generated positions
  const starsWithPositions = routes.map((route, index) => ({
    ...route,
    position: starPositions[index]
  }));

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 15], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          
          {/* Background stars */}
          <mesh>
            <sphereGeometry args={[100, 64, 64]} />
            <meshBasicMaterial 
              color="#000011" 
              side={THREE.BackSide}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Fixed navigation stars with hover tooltips */}
          {starsWithPositions.map((starData) => (
            <NavigationStar
              key={starData.name}
              basePosition={starData.position}
              route={starData.route}
              label={starData.name}
            />
          ))}
          
          {/* No camera controls - stars are fixed in position */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarNavigation; 