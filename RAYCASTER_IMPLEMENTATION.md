# THREE.Raycaster Mouse Interaction Implementation

## Overview

This document outlines the implementation of **Step 7: Mouse interaction: raycasting for hover & click** as specified in the project plan. The implementation provides precise mouse interaction with stars using THREE.Raycaster, enabling hover effects and click navigation.

## Implementation Summary

### Core Requirements Implemented ✅

1. **THREE.Raycaster Creation**: ✅
   - Created `new THREE.Raycaster()` instance for mouse interaction
   - Initialized mouse coordinates with `new THREE.Vector2()`

2. **pointermove Event with intersectObjects(starCores)**: ✅
   - Event handler: `onPointerMove(event)`
   - Raycasting: `raycaster.intersectObjects(starCores)`
   - Targets only star core meshes for precise interaction

3. **Hover Start Effects**: ✅
   - **Enlarge glow sprite scale by 1.5×**: `glowMesh.scale.multiplyScalar(1.5)`
   - **Store hovered id**: `starGroup.userData.hoveredId = hoveredId`
   - **Display floating text label**: HTML div positioned by projector using `vector.project(camera)`

4. **Hover End Effects**: ✅
   - **Revert glow intensity**: Restore original glow scale and opacity
   - **Hide label**: Remove floating HTML label from DOM

5. **Click Navigation**: ✅
   - **pointerdown Event**: `onPointerDown(event)`
   - **Intersection Check**: `raycaster.intersectObjects(starCores)`
   - **Call navigate(route)**: If intersected star exists, execute `navigate(starGroup.userData.route)`

## Key Components

### 1. StarNavigation.jsx (Main Implementation)

**Location**: `src/components/StarNavigation.jsx`

**Key Features**:
- Complete raycaster implementation with hover/click effects
- Floating HTML labels positioned using screen coordinates
- Glow scale animation (1.5× on hover, revert on hover end)
- Navigation routing integration with React Router
- Optimized performance with proper cleanup

### 2. StarRaycastingDemo.jsx (Demonstration)

**Location**: `src/components/StarRaycastingDemo.jsx`

**Key Features**:
- Interactive demonstration of all raycasting functionality
- Real-time logging of hover/click interactions
- Visual feedback showing glow scale changes
- Isolated test environment with 5 demo stars

## Technical Implementation Details

### Raycaster Setup
```javascript
// Create THREE.Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Get starCores array for raycasting - extract core meshes from star groups
const getStarCores = () => {
  return starsRef.current.map(starGroup => starGroup.userData.starMesh).filter(Boolean);
};
```

### Mouse Event Processing
```javascript
// pointermove event handler with raycasting on starCores
const onPointerMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, cameraRef.current);
  
  // intersectObjects(starCores) - get only the core meshes for raycasting
  const starCores = getStarCores();
  const intersects = raycaster.intersectObjects(starCores);
  
  // Process intersections...
};
```

### Hover Effects Implementation

#### Start Hover (1.5× Glow Scale)
```javascript
const startStarHover = (starGroup) => {
  // Store hovered id as required
  const hoveredId = starGroup.userData.name;
  starGroup.userData.hoveredId = hoveredId;
  
  // Enlarge glow sprite scale by 1.5×
  const glowMesh = starGroup.userData.glowMesh;
  if (glowMesh) {
    starGroup.userData.originalGlowScale = glowMesh.scale.clone();
    glowMesh.scale.multiplyScalar(1.5);
    glowMesh.material.opacity = 0.6; // Increase glow intensity
  }
  
  // Display floating text label using HTML div positioned by projector
  floatingLabel = createFloatingLabel(hoveredId, starGroup.position);
};
```

#### End Hover (Revert Effects)
```javascript
const endStarHover = (starGroup) => {
  // Revert glow intensity and scale
  const glowMesh = starGroup.userData.glowMesh;
  if (glowMesh && starGroup.userData.originalGlowScale) {
    glowMesh.scale.copy(starGroup.userData.originalGlowScale);
    glowMesh.material.opacity = 0.2; // Restore original glow intensity
  }
  
  // Hide floating label
  removeFloatingLabel();
};
```

