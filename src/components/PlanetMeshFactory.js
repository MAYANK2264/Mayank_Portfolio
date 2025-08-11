import * as THREE from 'three';

/**
 * Simplified Planet Mesh Factory
 * Creates basic planet meshes with fallback colors to prevent rendering issues
 */
export class PlanetMeshFactory {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
    }

    /**
     * Create a simplified planet with fallback materials
     * @param {Object} config - Planet configuration
     * @returns {THREE.Group} Complete planet group
     */
    createPlanet(config) {
        const planetGroup = new THREE.Group();
        planetGroup.name = `planet-${config.name}`;

        // Create main planet sphere with basic material
        const planetMesh = this.createPlanetSphere(config);
        planetGroup.add(planetMesh);

        return planetGroup;
    }

    /**
     * Create the main planet sphere with a basic material and fallback color
     * @param {Object} config - Planet configuration
     * @returns {THREE.Mesh} Planet sphere mesh
     */
    createPlanetSphere(config) {
        const geometry = new THREE.SphereGeometry(config.radius, 32, 16);
        
        // Define fallback colors for each planet type
        const fallbackColors = {
            earth: 0x6B93D6,    // Blue
            mars: 0xCD5C5C,     // Red
            jupiter: 0xD2691E,  // Orange
            saturn: 0xFAD5A5,   // Pale Yellow
            moon: 0xC0C0C0       // Grey
        };

        // Use a Lambert material that responds to lighting
        const material = new THREE.MeshLambertMaterial({
            color: fallbackColors[config.name] || 0x888888 // Default to grey
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = `${config.name}-surface`;

        return mesh;
    }

    /**
     * Update animations (placeholder for future enhancements)
     * @param {number} _time - Current time (unused)
     * @param {THREE.Group} _planetGroup - Planet group to animate (unused)
     */
    updateAnimations(_time, _planetGroup) {
        // No complex animations in this simplified version
    }

    /**
     * Static method to get preset configurations with fallback properties
     */
    static getPresetConfigs() {
        return {
            earth: { name: 'earth', radius: 1.0 },
            mars: { name: 'mars', radius: 0.53 },
            jupiter: { name: 'jupiter', radius: 2.0 },
            saturn: { name: 'saturn', radius: 0.9 },
            moon: { name: 'moon', radius: 0.27 }
        };
    }
}
