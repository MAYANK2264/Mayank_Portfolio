import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const StarNavigation = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const shipRef = useRef();
  const targetPositionRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const hyperspaceRef = useRef();
  const [activeLabel, setActiveLabel] = useState('');
  const navigate = useNavigate();

  const navigationStars = [
    { name: 'Skills', position: new THREE.Vector3(-30, 20, -20), route: '/skills' },
    { name: 'Experience', position: new THREE.Vector3(30, 20, -20), route: '/experience' },
    { name: 'Projects', position: new THREE.Vector3(-20, -20, -20), route: '/projects' },
    { name: 'Contact', position: new THREE.Vector3(20, -20, -20), route: '/contact' }
  ];

  useEffect(() => {
    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create hyperspace effect
    const createHyperspace = () => {
      const starCount = 1000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const velocities = new Float32Array(starCount);
      const sizes = new Float32Array(starCount);

      for(let i = 0; i < starCount; i++) {
        const radius = Math.random() * 100 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        velocities[i] = Math.random() * 0.5 + 0.5;
        sizes[i] = Math.random() * 2 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          hyperspace: { value: 0.0 }
        },
        vertexShader: `
          attribute float velocity;
          attribute float size;
          uniform float time;
          uniform float hyperspace;
          varying float vAlpha;
          
          void main() {
            vec3 pos = position;
            float speed = velocity * hyperspace * 2.0;
            float distance = length(pos);
            
            // Calculate streaking effect
            pos = normalize(pos) * (distance + time * 50.0 * speed);
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Size increases as stars come closer
            float sizeFactor = 1.0 + hyperspace * 2.0;
            gl_PointSize = size * sizeFactor * (300.0 / -mvPosition.z);
            
            // Fade based on speed and distance
            vAlpha = smoothstep(0.0, 1.0, hyperspace) * (1.0 - length(pos) / 2000.0);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          
          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      hyperspaceRef.current = new THREE.Points(geometry, material);
      sceneRef.current.add(hyperspaceRef.current);
    };

    // Create stars
    navigationStars.forEach(star => {
      const starGroup = new THREE.Group();

      // Create star glow using particles
      const particleCount = 300;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      const baseColor = new THREE.Color(0x915eff);
      const radius = 4;

      for (let i = 0; i < particleCount; i++) {
        // Create a spherical distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = Math.random() * radius;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        // Color with slight variation
        const colorVariation = 0.2;
        colors[i * 3] = baseColor.r + (Math.random() - 0.5) * colorVariation;
        colors[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation;
        colors[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation;

        sizes[i] = Math.random() * 0.4 + 0.2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pointTexture: { value: new THREE.TextureLoader().load('/star.png') }
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          uniform float time;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float pulse = 1.0 + 0.1 * sin(time * 2.0 + length(position) * 3.0);
            gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying vec3 vColor;
          void main() {
            vec4 texColor = texture2D(pointTexture, gl_PointCoord);
            gl_FragColor = vec4(vColor, texColor.a);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexColors: true
      });

      const particles = new THREE.Points(geometry, material);
      starGroup.add(particles);

      // Add text label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 128;
      context.fillStyle = '#915eff';
      context.font = 'bold 60px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(star.name, 128, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(10, 5, 1);
      sprite.position.y = radius * 2;
      starGroup.add(sprite);

      // Add a core light
      const coreLight = new THREE.PointLight(0x915eff, 2, 15);
      coreLight.position.set(0, 0, 0);
      starGroup.add(coreLight);

      // Add a pulsing core
      const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x915eff,
        transparent: true,
        opacity: 0.8
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      starGroup.add(core);

      starGroup.position.copy(star.position);
      starGroup.userData = { name: star.name, route: star.route };
      sceneRef.current.add(starGroup);
    });

    createHyperspace();

    // Create spaceship
    const shipGroup = new THREE.Group();
    
    // Ship body
    const bodyGeometry = new THREE.ConeGeometry(0.5, 2, 8);
    const bodyMaterial = new THREE.MeshBasicMaterial({
      color: 0x915eff,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    shipGroup.add(body);

    // Ship wings
    const wingGeometry = new THREE.BufferGeometry();
    const wingVertices = new Float32Array([
      -0.5, 0.0, -0.5,
      0.0, 0.0, 0.0,
      0.0, 0.0, -1.0,
      
      0.5, 0.0, -0.5,
      0.0, 0.0, 0.0,
      0.0, 0.0, -1.0
    ]);
    wingGeometry.setAttribute('position', new THREE.BufferAttribute(wingVertices, 3));
    const wingMaterial = new THREE.MeshBasicMaterial({
      color: 0x915eff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    shipGroup.add(wings);

    // Engine glow
    const engineGlow = new THREE.PointLight(0xff3366, 1, 5);
    engineGlow.position.z = -1;
    shipGroup.add(engineGlow);

    shipRef.current = shipGroup;
    shipRef.current.position.set(0, 0, 10);
    sceneRef.current.add(shipRef.current);

    // Camera position
    cameraRef.current.position.z = 50;

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

      let foundStar = false;
      for (const intersect of intersects) {
        const parent = intersect.object.parent;
        if (parent && parent.userData.name) {
          setActiveLabel(parent.userData.name);
          parent.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
          foundStar = true;
          break;
        }
      }
      if (!foundStar) {
        sceneRef.current.children.forEach(child => {
          if (child.userData.name) {
            child.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          }
        });
        setActiveLabel('');
      }
    };

    const onClick = (event) => {
      if (isAnimatingRef.current) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

      for (const intersect of intersects) {
        const parent = intersect.object.parent;
        if (parent && parent.userData.name) {
          targetPositionRef.current = parent.position.clone();
          isAnimatingRef.current = true;
          
          // Start hyperspace effect
          const startTime = performance.now();
          const animationDuration = 2000; // 2 seconds

          const animateHyperspace = () => {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Update hyperspace effect
            if (hyperspaceRef.current?.material.uniforms) {
              hyperspaceRef.current.material.uniforms.hyperspace.value = progress;
            }

            // Zoom camera
            const startZ = 50;
            const endZ = 5;
            cameraRef.current.position.z = startZ + (endZ - startZ) * progress;

            // Continue animation
            if (progress < 1) {
              requestAnimationFrame(animateHyperspace);
            } else {
              // Navigate after hyperspace effect
              navigate(parent.userData.route);
            }
          };

          animateHyperspace();
          break;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Animation
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // Update star animations
      sceneRef.current.children.forEach(child => {
        if (child.userData.name) {
          const time = performance.now() * 0.001;
          child.children.forEach(subChild => {
            if (subChild instanceof THREE.Points && subChild.material.uniforms) {
              subChild.material.uniforms.time.value = time;
              subChild.rotation.y = time * 0.1;
            }
          });

          // Pulse the core
          const core = child.children.find(c => c instanceof THREE.Mesh);
          if (core) {
            const scale = 1 + Math.sin(time * 2) * 0.2;
            core.scale.setScalar(scale);
          }

          // Pulse the text opacity
          const sprite = child.children.find(c => c instanceof THREE.Sprite);
          if (sprite) {
            sprite.material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
          }
        }
      });

      // Update hyperspace effect
      if (hyperspaceRef.current?.material.uniforms) {
        hyperspaceRef.current.material.uniforms.time.value = performance.now() * 0.001;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      containerRef.current?.removeChild(rendererRef.current.domElement);
    };
  }, [navigate]);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10" />
      {activeLabel && (
        <div 
          className="fixed text-white text-2xl font-bold pointer-events-none"
          style={{
            left: '50%',
            bottom: '10%',
            transform: 'translateX(-50%)',
            textShadow: '0 0 10px #915eff'
          }}
        >
          {activeLabel}
        </div>
      )}
    </>
  );
};

export default StarNavigation; 