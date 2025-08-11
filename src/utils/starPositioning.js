/**
 * Star positioning and velocity system
 * Assigns gentle random initial positions and velocities for stars
 * Position stars inside a cube of ±20 units around origin
 * Velocity components in range ±0.005
 * Uses an array to keep {pos, vel} so we can update them each frame
 */

import * as THREE from 'three';

/**
 * Creates a star data structure with position and velocity
 * @param {number} starCount - Number of stars to generate
 * @param {Object} options - Configuration options
 * @returns {Array} Array of star objects with {pos, vel} properties
 */
export function createStarArray(starCount = 1000, options = {}) {
  const {
    cubeSize = 20,           // ±20 units around origin
    maxVelocity = 0.005,     // velocity components in range ±0.005
    minVelocity = -0.005
  } = options;

  const stars = [];

  for (let i = 0; i < starCount; i++) {
    // Position inside cube of ±cubeSize units around origin
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 2 * cubeSize,  // Random between -cubeSize and +cubeSize
      (Math.random() - 0.5) * 2 * cubeSize,  // Random between -cubeSize and +cubeSize
      (Math.random() - 0.5) * 2 * cubeSize   // Random between -cubeSize and +cubeSize
    );

    // Gentle velocity components in range ±maxVelocity
    const vel = new THREE.Vector3(
      Math.random() * (maxVelocity - minVelocity) + minVelocity,  // Random between -0.005 and +0.005
      Math.random() * (maxVelocity - minVelocity) + minVelocity,  // Random between -0.005 and +0.005
      Math.random() * (maxVelocity - minVelocity) + minVelocity   // Random between -0.005 and +0.005
    );

    stars.push({
      pos: pos,
      vel: vel,
      id: i
    });
  }

  return stars;
}

/**
 * Updates star positions based on their velocities with physics simulation
 * Includes boundary checking, collision detection, and velocity clamping
 * @param {Array} stars - Array of star objects with {pos, vel} properties
 * @param {number} deltaTime - Time elapsed since last frame
 * @param {Object} options - Physics options
 */
export function updateStarPositions(stars, deltaTime, options = {}) {
  const {
    boundarySize = 22,          // Boundary at ±22 units
    collisionThreshold = 1.2,   // Collision distance threshold
    maxVelocity = 0.02,         // Maximum velocity to prevent explosion
    enableCollisions = true,    // Whether to enable collision detection
    enableBoundaries = true     // Whether to enable boundary bouncing
  } = options;

  // Step 1: Update positions based on velocities
  stars.forEach(star => {
    star.pos.x += star.vel.x * deltaTime;
    star.pos.y += star.vel.y * deltaTime;
    star.pos.z += star.vel.z * deltaTime;
  });

  // Step 2: Boundary checking with elastic bounce
  if (enableBoundaries) {
    stars.forEach(star => {
      // Check X boundary
      if (Math.abs(star.pos.x) > boundarySize) {
        star.vel.x = -star.vel.x; // Invert velocity component
        // Keep position within bounds to prevent sticking
        star.pos.x = Math.sign(star.pos.x) * boundarySize;
      }
      
      // Check Y boundary
      if (Math.abs(star.pos.y) > boundarySize) {
        star.vel.y = -star.vel.y; // Invert velocity component
        star.pos.y = Math.sign(star.pos.y) * boundarySize;
      }
      
      // Check Z boundary
      if (Math.abs(star.pos.z) > boundarySize) {
        star.vel.z = -star.vel.z; // Invert velocity component
        star.pos.z = Math.sign(star.pos.z) * boundarySize;
      }
    });
  }

  // Step 3: Collision detection and response (pairwise)
  if (enableCollisions) {
    for (let i = 0; i < stars.length - 1; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const star1 = stars[i];
        const star2 = stars[j];
        
        // Calculate distance between stars
        const dx = star2.pos.x - star1.pos.x;
        const dy = star2.pos.y - star1.pos.y;
        const dz = star2.pos.z - star1.pos.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // Check if collision occurred
        if (distance < collisionThreshold && distance > 0) {
          // Calculate collision normal (normalized direction vector)
          const nx = dx / distance;
          const ny = dy / distance;
          const nz = dz / distance;
          
          // Elastic collision response: swap velocities along collision normal
          // Since masses are equal, we can use simple velocity exchange
          const v1n = star1.vel.x * nx + star1.vel.y * ny + star1.vel.z * nz;
          const v2n = star2.vel.x * nx + star2.vel.y * ny + star2.vel.z * nz;
          
          // Update velocities along the normal direction
          star1.vel.x += (v2n - v1n) * nx;
          star1.vel.y += (v2n - v1n) * ny;
          star1.vel.z += (v2n - v1n) * nz;
          
          star2.vel.x += (v1n - v2n) * nx;
          star2.vel.y += (v1n - v2n) * ny;
          star2.vel.z += (v1n - v2n) * nz;
          
          // Separate overlapping particles to prevent sticking
          const overlap = collisionThreshold - distance;
          const separationDistance = overlap * 0.5;
          
          star1.pos.x -= nx * separationDistance;
          star1.pos.y -= ny * separationDistance;
          star1.pos.z -= nz * separationDistance;
          
          star2.pos.x += nx * separationDistance;
          star2.pos.y += ny * separationDistance;
          star2.pos.z += nz * separationDistance;
        }
      }
    }
  }

  // Step 4: Clamp velocities to prevent explosion
  stars.forEach(star => {
    star.vel.x = Math.max(-maxVelocity, Math.min(maxVelocity, star.vel.x));
    star.vel.y = Math.max(-maxVelocity, Math.min(maxVelocity, star.vel.y));
    star.vel.z = Math.max(-maxVelocity, Math.min(maxVelocity, star.vel.z));
  });
}

