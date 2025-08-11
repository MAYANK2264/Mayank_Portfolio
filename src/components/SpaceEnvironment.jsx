import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const SpaceEnvironment = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const galaxyRef = useRef();
  const galacticCenterRef = useRef();
  const animationFrameRef = useRef(); // Store animation frame id in ref
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const lastFrameTimeRef = useRef(0); // For frame rate limiting

  // Memoized galaxy parameters to avoid recreating arrays
  const galaxyParameters = useMemo(() => ({
    count: 100000,
    size: 0.01,
    radius: 50,
    branches: 5,
    spin: 1,
    randomness: 0.5,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
  }), []);

  useEffect(() => {
    // Scene setup with fog for depth - darker background to match home
    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0x000000); // Pure black background
    sceneRef.current.fog = new THREE.FogExp2(0x000000, 0.0001);
    
    cameraRef.current = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    
    rendererRef.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current.toneMappingExposure = 0.5;
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create galactic center - removed the purple center object
    const createGalacticCenter = () => {
      // Removed the galactic center for a cleaner look
    };

    // Create galaxy
    const createGalaxy = () => {
      const parameters = galaxyParameters;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for(let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Position
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      // Cleanup old galaxy
      if (galaxyRef.current) {
        geometry.dispose();
        material.dispose();
        sceneRef.current.remove(galaxyRef.current);
      }

      // Create new galaxy
      galaxyRef.current = new THREE.Points(geometry, material);
      sceneRef.current.add(galaxyRef.current);

      // Add ambient stars in background
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(2000 * 3);
      const starColors = new Float32Array(2000 * 3);

      for(let i = 0; i < 2000; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 200 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radius * Math.cos(phi);

        const starColor = new THREE.Color();
        starColor.setHSL(Math.random() * 0.2 + 0.5, 0.8, Math.random() * 0.4 + 0.6);
        starColors[i3] = starColor.r;
        starColors[i3 + 1] = starColor.g;
        starColors[i3 + 2] = starColor.b;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      sceneRef.current.add(stars);
    };

    createGalaxy();
    createGalacticCenter();

    // Camera position
    cameraRef.current.position.set(30, 50, 100);
    cameraRef.current.lookAt(0, 0, 0);

    // Mouse movement handler
    const onMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update target rotation with low sensitivity
      targetRotationRef.current.x = mouseRef.current.y * 0.3;
      targetRotationRef.current.y = mouseRef.current.x * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation with performance safeguards
    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Limit to ~60 FPS maximum (16.67ms per frame)
      if (currentTime - lastFrameTimeRef.current < 16.67) {
        return;
      }
      lastFrameTimeRef.current = currentTime;

      // Smooth rotation interpolation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      if (galaxyRef.current) {
        galaxyRef.current.rotation.x = currentRotationRef.current.x;
        galaxyRef.current.rotation.y += 0.0002 + currentRotationRef.current.y * 0.01;
      }

      // Removed galactic center animations

      // Smooth camera movement
      const time = Date.now() * 0.0001;
      const radius = 120;
      cameraRef.current.position.x = Math.cos(time * 0.3) * radius;
      cameraRef.current.position.z = Math.sin(time * 0.3) * radius;
      cameraRef.current.position.y = 30 + Math.sin(time * 0.5) * 20;
      cameraRef.current.lookAt(0, 0, 0);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Handle resize - update camera aspect and renderer size
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function - cancel animation frame in useEffect cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Cancel animation frame in useEffect cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clean up DOM elements
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [galaxyParameters]); // Include galaxyParameters in dependency array

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default SpaceEnvironment; 