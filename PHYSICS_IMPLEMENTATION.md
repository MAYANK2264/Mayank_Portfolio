# Physics Loop Implementation

This document describes the implementation of the simple physics loop for the star positioning system as specified in Step 6.

## Overview

The physics loop has been implemented in the `updateStarPositions` function in `src/utils/starPositioning.js`. It follows these four main steps:

### Step 1: Position Update
```javascript
star.pos.x += star.vel.x * deltaTime;
star.pos.y += star.vel.y * deltaTime;
star.pos.z += star.vel.z * deltaTime;
```
- Updates position using: `pos += vel * delta`
- Uses deltaTime from THREE.Clock for smooth, frame-rate independent motion

### Step 2: Boundary Checking
```javascript
if (Math.abs(star.pos.x) > boundarySize) {
  star.vel.x = -star.vel.x; // Invert velocity component
  star.pos.x = Math.sign(star.pos.x) * boundarySize; // Keep within bounds
}
```
- Checks if `abs(pos.xyz) > 22` (configurable boundary)
- Inverts corresponding velocity component for elastic bounce
- Prevents particles from sticking to boundaries

### Step 3: Collision Detection
```javascript
if (distance < collisionThreshold && distance > 0) {
  // Calculate collision normal
  const nx = dx / distance;
  const ny = dy / distance;
  const nz = dz / distance;
  
  // Elastic collision response with equal masses
  const v1n = star1.vel.x * nx + star1.vel.y * ny + star1.vel.z * nz;
  const v2n = star2.vel.x * nx + star2.vel.y * ny + star2.vel.z * nz;
  
  // Update velocities along collision normal
  star1.vel.x += (v2n - v1n) * nx;
  star1.vel.y += (v2n - v1n) * ny;
  star1.vel.z += (v2n - v1n) * nz;
  
  star2.vel.x += (v1n - v2n) * nx;
  star2.vel.y += (v1n - v2n) * ny;
  star2.vel.z += (v1n - v2n) * nz;
}
```
- Performs pairwise distance checking
- Collision threshold: 1.2 units (configurable)
- Implements elastic collision response
- Assumes equal masses for all particles
- Separates overlapping particles to prevent sticking

### Step 4: Velocity Clamping
```javascript
star.vel.x = Math.max(-maxVelocity, Math.min(maxVelocity, star.vel.x));
star.vel.y = Math.max(-maxVelocity, Math.min(maxVelocity, star.vel.y));
star.vel.z = Math.max(-maxVelocity, Math.min(maxVelocity, star.vel.z));
```
- Clamps velocities to ±0.02 range (configurable)
- Prevents velocity explosion from collision calculations
- Applied to all three velocity components

## Usage

### Basic Usage with createStarSystem
```javascript
import { createStarSystem } from './utils/starPositioning.js';

const starSystem = createStarSystem(scene, {
  starCount: 1000,
  // Physics configuration
  boundarySize: 22,            // Boundary at ±22 units
  collisionThreshold: 1.2,     // Collision distance threshold
  maxPhysicsVelocity: 0.02,    // Maximum velocity (±0.02)
  enableCollisions: true,      // Enable collision detection
  enableBoundaries: true       // Enable boundary bouncing
});

// In animation loop with THREE.Clock
const clock = new THREE.Clock();
function animate() {
  const deltaTime = clock.getDelta();
  starSystem.update(deltaTime);
  // ... render
}
```

### Manual Usage
```javascript
import { updateStarPositions } from './utils/starPositioning.js';

// In animation loop
const deltaTime = clock.getDelta();
updateStarPositions(stars, deltaTime, {
  boundarySize: 22,
  collisionThreshold: 1.2,
  maxVelocity: 0.02,
  enableCollisions: true,
  enableBoundaries: true
});
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `boundarySize` | 22 | Boundary distance for elastic bounce |
| `collisionThreshold` | 1.2 | Distance threshold for collision detection |
| `maxVelocity` | 0.02 | Maximum velocity component (prevents explosion) |
| `enableCollisions` | true | Enable/disable collision detection |
| `enableBoundaries` | true | Enable/disable boundary bouncing |

## Performance Considerations

- Collision detection is O(n²) - reduce particle count for better performance
- Boundary checking is O(n) - very efficient
- Velocity clamping is O(n) - very efficient
- For large particle systems, consider spatial partitioning or reduced collision checks

## Demo Components

1. **PhysicsStarsDemo.jsx** - Full interactive demo with THREE.Clock
2. **physics-test.js** - Unit tests for each physics component
3. **star-positioning-demo.js** - Updated demo with physics enabled

## Testing

Run the physics tests in the browser console:
```javascript
// Import the test file and run
import { runPhysicsTests } from './examples/physics-test.js';
runPhysicsTests();
```

## Implementation Notes

- Uses THREE.Vector3 for position and velocity vectors
- Collision response assumes equal masses (simplified elastic collision)
- Boundary constraints keep particles within simulation bounds
- Delta time scaling ensures smooth motion regardless of frame rate
- Velocity clamping prevents numerical instabilities

The implementation successfully satisfies all requirements from Step 6:
✅ Position updates: `pos += vel * delta`  
✅ Boundary checking: elastic bounce at ±22 units  
✅ Collision detection: pairwise distance < 1.2 units  
✅ Velocity clamping: ±0.02 to prevent explosion  
✅ Equal masses assumption  
✅ THREE.Clock delta for smooth motion
