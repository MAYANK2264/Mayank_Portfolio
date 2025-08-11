import * as THREE from 'three';

/**
 * Creates a hyperspace background effect with animated stars and shaders
 * This creates a reusable background effect for Three.js scenes
 * @param {THREE.Scene} scene - The Three.js scene to add the background to
 * @param {Object} options - Configuration options for the background
 * @returns {Object} - Object containing the background mesh and update function
 */
export const createBackground = (scene, options = {}) => {
  const {
    starCount = 1000,
    radius = 100,
    minRadius = 50,
    enableHyperspace = true,
    fogEnabled = true,
    fogColor = 0x000000,
    fogDensity = 0.0001
  } = options;

  // Add fog to scene for depth if enabled
  if (fogEnabled) {
    scene.fog = new THREE.FogExp2(fogColor, fogDensity);
  }

  // Create hyperspace effect with Points and shaders
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const velocities = new Float32Array(starCount);
  const sizes = new Float32Array(starCount);

  for(let i = 0; i < starCount; i++) {
    const starRadius = Math.random() * radius + minRadius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = starRadius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = starRadius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = starRadius * Math.cos(phi);

    velocities[i] = Math.random() * 0.5 + 0.5;
    sizes[i] = Math.random() * 2 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Hyperspace shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      hyperspace: { value: enableHyperspace ? 1.0 : 0.0 }
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

  const hyperspacePoints = new THREE.Points(geometry, material);
  scene.add(hyperspacePoints);

  // Return object with background mesh and update function
  return {
    hyperspacePoints,
    material,
    update: (deltaTime) => {
      if (material.uniforms) {
        material.uniforms.time.value += deltaTime;
      }
    },
    setHyperspaceIntensity: (intensity) => {
      if (material.uniforms) {
        material.uniforms.hyperspace.value = intensity;
      }
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
      scene.remove(hyperspacePoints);
    }
  };
};

/**
 * Creates an ambient star field background
 * This creates a more subtle star field without the hyperspace effect
 * @param {THREE.Scene} scene - The Three.js scene to add the background to
 * @param {Object} options - Configuration options
 * @returns {Object} - Object containing the stars mesh and update function
 */
export const createAmbientStars = (scene, options = {}) => {
  const {
    starCount = 2000,
    radius = 200,
    minRadius = 50,
    starSize = 0.1,
    opacity = 0.8
  } = options;

  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for(let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const starRadius = Math.random() * radius + minRadius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    starPositions[i3] = starRadius * Math.sin(phi) * Math.cos(theta);
    starPositions[i3 + 1] = starRadius * Math.sin(phi) * Math.sin(theta);
    starPositions[i3 + 2] = starRadius * Math.cos(phi);

    const starColor = new THREE.Color();
    starColor.setHSL(Math.random() * 0.2 + 0.5, 0.8, Math.random() * 0.4 + 0.6);
    starColors[i3] = starColor.r;
    starColors[i3 + 1] = starColor.g;
    starColors[i3 + 2] = starColor.b;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: starSize,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: opacity
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  return {
    stars,
    material: starMaterial,
    update: (deltaTime) => {
      // Optional gentle rotation
      stars.rotation.y += deltaTime * 0.05;
    },
    dispose: () => {
      starGeometry.dispose();
      starMaterial.dispose();
      scene.remove(stars);
    }
  };
};

/**
 * Creates a galaxy background effect
 * Extracted from the SpaceEnvironment component
 * @param {THREE.Scene} scene - The Three.js scene to add the background to
 * @param {Object} options - Configuration options
 * @returns {Object} - Object containing the galaxy mesh and update function
 */
export const createGalaxyBackground = (scene, options = {}) => {
  const {
    count = 100000,
    size = 0.01,
    radius = 50,
    branches = 5,
    spin = 1,
    randomness = 0.5,
    randomnessPower = 3,
    insideColor = '#ff6030',
    outsideColor = '#1b3984',
    opacity = 0.8
  } = options;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorInside = new THREE.Color(insideColor);
  const colorOutside = new THREE.Color(outsideColor);

  for(let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Position
    const particleRadius = Math.random() * radius;
    const spinAngle = particleRadius * spin;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;

    const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * particleRadius;
    const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * particleRadius;
    const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * particleRadius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * particleRadius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * particleRadius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, particleRadius / radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: opacity
  });

  const galaxy = new THREE.Points(geometry, material);
  scene.add(galaxy);

  return {
    galaxy,
    material,
    update: (deltaTime) => {
      // Gentle rotation
      galaxy.rotation.y += deltaTime * 0.0002;
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
      scene.remove(galaxy);
    }
  };
};

/**
 * Creates a galactic center effect with glow
 * Extracted from the SpaceEnvironment component
 * @param {THREE.Scene} scene - The Three.js scene to add the center to
 * @param {Object} options - Configuration options
 * @returns {Object} - Object containing the center group and update function
 */
export const createGalacticCenter = (scene, options = {}) => {
  const {
    coreRadius = 0.5,
    glowRadius = 1,
    color = 0x915eff,
    coreOpacity = 0.3,
    lightIntensity = 0.5,
    lightDistance = 20
  } = options;

  const centerGroup = new THREE.Group();

  // Core sphere
  const coreGeometry = new THREE.SphereGeometry(coreRadius, 32, 32);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: coreOpacity
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  centerGroup.add(core);

  // Outer glow with shader
  const glowGeometry = new THREE.SphereGeometry(glowRadius, 32, 32);
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) }
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

  // Point light
  const light = new THREE.PointLight(color, lightIntensity, lightDistance);
  centerGroup.add(light);

  scene.add(centerGroup);

  return {
    centerGroup,
    core,
    glow,
    light,
    glowMaterial,
    update: (deltaTime) => {
      // Update glow effect
      if (glowMaterial.uniforms) {
        glowMaterial.uniforms.time.value += deltaTime;
      }
      // Gentle rotation
      centerGroup.rotation.y += deltaTime * 0.001;
    },
    dispose: () => {
      coreGeometry.dispose();
      coreMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      scene.remove(centerGroup);
    }
  };
};

/**
 * Creates a complete space background combining multiple effects
 * @param {THREE.Scene} scene - The Three.js scene to add the background to
 * @param {Object} options - Configuration options
 * @returns {Object} - Object containing all background elements and update function
 */
export const createCompleteSpaceBackground = (scene, options = {}) => {
  const {
    includeHyperspace = true,
    includeAmbientStars = true,
    includeGalaxy = false,
    includeGalacticCenter = false,
    hyperspaceOptions = {},
    ambientStarsOptions = {},
    galaxyOptions = {},
    galacticCenterOptions = {}
  } = options;

  const backgroundElements = {};

  if (includeHyperspace) {
    backgroundElements.hyperspace = createBackground(scene, hyperspaceOptions);
  }

  if (includeAmbientStars) {
    backgroundElements.ambientStars = createAmbientStars(scene, ambientStarsOptions);
  }

  if (includeGalaxy) {
    backgroundElements.galaxy = createGalaxyBackground(scene, galaxyOptions);
  }

  if (includeGalacticCenter) {
    backgroundElements.galacticCenter = createGalacticCenter(scene, galacticCenterOptions);
  }

  return {
    backgroundElements,
    update: (deltaTime) => {
      Object.values(backgroundElements).forEach(element => {
        if (element.update) {
          element.update(deltaTime);
        }
      });
    },
    dispose: () => {
      Object.values(backgroundElements).forEach(element => {
        if (element.dispose) {
          element.dispose();
        }
      });
    }
  };
};
