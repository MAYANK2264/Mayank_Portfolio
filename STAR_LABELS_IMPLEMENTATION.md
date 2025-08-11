# Star Labels Implementation

This document outlines the implementation of star label rendering using absolutely-positioned HTML divs that are updated each frame with star positions projected to 2D via the camera.

## Task Requirements

✅ **Create an absolutely-positioned HTML div for each star**  
✅ **Update each frame with star.position projected to 2D via camera**  
✅ **Show only when that star is hovered**  
✅ **Use CSS transition for opacity for smooth fade-in/out**  

## Implementation Overview

Two complete implementations have been created to demonstrate different approaches to star label rendering:

### 1. SimpleStarLabels Component

**File:** `src/components/SimpleStarLabels.jsx`

This is the most basic implementation that fulfills all requirements:

**Key Features:**
- Creates absolutely-positioned HTML divs for each star during component initialization
- Uses THREE.Raycaster for hover detection
- Projects 3D star positions to 2D screen coordinates each animation frame
- Shows labels only on hover with smooth CSS transitions
- Basic styling with custom CSS properties

**Implementation Details:**
```javascript
// Create absolutely-positioned HTML div for each star
const labelDiv = document.createElement('div');
labelDiv.style.cssText = `
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #915eff;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 14px;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(145, 94, 255, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

// Update each frame with star.position projected to 2D via camera
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
  labelDiv.style.top = (y - 10) + 'px';
});

// Show only when hovered with CSS transitions
if (newHoveredStar) {
  const newLabel = labels.find(label => label.userData.starId === newHoveredStar.userData.id);
  if (newLabel) {
    newLabel.style.opacity = '1'; // CSS transition handles smooth fade-in
  }
}
```

### 2. EnhancedStarLabels Component

**File:** `src/components/EnhancedStarLabels.jsx`

This implementation uses the same core approach but with enhanced styling using existing CSS classes:

**Key Features:**
- Same core functionality as SimpleStarLabels
- Uses existing `planet-hover-label`, `planet-label-bg`, and `planet-label-text` CSS classes
- Enhanced visual effects with gradient text and glow animations
- Better visual integration with the existing design system

**Enhanced Styling:**
```javascript
// Uses existing CSS classes for enhanced appearance
labelDiv.className = 'planet-hover-label planet-label-bg planet-label-animate hidden';

// Create gradient text span
const textSpan = document.createElement('span');
textSpan.className = 'planet-label-text font-bold';
textSpan.textContent = data.name;
labelDiv.appendChild(textSpan);

// CSS classes provide:
// - Gradient text effects
// - Glow animations
// - Backdrop blur
// - Enhanced transitions
```

## Core Technical Implementation

### 1. 3D to 2D Projection

The key technical aspect is converting 3D star positions to 2D screen coordinates:

```javascript
// Project 3D position to 2D screen coordinates
const vector = starPosition.clone();
vector.project(camera);

// Convert normalized device coordinates (-1 to 1) to screen pixels
const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
```

**How it works:**
1. `vector.project(camera)` transforms the 3D position to normalized device coordinates (-1 to 1)
2. Convert X: `(vector.x * 0.5 + 0.5) * window.innerWidth` maps -1→0, 1→window.innerWidth  
3. Convert Y: `(vector.y * -0.5 + 0.5) * window.innerHeight` maps 1→0, -1→window.innerHeight (flipped for screen coordinates)

### 2. Frame-by-Frame Updates

Labels are updated every animation frame to stay synchronized with star positions:

```javascript
const animate = () => {
  animationIdRef.current = requestAnimationFrame(animate);

  // Update each star label position each frame
  labelsRef.current.forEach((labelDiv) => {
    // ... projection logic ...
    labelDiv.style.left = x + 'px';
    labelDiv.style.top = y + 'px';
  });

  renderer.render(scene, camera);
};
```

### 3. Hover Detection with Raycasting

THREE.Raycaster is used to detect when the mouse hovers over stars:

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const onPointerMove = (event) => {
  // Convert mouse position to normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(stars);
  
  // Handle hover state changes...
};
```

### 4. Smooth CSS Transitions

Labels use CSS transitions for smooth fade-in/out effects:

```css
/* Defined in component styles */
transition: opacity 0.3s ease-in-out;

/* Enhanced version uses existing CSS classes with */
transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
```

## Usage Examples

### Basic Usage

```jsx
import { SimpleStarLabels } from '../components';

function App() {
  return (
    <div className="w-full h-screen">
      <SimpleStarLabels />
    </div>
  );
}
```

### With Enhanced Styling

```jsx
import { EnhancedStarLabels } from '../components';

function App() {
  return (
    <div className="w-full h-screen">
      <EnhancedStarLabels />
    </div>
  );
}
```

### Demo Page

A complete demo page is available at `src/pages/StarLabelsDemo.jsx` that allows switching between implementations.

## Performance Considerations

### Efficient Updates
- Label positions are updated each frame but only when necessary
- DOM manipulation is minimal (only updating `left` and `top` styles)
- CSS transitions handle smooth animations without JavaScript intervention

### Memory Management
- Proper cleanup of DOM elements on component unmount
- THREE.js resource disposal (geometries, materials, renderer)
- Event listener cleanup

### Optimization Opportunities
For production use with many stars, consider:
- Object pooling for labels to avoid DOM creation/destruction
- Culling labels that are off-screen or behind camera
- Using transform3d() instead of left/top for hardware acceleration
- Batching DOM updates using requestAnimationFrame

## CSS Classes Used

### Existing Classes (Enhanced Version)
- `planet-hover-label`: Base positioning and transition styles
- `planet-label-bg`: Background styling with blur and borders
- `planet-label-text`: Gradient text styling with shadow effects
- `planet-label-animate`: Glow animation keyframes

### Custom Classes (Simple Version)
- `star-label`: Basic label styling with custom CSS properties

## File Structure

```
src/
├── components/
│   ├── SimpleStarLabels.jsx      # Basic implementation
│   ├── EnhancedStarLabels.jsx    # Enhanced styling implementation
│   └── index.js                  # Component exports
├── pages/
│   └── StarLabelsDemo.jsx        # Demo page with both implementations
├── test/
│   └── StarLabelsTest.jsx        # Simple test component
└── index.css                     # CSS classes (planet-label-*)
```

## Conclusion

Both implementations successfully fulfill all requirements:

✅ **Absolutely-positioned HTML divs**: Created for each star and positioned using `position: fixed`  
✅ **Frame-by-frame updates**: Star positions projected to 2D coordinates every animation frame  
✅ **Hover-only display**: Labels shown only when stars are hovered using raycaster detection  
✅ **Smooth transitions**: CSS transitions provide smooth fade-in/out effects  

The implementations demonstrate both a minimal approach and an enhanced version that integrates with existing design systems, providing flexibility for different use cases.
