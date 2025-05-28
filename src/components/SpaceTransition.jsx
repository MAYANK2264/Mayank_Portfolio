import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

const SpaceTransition = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const spaceshipRef = useRef();
  const engineGlowRef = useRef();
  const starsRef = useRef();
  const isTransitioningRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    // Setup scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    rendererRef.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create more detailed spaceship
    const shipGroup = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.ConeGeometry(1, 4, 8);
    const bodyMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x915EFF,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    shipGroup.add(body);

    // Wings
    const wingGeometry = new THREE.BufferGeometry();
    const wingVertices = new Float32Array([
      -1.0, 0.0, -1.0,  // left wing
      0.0, 0.0, 0.0,
      0.0, 0.0, -2.0,
      
      1.0, 0.0, -1.0,   // right wing
      0.0, 0.0, 0.0,
      0.0, 0.0, -2.0
    ]);
    wingGeometry.setAttribute('position', new THREE.BufferAttribute(wingVertices, 3));
    const wingMaterial = new THREE.MeshBasicMaterial({
      color: 0x915EFF,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    shipGroup.add(wings);

    // Engine glow
    const engineGlowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const engineGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3366,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    engineGlowRef.current = new THREE.Mesh(engineGlowGeometry, engineGlowMaterial);
    engineGlowRef.current.position.z = -2;
    shipGroup.add(engineGlowRef.current);

    spaceshipRef.current = shipGroup;
    spaceshipRef.current.position.z = -5;
    sceneRef.current.add(spaceshipRef.current);

    // Create hyperspace tunnel with color variation
    const tunnelGeometry = new THREE.BufferGeometry();
    const tunnelVertices = [];
    const tunnelColors = [];
    const particleCount = 5000;

    const colors = [
      new THREE.Color('#915eff'),  // Your brand color
      new THREE.Color('#ff3366'),  // Warm accent
      new THREE.Color('#4a90e2'),  // Cool accent
      new THREE.Color('#ffd7b3'),  // Warm highlight
      new THREE.Color('#ffffff')   // Added white for star-like effect
    ];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 20 + 5;
      const z = Math.random() * 2000 - 1000;

      tunnelVertices.push(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        z
      );

      const color = colors[Math.floor(Math.random() * colors.length)];
      tunnelColors.push(color.r, color.g, color.b);
    }

    tunnelGeometry.setAttribute('position', new THREE.Float32BufferAttribute(tunnelVertices, 3));
    tunnelGeometry.setAttribute('color', new THREE.Float32BufferAttribute(tunnelColors, 3));

    const tunnelMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    starsRef.current = new THREE.Points(tunnelGeometry, tunnelMaterial);
    sceneRef.current.add(starsRef.current);

    cameraRef.current.position.z = 10;

    return () => {
      containerRef.current?.removeChild(rendererRef.current.domElement);
    };
  }, []);

  useEffect(() => {
    let frame;
    isTransitioningRef.current = true;
    let progress = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      progress = Math.min((currentTime - startTime) / duration, 1);

      // Enhanced hyperspace effect
      if (starsRef.current) {
        const positions = starsRef.current.geometry.attributes.position.array;
        const initialSpeed = 40;
        const acceleration = 120;
        
        for (let i = 0; i < positions.length; i += 3) {
          const speed = initialSpeed + (acceleration * Math.sin(progress * Math.PI));
          
          positions[i + 2] -= speed;
          
          if (positions[i + 2] < -1000) {
            positions[i + 2] = 1000;
            const theta = Math.random() * Math.PI * 2;
            const radius = Math.random() * 20 + 5;
            positions[i] = Math.cos(theta) * radius;
            positions[i + 1] = Math.sin(theta) * radius;
          }

          const spiralAmount = progress * 0.1;
          const x = positions[i];
          const y = positions[i + 1];
          const distance = Math.sqrt(x * x + y * y);
          const angle = Math.atan2(y, x) + (spiralAmount * speed / distance);
          
          positions[i] = distance * Math.cos(angle);
          positions[i + 1] = distance * Math.sin(angle);
        }
        
        starsRef.current.geometry.attributes.position.needsUpdate = true;
        
        starsRef.current.material.opacity = progress < 0.3 ? progress * 3.33 : 
                                          progress > 0.7 ? (1 - progress) * 3.33 : 1;
      }

      // Enhanced camera effects
      if (cameraRef.current) {
        const baseFOV = 75;
        const maxFOVIncrease = 25;
        const fovProgress = Math.sin(progress * Math.PI);
        cameraRef.current.fov = baseFOV + (maxFOVIncrease * fovProgress);
        
        const cameraShake = 0.03 * Math.sin(progress * Math.PI);
        cameraRef.current.position.x = Math.sin(currentTime * 0.001) * cameraShake;
        cameraRef.current.position.y = Math.cos(currentTime * 0.001) * cameraShake;
        
        cameraRef.current.updateProjectionMatrix();
      }

      // Enhanced spaceship movement
      if (spaceshipRef.current) {
        const zOffset = -5 + (progress * 3);
        const yOffset = Math.sin(progress * Math.PI) * 0.3;
        
        spaceshipRef.current.position.z = zOffset;
        spaceshipRef.current.position.y = yOffset;
        
        const bankAngle = Math.sin(progress * Math.PI * 2) * 0.1;
        spaceshipRef.current.rotation.z = bankAngle;
        
        const tiltAngle = -0.1 + (Math.sin(progress * Math.PI) * 0.05);
        spaceshipRef.current.rotation.x = tiltAngle;
      }

      // Enhanced engine glow effect
      if (engineGlowRef.current) {
        const pulseSpeed = 15;
        const pulseIntensity = 0.2;
        const baseOpacity = 0.6;
        const baseScale = 1;
        
        engineGlowRef.current.material.opacity = 
          baseOpacity + (Math.sin(progress * Math.PI * pulseSpeed) * pulseIntensity);
        
        const scale = baseScale + (Math.sin(progress * Math.PI * pulseSpeed) * 0.15);
        engineGlowRef.current.scale.setScalar(scale);
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        isTransitioningRef.current = false;
      }
    };

    animate();

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [location]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000
        ${isTransitioningRef.current ? 'opacity-100' : 'opacity-0'}`}
      style={{ zIndex: 9999 }}
    />
  );
};

export default SpaceTransition; 