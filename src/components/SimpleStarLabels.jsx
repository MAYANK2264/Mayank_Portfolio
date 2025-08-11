import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * SimpleStarLabels - Demonstrates the simplest approach to star label rendering
 * 
 * This component implements the requirements:
 * • Create an absolutely-positioned HTML div for each star
 * • Update each frame with star.position projected to 2D via camera
 * • Show only when that star is hovered
 * • Use CSS transition for opacity for smooth fade-in/out
 */
const SimpleStarLabels = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const animationIdRef = useRef();
  const starsRef = useRef([]);
  const labelsRef = useRef([]);
  const [hoveredStarId, setHoveredStarId] = useState(null);

  // Sample star data
  const starData = [
    { id: 'star-1', name: 'Alpha Centauri', position: new THREE.Vector3(-5, 3, 0) },
    { id: 'star-2', name: 'Sirius', position: new THREE.Vector3(0, 4, 0) },
    { id: 'star-3', name: 'Betelgeuse', position: new THREE.Vector3(5, 2, 0) },
    { id: 'star-4', name: 'Vega', position: new THREE.Vector3(-3, -2, 0) },
    { id: 'star-5', name: 'Rigel', position: new THREE.Vector3(3, -3, 0) },
  ];

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create stars
    const stars = [];
    starData.forEach((data) => {
      // Create star mesh
      const starGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(0x4444ff),
        emissiveIntensity: 0.3
      });
      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      starMesh.position.copy(data.position);
      
      // Store star data
      starMesh.userData = {
        id: data.id,
        name: data.name,
        position: data.position
      };
      
      scene.add(starMesh);
      stars.push(starMesh);
    });
    
    starsRef.current = stars;

    // Create absolutely-positioned HTML div for each star
    const labels = [];
    starData.forEach((data) => {
      const labelDiv = document.createElement('div');
      labelDiv.id = `label-${data.id}`;
      labelDiv.className = 'star-label';
      labelDiv.textContent = data.name;
      labelDiv.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: #ffffff;
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid #915eff;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 14px;
        pointer-events: none;
        z-index: 1000;
        transform: translate(-50%, -100%);
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(145, 94, 255, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      `;
      
      // Store reference to star data
      labelDiv.userData = {
        starId: data.id,
        position: data.position
      };
      
      document.body.appendChild(labelDiv);
      labels.push(labelDiv);
    });
    
    labelsRef.current = labels;

    // Camera position
    camera.position.z = 10;

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoveredStar = null;

    // Mouse move handler
    const onPointerMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stars);

      let newHoveredStar = null;
      if (intersects.length > 0) {
        newHoveredStar = intersects[0].object;
      }

      // Handle hover state changes
      if (newHoveredStar !== currentHoveredStar) {
        // Hide previous label
        if (currentHoveredStar) {
          const prevLabel = labels.find(label => label.userData.starId === currentHoveredStar.userData.id);
          if (prevLabel) {
            prevLabel.style.opacity = '0';
          }
          setHoveredStarId(null);
        }

        // Show new label
        if (newHoveredStar) {
          const newLabel = labels.find(label => label.userData.starId === newHoveredStar.userData.id);
          if (newLabel) {
            newLabel.style.opacity = '1';
          }
          setHoveredStarId(newHoveredStar.userData.id);
        }

        currentHoveredStar = newHoveredStar;
      }
    };

    // Add event listener
    window.addEventListener('pointermove', onPointerMove);

    // Animation loop - update each frame with star.position projected to 2D via camera
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Update each star label position each frame using camera projection
      labelsRef.current.forEach((labelDiv) => {
        const starPosition = labelDiv.userData.position;
        
        // Project 3D position to 2D screen coordinates
        const vector = starPosition.clone();
        vector.project(camera);
        
        // Convert normalized device coordinates to screen pixels
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
        
        // Update absolutely-positioned div coordinates
        labelDiv.style.left = x + 'px';
        labelDiv.style.top = (y - 10) + 'px'; // Offset above the star
      });

      // Optional: gentle rotation for visual interest
      stars.forEach((star, index) => {
        const time = Date.now() * 0.001;
        star.rotation.y = time * 0.5 + index;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Remove all label divs from DOM
      labelsRef.current.forEach((labelDiv) => {
        if (labelDiv.parentNode) {
          labelDiv.parentNode.removeChild(labelDiv);
        }
      });
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      stars.forEach((star) => {
        if (star.geometry) star.geometry.dispose();
        if (star.material) star.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* UI Info */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg font-mono text-sm max-w-sm">
        <h3 className="font-bold mb-2 text-blue-400">Simple Star Labels Demo</h3>
        <div className="space-y-1 text-xs">
          <div>Hovered: <span className="text-yellow-400">{hoveredStarId || 'none'}</span></div>
        </div>
        
        <div className="mt-3 border-t border-gray-600 pt-2 text-xs text-gray-400">
          <div>• Hover over stars to see labels</div>
          <div>• Labels are absolutely-positioned HTML divs</div>
          <div>• Position updated each frame via camera projection</div>
          <div>• CSS transitions for smooth fade-in/out</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStarLabels;
