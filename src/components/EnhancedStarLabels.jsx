import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/**
 * EnhancedStarLabels - Star label rendering using existing CSS classes
 * 
 * This component implements the requirements with enhanced styling:
 * • Create an absolutely-positioned HTML div for each star
 * • Update each frame with star.position projected to 2D via camera
 * • Show only when that star is hovered
 * • Use CSS transition for opacity for smooth fade-in/out
 * • Enhanced styling using existing planet-label CSS classes
 */
const EnhancedStarLabels = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const animationIdRef = useRef();
  const starsRef = useRef([]);
  const labelsRef = useRef([]);
  const [hoveredStarId, setHoveredStarId] = useState(null);

  // Sample star data with more interesting names
  const starData = [
    { id: 'star-1', name: 'About Me', position: new THREE.Vector3(-6, 4, 0) },
    { id: 'star-2', name: 'My Skills', position: new THREE.Vector3(0, 5, 0) },
    { id: 'star-3', name: 'Experience', position: new THREE.Vector3(6, 3, 0) },
    { id: 'star-4', name: 'Projects', position: new THREE.Vector3(-4, -2, 0) },
    { id: 'star-5', name: 'Contact', position: new THREE.Vector3(4, -3, 0) },
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

    // Create stars with enhanced visual effects
    const stars = [];
    starData.forEach((data, index) => {
      const starGroup = new THREE.Group();
      starGroup.position.copy(data.position);

      // Create star core
      const starGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(0x915eff),
        emissiveIntensity: 0.4
      });
      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      starGroup.add(starMesh);

      // Add outer glow effect
      const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x915eff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      starGroup.add(glowMesh);
      
      // Store star data
      starGroup.userData = {
        id: data.id,
        name: data.name,
        position: data.position,
        starMesh: starMesh,
        glowMesh: glowMesh,
        originalEmissiveIntensity: 0.4,
        originalGlowOpacity: 0.3
      };
      
      scene.add(starGroup);
      stars.push(starGroup);
    });
    
    starsRef.current = stars;

    // Create absolutely-positioned HTML div for each star using enhanced styling
    const labels = [];
    starData.forEach((data) => {
      const labelDiv = document.createElement('div');
      labelDiv.id = `label-${data.id}`;
      labelDiv.className = 'planet-hover-label planet-label-bg planet-label-animate hidden';
      
      // Create the inner text span with gradient styling
      const textSpan = document.createElement('span');
      textSpan.className = 'planet-label-text font-bold';
      textSpan.textContent = data.name;
      labelDiv.appendChild(textSpan);
      
      // Additional custom styling for smooth transitions
      labelDiv.style.cssText += `
        position: fixed;
        z-index: 1000;
        pointer-events: none;
        font-size: 18px;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        transform-origin: center bottom;
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
    camera.position.z = 12;

    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoveredStar = null;

    // Mouse move handler
    const onPointerMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      
      // Get all star core meshes for raycasting
      const starCores = stars.map(starGroup => starGroup.userData.starMesh);
      const intersects = raycaster.intersectObjects(starCores);

      let newHoveredStar = null;
      if (intersects.length > 0) {
        const intersectedCore = intersects[0].object;
        // Find the parent star group
        newHoveredStar = stars.find(starGroup => starGroup.userData.starMesh === intersectedCore);
      }

      // Handle hover state changes
      if (newHoveredStar !== currentHoveredStar) {
        // End hover on previous star
        if (currentHoveredStar) {
          const prevLabel = labels.find(label => label.userData.starId === currentHoveredStar.userData.id);
          if (prevLabel) {
            prevLabel.classList.remove('visible');
            prevLabel.classList.add('hidden');
          }
          
          // Reset star visual effects
          const starMesh = currentHoveredStar.userData.starMesh;
          const glowMesh = currentHoveredStar.userData.glowMesh;
          if (starMesh && starMesh.material) {
            starMesh.material.emissiveIntensity = currentHoveredStar.userData.originalEmissiveIntensity;
          }
          if (glowMesh && glowMesh.material) {
            glowMesh.material.opacity = currentHoveredStar.userData.originalGlowOpacity;
          }
          
          setHoveredStarId(null);
        }

        // Start hover on new star
        if (newHoveredStar) {
          const newLabel = labels.find(label => label.userData.starId === newHoveredStar.userData.id);
          if (newLabel) {
            newLabel.classList.remove('hidden');
            newLabel.classList.add('visible');
          }
          
          // Enhance star visual effects
          const starMesh = newHoveredStar.userData.starMesh;
          const glowMesh = newHoveredStar.userData.glowMesh;
          if (starMesh && starMesh.material) {
            starMesh.material.emissiveIntensity = 0.8;
          }
          if (glowMesh && glowMesh.material) {
            glowMesh.material.opacity = 0.6;
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

      const time = Date.now() * 0.001;

      // Update star animations
      stars.forEach((starGroup, index) => {
        // Gentle rotation
        starGroup.rotation.y = time * 0.3 + index;
        
        // Gentle pulsing animation when not hovered
        if (currentHoveredStar !== starGroup) {
          const pulse = 0.8 + Math.sin(time * 2 + index) * 0.2;
          const starMesh = starGroup.userData.starMesh;
          if (starMesh && starMesh.material) {
            starMesh.material.emissiveIntensity = starGroup.userData.originalEmissiveIntensity * pulse;
          }
        }
      });

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
        labelDiv.style.top = (y - 20) + 'px'; // Offset above the star
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
      stars.forEach((starGroup) => {
        starGroup.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* UI Info */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg font-mono text-sm max-w-sm">
        <h3 className="font-bold mb-2 text-purple-400">Enhanced Star Labels Demo</h3>
        <div className="space-y-1 text-xs">
          <div>Hovered: <span className="text-yellow-400">{hoveredStarId || 'none'}</span></div>
        </div>
        
        <div className="mt-3 border-t border-gray-600 pt-2 text-xs text-gray-400">
          <div>• Hover over stars to see enhanced labels</div>
          <div>• Uses existing planet-label CSS classes</div>
          <div>• Gradient text and glow animations</div>
          <div>• Smooth CSS transitions</div>
          <div>• Position updated each frame via projection</div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStarLabels;
