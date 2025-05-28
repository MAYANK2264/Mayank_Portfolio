import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpaceEnvironment = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const galaxyRef = useRef();
  const galacticCenterRef = useRef();
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Scene setup with fog for depth
    sceneRef.current = new THREE.Scene();
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

    // Create galactic center
    const createGalacticCenter = () => {
      const centerGroup = new THREE.Group();

      // Core sphere - reduced size and opacity
      const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x915eff,
        transparent: true,
        opacity: 0.3
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      centerGroup.add(core);

      // Outer glow - more subtle
      const glowGeometry = new THREE.SphereGeometry(1, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x915eff) }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.3 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            intensity = intensity * (1.0 + 0.1 * sin(time * 2.0));
            gl_FragColor = vec4(color, intensity * 0.3);
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      centerGroup.add(glow);

      // Point light - reduced intensity
      const light = new THREE.PointLight(0x915eff, 0.5, 20);
      centerGroup.add(light);

      galacticCenterRef.current = centerGroup;
      sceneRef.current.add(centerGroup);
    };

    // Create galaxy
    const createGalaxy = () => {
      const parameters = {
        count: 100000,
        size: 0.01,
        radius: 50,
        branches: 5,
        spin: 1,
        randomness: 0.5,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984'
      };

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

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Smooth rotation interpolation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      if (galaxyRef.current) {
        galaxyRef.current.rotation.x = currentRotationRef.current.x;
        galaxyRef.current.rotation.y += 0.0002 + currentRotationRef.current.y * 0.01;
      }

      if (galacticCenterRef.current) {
        galacticCenterRef.current.rotation.x = currentRotationRef.current.x * 0.5;
        galacticCenterRef.current.rotation.y += 0.001 + currentRotationRef.current.y * 0.005;
        
        // Update glow effect
        const glowMesh = galacticCenterRef.current.children[1];
        if (glowMesh.material.uniforms) {
          glowMesh.material.uniforms.time.value = performance.now() * 0.001;
        }
      }

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

    // Handle resize
    const handleResize = () => {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      containerRef.current?.removeChild(rendererRef.current.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default SpaceEnvironment; 