/**
 * Creates a Three.js Points mesh from the star array
 * @param {Array} stars - Array of star objects
 * @param {Object} options - Visual options
 * @returns {THREE.Points} Three.js Points mesh
 */
export function createStarMesh(stars, options = {}) {
  const {
    starSize = 0.1,
    starColor = 0xffffff,
    opacity = 0.8,
    sizeAttenuation = true
  } = options;

  // Create geometry
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(stars.length * 3);

  // Fill position array
  stars.forEach((star, i) => {
    const i3 = i * 3;
    positions[i3] = star.pos.x;
    positions[i3 + 1] = star.pos.y;
    positions[i3 + 2] = star.pos.z;
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create material
  const material = new THREE.PointsMaterial({
    size: starSize,
    color: starColor,
    transparent: true,
    opacity: opacity,
    sizeAttenuation: sizeAttenuation,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  return new THREE.Points(geometry, material);
}

/**
 * Updates the Three.js mesh positions from the star array
 * @param {THREE.Points} mesh - The Three.js Points mesh
 * @param {Array} stars - Array of star objects
 */
export function updateStarMesh(mesh, stars) {
  const positions = mesh.geometry.attributes.position.array;

  stars.forEach((star, i) => {
    const i3 = i * 3;
    positions[i3] = star.pos.x;
    positions[i3 + 1] = star.pos.y;
    positions[i3 + 2] = star.pos.z;
  });

  mesh.geometry.attributes.position.needsUpdate = true;
}

/**
 * Complete star system that handles everything with physics simulation
 * @param {THREE.Scene} scene - Three.js scene to add stars to
 * @param {Object} options - Configuration options
 * @returns {Object} Star system with update method
 */
export function createStarSystem(scene, options = {}) {
  const {
    starCount = 1000,
    cubeSize = 20,
    maxVelocity = 0.005,
    minVelocity = -0.005,
    starSize = 0.1,
    starColor = 0xffffff,
    opacity = 0.8,
    // Physics options
    boundarySize = 22,
    collisionThreshold = 1.2,
    maxPhysicsVelocity = 0.02,
    enableCollisions = true,
    enableBoundaries = true
  } = options;

  // Create star array with positions and velocities
  const stars = createStarArray(starCount, {
    cubeSize,
    maxVelocity,
    minVelocity
  });

  // Create the visual mesh
  const mesh = createStarMesh(stars, {
    starSize,
    starColor,
    opacity
  });

  // Add to scene
  scene.add(mesh);

  return {
    stars,
    mesh,
    update: (deltaTime) => {
      // Update star positions with full physics simulation
      updateStarPositions(stars, deltaTime, {
        boundarySize,
        collisionThreshold,
        maxVelocity: maxPhysicsVelocity,
        enableCollisions,
        enableBoundaries
      });
      
      // Update the visual mesh
      updateStarMesh(mesh, stars);
    },
    dispose: () => {
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (mesh.material) {
        mesh.material.dispose();
      }
      scene.remove(mesh);
    },
    getStars: () => stars,
    getMesh: () => mesh
  };
}

/**
 * Example usage of the star positioning system
 */
export function exampleUsage() {
  // Create scene (you would have this already in your app)
  const scene = new THREE.Scene();
  
  // Create star system
  const starSystem = createStarSystem(scene, {
    starCount: 2000,     // Number of stars
    cubeSize: 20,        // ±20 units around origin  
    maxVelocity: 0.005,  // Max velocity component
    minVelocity: -0.005, // Min velocity component
    starSize: 0.05,      // Visual size
    starColor: 0xffffff, // White stars
    opacity: 0.9
  });

  // In your animation loop, call:
  // starSystem.update(deltaTime);
  
  // Access individual star data:
  // const stars = starSystem.getStars();
  // console.log('First star position:', stars[0].pos);
  // console.log('First star velocity:', stars[0].vel);

  return starSystem;
}
