import * as THREE from 'three';

/**
 * Factory class for generating six star meshes for navigation items
 * Each star consists of:
 * - THREE.SphereGeometry(0.6, 16, 16) core
 * - THREE.MeshBasicMaterial({ color: 0xffffff }) for the core
 * - THREE.Sprite with glow effect wrapping each star
 */
class StarMeshFactory {
  constructor() {
    this.navigationItems = [
      { label: 'About', route: '/about', position: new THREE.Vector3(-40, 25, -20) },
      { label: 'Skills', route: '/skills', position: new THREE.Vector3(-20, 20, -20) },
      { label: 'Experience', route: '/experience', position: new THREE.Vector3(20, 20, -20) },
      { label: 'Projects', route: '/projects', position: new THREE.Vector3(40, 25, -20) },
      { label: 'Certificates', route: '/certificates', position: new THREE.Vector3(-25, -25, -20) },
      { label: 'Contact', route: '/contact', position: new THREE.Vector3(25, -25, -20) }
    ];
  }

  /**
   * Creates a radial gradient texture for the glow effect
   * @returns {THREE.CanvasTexture} Radial gradient texture
   */
  createGlowTexture() {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    
    // Create radial gradient from center to edge
    const gradient = context.createRadialGradient(
      size / 2, size / 2, 0,           // Inner circle (center)
      size / 2, size / 2, size / 2     // Outer circle (edge)
    );
    
    // Add color stops for soft glow effect
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');    // Bright white center
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');  // Soft white
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');  // Fading white
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');  // Very soft edge
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');      // Transparent edge
    
    // Fill canvas with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    
    // Create and return texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    return texture;
  }

  /**
   * Creates a single star mesh with glow effect
   * @param {Object} navItem - Navigation item data
   * @returns {Object} Star data with mesh, position, velocity, etc.
   */
  createStarMesh(navItem) {
    // Create the core star geometry and material
    const geometry = new THREE.SphereGeometry(0.6, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starMesh = new THREE.Mesh(geometry, material);
    
    // Create glow texture
    const glowTexture = this.createGlowTexture();
    
    // Create glow sprite material with additive blending and transparency
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Create glow sprite
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.setScalar(3.0); // Make glow larger than the star core
    
    // Create a group to hold both the star core and glow
    const starGroup = new THREE.Group();
    starGroup.add(starMesh);      // Add core mesh
    starGroup.add(glowSprite);    // Add glow sprite
    
    // Set position
    starGroup.position.copy(navItem.position);
    
    // Generate random velocity for potential animation
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,  // Small random X velocity
      (Math.random() - 0.5) * 0.02,  // Small random Y velocity
      (Math.random() - 0.5) * 0.02   // Small random Z velocity
    );
    
    // Return complete star data object
    return {
      label: navItem.label,
      route: navItem.route,
      position: navItem.position.clone(),
      velocity: velocity,
      mesh: starGroup,           // Reference to the complete star group
      core: starMesh,           // Reference to the core mesh
      glow: glowSprite,         // Reference to the glow sprite
      userData: {
        type: 'star',
        navItem: navItem.label,
        route: navItem.route,
        originalPosition: navItem.position.clone(),
        isHovered: false
      }
    };
  }

  /**
   * Creates all six star meshes for navigation
   * @returns {Array} Array of star data objects
   */
  createAllStars() {
    const stars = [];
    
    this.navigationItems.forEach(navItem => {
      const star = this.createStarMesh(navItem);
      
      // Store additional data in the mesh userData for interaction
      star.mesh.userData = {
        ...star.userData,
        starData: star  // Reference back to the complete star data
      };
      
      stars.push(star);
    });
    
    return stars;
  }

  /**
   * Updates star animations (can be called in animation loop)
   * @param {Array} stars - Array of star data objects
   * @param {number} deltaTime - Time since last frame
   * @param {number} elapsedTime - Total elapsed time
   */
  updateStars(stars, deltaTime, elapsedTime) {
    stars.forEach((star, index) => {
      // Gentle floating animation
      const floatOffset = Math.sin(elapsedTime * 0.5 + index) * 0.5;
      star.mesh.position.y = star.position.y + floatOffset;
      
      // Gentle rotation
      star.core.rotation.y += deltaTime * 0.5;
      star.core.rotation.x += deltaTime * 0.2;
      
      // Pulsing glow effect
      const pulseIntensity = 0.6 + Math.sin(elapsedTime * 2 + index) * 0.2;
      star.glow.material.opacity = pulseIntensity;
      
      // Slight glow scale variation
      const glowScale = 3.0 + Math.sin(elapsedTime * 1.5 + index * 0.5) * 0.3;
      star.glow.scale.setScalar(glowScale);
    });
  }

  /**
   * Adds hover effects to a star
   * @param {Object} star - Star data object
   */
  startHover(star) {
    if (star.userData.isHovered) return;
    
    star.userData.isHovered = true;
    
    // Scale up the star
    star.mesh.scale.setScalar(1.3);
    
    // Increase glow intensity
    star.glow.material.opacity = Math.min(star.glow.material.opacity * 1.5, 1.0);
    star.glow.scale.setScalar(4.0);
    
    // Add slight emission to core
    star.core.material.emissive.setHex(0x222222);
  }

  /**
   * Removes hover effects from a star
   * @param {Object} star - Star data object
   */
  endHover(star) {
    if (!star.userData.isHovered) return;
    
    star.userData.isHovered = false;
    
    // Reset scale
    star.mesh.scale.setScalar(1.0);
    
    // Reset glow
    star.glow.material.opacity = 0.6;
    star.glow.scale.setScalar(3.0);
    
    // Remove emission
    star.core.material.emissive.setHex(0x000000);
  }

  /**
   * Creates a fallback sprite material using SpriteCanvasMaterial approach
   * @returns {THREE.SpriteMaterial} Fallback sprite material
   */
  createFallbackGlowMaterial() {
    const canvas = document.createElement('canvas');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    
    // Simple circular glow using canvas API
    const gradient = context.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
  }
}

export default StarMeshFactory;