### Click Navigation
```javascript
const onPointerDown = (event) => {
  // ... mouse coordinate setup ...
  
  raycaster.setFromCamera(mouse, cameraRef.current);
  const starCores = getStarCores();
  const intersects = raycaster.intersectObjects(starCores);

  // On pointerdown, if an intersected star exists, call navigate(route)
  if (intersects.length > 0) {
    const intersectedCore = intersects[0].object;
    // Find the parent star group...
    navigate(starGroup.userData.route); // Call navigate(route)
  }
};
```

### Floating Label System

The implementation uses HTML div elements positioned by THREE.js projector for optimal text rendering and performance:

```javascript
const createFloatingLabel = (text, position) => {
  const labelDiv = document.createElement('div');
  // ... styling ...
  
  // Position the label using screen coordinates
  const vector = position.clone();
  vector.project(cameraRef.current);
  
  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
  
  labelDiv.style.left = x + 'px';
  labelDiv.style.top = (y - 40) + 'px';
  
  return labelDiv;
};
```

## Performance Optimizations

1. **Efficient Raycasting**: Only raycast against star cores (`starCores` array), not all scene objects
2. **Event Delegation**: Use pointer events for better touch/mouse compatibility
3. **Proper Cleanup**: Remove event listeners and floating labels on component unmount
4. **Scale Caching**: Store original glow scales to avoid recalculation
5. **Conditional Processing**: Only process hover state changes when different from current state

## Browser Compatibility

- **Events**: Uses `pointermove` and `pointerdown` for unified mouse/touch support
- **THREE.js**: Compatible with THREE.js r150+
- **CSS**: Uses modern CSS with fallbacks for positioning
- **DOM**: Proper cleanup prevents memory leaks

## Testing and Verification

### StarRaycastingDemo Component

The demonstration component provides:
- **Visual Feedback**: Real-time hover state display
- **Interaction Logging**: Console output for all hover/click events
- **Scale Verification**: Visual confirmation of 1.5× glow scaling
- **Route Simulation**: Logs simulated navigation calls

### Manual Testing Steps

1. **Hover Testing**:
   - Move mouse over stars
   - Verify glow enlarges by 1.5×
   - Confirm floating label appears
   - Check label follows mouse movement
   - Verify effects revert on hover end

2. **Click Testing**:
   - Click on star cores
   - Verify navigation is called with correct route
   - Confirm visual feedback (scale pulse)

3. **Performance Testing**:
   - Test with multiple rapid hover changes
   - Verify smooth animations
   - Check for memory leaks over extended use

## Integration with Existing Code

The implementation integrates seamlessly with:
- **React Router**: Uses `useNavigate()` hook for routing
- **StarMeshFactory**: Compatible with existing star creation system
- **Background Effects**: Doesn't interfere with hyperspace animations
- **Responsive Design**: Works across different screen sizes

## Usage Examples

### Basic Implementation
```javascript
import StarNavigation from '../components/StarNavigation';

const HomePage = () => {
  return (
    <div className="relative w-full h-screen">
      <StarNavigation />
    </div>
  );
};
```

### Demo/Testing
```javascript
import { StarRaycastingDemo } from '../components';

const TestPage = () => {
  return <StarRaycastingDemo />;
};
```

## Conclusion

The THREE.Raycaster mouse interaction implementation fully satisfies all specified requirements:

- ✅ **THREE.Raycaster** created and configured for mouse interaction
- ✅ **pointermove** events with `intersectObjects(starCores)` raycasting
- ✅ **Hover start**: Glow scale enlarged by 1.5×, hovered id stored, floating label displayed
- ✅ **Hover end**: Glow reverted, label hidden
- ✅ **Click navigation**: `navigate(route)` called when intersected star exists

The implementation provides smooth, responsive interaction with proper performance optimization and comprehensive error handling.
