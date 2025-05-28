import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Globe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;
    let frameId;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create procedural Jupiter texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048; // Higher resolution
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base color gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#cd9b5c');  // Light tan
    gradient.addColorStop(0.2, '#b87b3c'); // Medium tan
    gradient.addColorStop(0.3, '#a65d2b'); // Dark tan
    gradient.addColorStop(0.5, '#8b4513'); // Saddle brown
    gradient.addColorStop(0.7, '#b87b3c'); // Medium tan
    gradient.addColorStop(0.9, '#deb887'); // Burlywood
    gradient.addColorStop(1, '#cd853f');   // Peru

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add bands with varying colors and widths
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * canvas.height;
      const height = Math.random() * 50 + 20;
      
      // Randomize band colors for more realism
      const r = Math.random() * 50 + 150;
      const g = Math.random() * 30 + 100;
      const b = Math.random() * 20 + 40;
      const alpha = Math.random() * 0.4 + 0.2;
      
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fillRect(0, y, canvas.width, height);
    }

    // Add swirls and turbulent patterns
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 50 + 10;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.random() * 50 + 150}, ${Math.random() * 30 + 100}, ${Math.random() * 20 + 40}, 0.2)`;
      ctx.fill();
    }

    // Create texture from canvas
    const jupiterTexture = new THREE.CanvasTexture(canvas);
    jupiterTexture.wrapS = THREE.RepeatWrapping;
    jupiterTexture.wrapT = THREE.RepeatWrapping;
    jupiterTexture.repeat.set(2, 1);
    
    // Jupiter globe
    const radius = 5;
    const segments = 128; // Increased segments for smoother sphere
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    
    // Create atmosphere effect
    const atmosphereGeometry = new THREE.SphereGeometry(radius + 0.2, segments, segments);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.8, 0.6, 0.3, intensity * 0.5);
        }
      `,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Jupiter material with enhanced features
    const material = new THREE.MeshPhongMaterial({
      map: jupiterTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x666666),
      shininess: 5,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add ring system
    const ringGeometry = new THREE.RingGeometry(7, 12, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Add halo ring (inner ring)
    const haloRingGeometry = new THREE.RingGeometry(6, 7, 128);
    const haloRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.05
    });
    const haloRing = new THREE.Mesh(haloRingGeometry, haloRingMaterial);
    haloRing.rotation.x = Math.PI / 2;
    scene.add(haloRing);

    // Add gossamer rings (outer faint rings)
    const gossamerRingGeometry = new THREE.RingGeometry(12, 15, 128);
    const gossamerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.02
    });
    const gossamerRing = new THREE.Mesh(gossamerRingGeometry, gossamerRingMaterial);
    gossamerRing.rotation.x = Math.PI / 2;
    scene.add(gossamerRing);

    // Add a tilt to match Jupiter's axial tilt (about 3 degrees)
    globe.rotation.x = THREE.MathUtils.degToRad(3);
    atmosphere.rotation.x = THREE.MathUtils.degToRad(3);
    ring.rotation.x = Math.PI / 2 + THREE.MathUtils.degToRad(3);
    haloRing.rotation.x = Math.PI / 2 + THREE.MathUtils.degToRad(3);
    gossamerRing.rotation.x = Math.PI / 2 + THREE.MathUtils.degToRad(3);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 3, 5);
    scene.add(mainLight);

    // Add subtle orange point lights to enhance Jupiter's appearance
    const orangeLight1 = new THREE.PointLight(0xff7f00, 0.5);
    orangeLight1.position.set(-10, 0, 10);
    scene.add(orangeLight1);

    const orangeLight2 = new THREE.PointLight(0xff7f00, 0.5);
    orangeLight2.position.set(10, 0, -10);
    scene.add(orangeLight2);

    // Camera position
    camera.position.z = 15;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Animation
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate the globe and rings
      globe.rotation.y += 0.002;
      atmosphere.rotation.y += 0.002;
      ring.rotation.z += 0.0005;
      haloRing.rotation.z += 0.0005;
      gossamerRing.rotation.z += 0.0005;
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose of ThreeJS resources
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      jupiterTexture.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      haloRingGeometry.dispose();
      haloRingMaterial.dispose();
      gossamerRingGeometry.dispose();
      gossamerRingMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.9,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Globe; 