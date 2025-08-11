import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// Star component with enhanced visuals and animations
const NavigationStar = ({ position, route, label, index }) => {
  const navigate = useNavigate();
  const starRef = useRef();
  const outerGlowRef = useRef();
  const innerGlowRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  // Animated twinkling and floating motion
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (starRef.current) {
      // Unique floating pattern for each star
      const floatOffset = index * 0.5;
      const floatY = Math.sin(time * 0.8 + floatOffset) * 0.3;
      const floatX = Math.cos(time * 0.6 + floatOffset) * 0.2;
      
      starRef.current.position.x = position[0] + floatX;
      starRef.current.position.y = position[1] + floatY;
      
      // Twinkling effect
      const twinkle = 0.8 + Math.sin(time * 3 + index) * 0.3;
      starRef.current.material.emissiveIntensity = twinkle;
    }
    
    if (outerGlowRef.current) {
      const glowPulse = 0.4 + Math.sin(time * 2 + index * 0.7) * 0.2;
      outerGlowRef.current.material.emissiveIntensity = glowPulse;
    }
  });
  
  const handlePointerOver = () => {
    setIsHovered(true);
    if (starRef.current) {
      starRef.current.scale.setScalar(1.5);
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(2.5);
    }
    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(1.8);
    }
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setIsHovered(false);
    if (starRef.current) {
      starRef.current.scale.setScalar(1);
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(1);
    }
    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(1);
    }
    document.body.style.cursor = 'default';
  };
  
  const handleClick = () => {
    navigate(route);
  };
  
  return (
    <group>
      {/* Outer glow - large ethereal glow */}
      <mesh
        ref={outerGlowRef}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[8.0, 16, 16]} />
        <meshBasicMaterial 
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={1.2}
          transparent={true}
          opacity={0.4}
          side={THREE.BackSide}
          map={null}
        />
      </mesh>
      
      {/* Middle glow - medium purple glow */}
      <mesh
        ref={innerGlowRef}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[5.5, 16, 16]} />
        <meshBasicMaterial 
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={1.5}
          transparent={true}
          opacity={0.6}
          side={THREE.BackSide}
          map={null}
        />
      </mesh>
      
      {/* Inner bright glow */}
      <mesh
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[3.5, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.0}
          transparent={true}
          opacity={0.8}
          side={THREE.BackSide}
          map={null}
        />
      </mesh>
      
      {/* Main star - bright white core - much bigger */}
      <mesh
        ref={starRef}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3.0}
          transparent={true}
          opacity={1.0}
          map={null}
        />
      </mesh>
      
      {/* Star spikes/rays effect - much bigger and more visible */}
      <mesh
        position={position}
        rotation={[0, 0, Math.PI / 4]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[6.5, 0.3]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.5}
          transparent={true}
          opacity={1.0}
          map={null}
        />
      </mesh>
      
      <mesh
        position={position}
        rotation={[0, 0, -Math.PI / 4]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[6.5, 0.3]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.5}
          transparent={true}
          opacity={1.0}
          map={null}
        />
      </mesh>
      
      {/* Additional horizontal ray */}
      <mesh
        position={position}
        rotation={[0, 0, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[5.5, 0.25]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.0}
          transparent={true}
          opacity={0.9}
          map={null}
        />
      </mesh>
      
      {/* Additional vertical ray */}
      <mesh
        position={position}
        rotation={[0, 0, Math.PI / 2]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[5.5, 0.25]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.0}
          transparent={true}
          opacity={0.9}
          map={null}
        />
      </mesh>
      
      {/* Hover tooltip */}
      {isHovered && (
        <Html
          position={[position[0], position[1] + 2, position[2]]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'scale(0.8)'
          }}
        >
          <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-purple-500/40 text-base font-medium shadow-lg" style={{
            boxShadow: '0 4px 12px rgba(145, 94, 255, 0.3), 0 0 20px rgba(145, 94, 255, 0.2)'
          }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

// Background stars for ambience
const BackgroundStars = () => {
  const starsRef = useRef();
  const starCount = 200;
  
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount * 3; i += 3) {
    // Random positions in a large sphere
    positions[i] = (Math.random() - 0.5) * 200;
    positions[i + 1] = (Math.random() - 0.5) * 200;
    positions[i + 2] = (Math.random() - 0.5) * 200;
    
    // Vary star colors (white to light blue)
    const intensity = 0.7 + Math.random() * 0.3;
    colors[i] = intensity;
    colors[i + 1] = intensity;
    colors[i + 2] = Math.min(1, intensity + Math.random() * 0.3);
  }
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        map={null}
      />
    </points>
  );
};

const InteractiveStarNav = () => {
  const navigate = useNavigate();
  
  const navigationItems = [
    { name: 'About', route: '/about' },
    { name: 'Skills', route: '/skills' },
    { name: 'Experience', route: '/experience' },
    { name: 'Certificates', route: '/certificates' },
    { name: 'Contact', route: '/contact' }
  ];
  
  // Position stars around the welcome text - much closer to camera
  const getStarPositions = () => {
    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? 0.7 : 1;
    
    return [
      [(-8 * scale), (3 * scale), 5],    // About - top left
      [(8 * scale), (2 * scale), 5],      // Skills - top right  
      [(-6 * scale), (-3 * scale), 5],   // Experience - bottom left
      [(7 * scale), (-4 * scale), 5],     // Certificates - bottom right
      [0, (-7 * scale), 5]               // Contact - bottom center
    ];
  };
  
  const starPositions = getStarPositions();
  
  return (
    <div className="fixed inset-0" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ 
          position: [0, 0, 10], 
          fov: 75,
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
          {/* Ambient lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={9.5} color="#87CEEB" />
          <pointLight position={[-10, -10, 5]} intensity={0.3} color="#4A90E2" />
          
          {/* Background stars */}
          <BackgroundStars />
          
          {/* Navigation stars */}
          {navigationItems.map((item, index) => (
            <NavigationStar
              key={item.name}
              position={starPositions[index]}
              route={item.route}
              label={item.name}
              index={index}
            />
          ))}
        </Suspense>
      </Canvas>
      
      {/* Welcome text overlay - centered in middle of page */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="text-center">
          <div className="text-white font-black text-4xl md:text-6xl lg:text-7xl mb-6">
            Welcome to My <span className="text-[#915eff]">Portfolio</span>
          </div>
          <div className="text-white text-lg md:text-xl">
            Click on a star to explore my journey
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStarNav;
