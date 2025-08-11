import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createBackground } from '../utils/backgroundHelpers';

const BasicThreeScene = ({ 
  backgroundColor = 0x000000,
  enableBackground = true,
  backgroundOptions = {},
  cameraPosition = [0, 0, 50],
  fov = 60,
  near = 0.1,
  far = 2000,
  children
}) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const backgroundRef = useRef();
  const animationFrameRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    // Basic Three.js scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      near,
      far
    );
    cameraRef.current.position.set(...cameraPosition);

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current.setClearColor(backgroundColor, 1);
    
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    sceneRef.current.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    sceneRef.current.add(directionalLight);

    // Create background if enabled
    if (enableBackground) {
      try {
        backgroundRef.current = createBackground(sceneRef.current, {
          enableHyperspace: true,
          fogEnabled: true,
          ...backgroundOptions
        });
      } catch (error) {
        console.warn('Failed to create background:', error);
      }
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const deltaTime = clockRef.current.getDelta();
      
      // Update background if it exists
      if (backgroundRef.current && backgroundRef.current.update) {
        backgroundRef.current.update(deltaTime);
      }

      // Render the scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Dispose background
      if (backgroundRef.current && backgroundRef.current.dispose) {
        backgroundRef.current.dispose();
      }
      
      // Cleanup Three.js objects
      if (rendererRef.current && containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [backgroundColor, enableBackground, backgroundOptions, cameraPosition, fov, near, far]);

  // Expose scene, camera, and renderer for child components
  useEffect(() => {
    if (children && typeof children === 'function' && sceneRef.current && cameraRef.current && rendererRef.current) {
      children({
        scene: sceneRef.current,
        camera: cameraRef.current,
        renderer: rendererRef.current
      });
    }
  }, [children]);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default BasicThreeScene;
