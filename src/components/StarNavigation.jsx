import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  OrbitControls 
} from '@react-three/drei';
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

// AnimatedStar component with subtle orbital animation
const AnimatedStar = ({ basePosition, route, label, orbitRadius = 0.5, orbitSpeed = 0.3 }) => {
  const navigate = useNavigate();
  const starRef = useRef();
  const glowRef = useRef();
  const groupRef = useRef();
  
  // Add subtle orbital animation using useFrame
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      // Subtle orbital motion around the base position
      const offsetX = Math.cos(time * orbitSpeed) * orbitRadius;
      const offsetY = Math.sin(time * orbitSpeed * 0.7) * orbitRadius * 0.5; // Different frequency for Y
      const offsetZ = Math.sin(time * orbitSpeed * 0.5) * orbitRadius * 0.3; // Even subtler Z motion
      
      groupRef.current.position.set(
        basePosition[0] + offsetX,
        basePosition[1] + offsetY,
        basePosition[2] + offsetZ
      );
    }
  });
  
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
    <group ref={groupRef} position={basePosition}>
      {/* Main star mesh */}
      <mesh
        ref={starRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereBufferGeometry args={[0.8, 16, 16]} />
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
        <sphereBufferGeometry args={[1.4, 16, 16]} />
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
        <sphereBufferGeometry args={[0.8, 16, 16]} />
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
        <sphereBufferGeometry args={[1.4, 16, 16]} />
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

  // Generate optimized star positions - circle around camera at z = -5
  // with sufficient separation for easy clicking and always in view frustum
  const starPositions = generateStarPositions(routes.length, 8, -5);
  
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
            <sphereBufferGeometry args={[100, 64, 64]} />
            <meshBasicMaterial 
              color="#000011" 
              side={THREE.BackSide}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Navigation stars with optimized positioning and subtle animation */}
          {starsWithPositions.map((starData) => (
            <AnimatedStar
              key={starData.name}
              basePosition={starData.position}
              route={starData.route}
              label={starData.name}
              orbitRadius={0.3}  // Subtle orbital motion radius
              orbitSpeed={0.2}   // Slow orbital speed
            />
          ))}
          
          {/* Post-processing effects removed to avoid dependency conflicts */}
          
          {/* Camera controls for development - can be removed in production */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarNavigation; 