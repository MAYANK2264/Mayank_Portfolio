## 7. Routing & Navigation

### 7.1 Router Configuration
```javascript
// Hash routing for GitHub Pages compatibility
import { HashRouter, Routes, Route } from 'react-router-dom';

<HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/certificates" element={<Certificates />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</HashRouter>
```

### 7.2 Navigation Patterns
- **Hash Routing**: Required for GitHub Pages deployment
- **Programmatic Navigation**: useNavigate hook for dynamic routing
- **Conditional Rendering**: Different backgrounds for home vs. other pages
- **State Persistence**: Maintains user position during navigation

### 7.3 URL Structure
```
/                    # Home page with 3D navigation
/#/about            # About page
/#/projects         # Projects showcase
/#/skills           # Skills and expertise
/#/experience       # Work experience
/#/certificates     # Certifications
/#/contact          # Contact information
```

### 7.4 Navigation State Management
```javascript
// Example: Navigation state management
const useNavigationState = () => {
  const [currentPage, setCurrentPage] = useState('/');
  const [navigationHistory, setNavigationHistory] = useState([]);
  
  const navigateTo = (path) => {
    setNavigationHistory(prev => [...prev, currentPage]);
    setCurrentPage(path);
  };
  
  return { currentPage, navigationHistory, navigateTo };
};
```

---

## 8. Styling & UI/UX

### 8.1 Tailwind CSS Implementation
Utility-first CSS framework for rapid development:

```javascript
// Example: Responsive design with Tailwind
<div className="
  w-full 
  px-4 sm:px-6 lg:px-8 
  py-8 sm:py-12 lg:py-16
  bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900
  text-white
">
  {/* Content */}
</div>
```

### 8.2 Design System
- **Color Palette**: 
  - Primary: #915eff (Purple)
  - Secondary: #4444ff (Blue)
  - Background: #0f0f23 to #16213e (Dark gradient)
  - Text: #ffffff (White)
- **Typography**: 
  - Headings: Bold, large fonts
  - Body: Readable, medium weight
  - Accents: Gradient text effects
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle depth with backdrop blur

### 8.3 Responsive Design
- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox for responsive layouts
- **Touch Interactions**: Optimized for mobile touch gestures

### 8.4 Animation System
Framer Motion for smooth, professional animations:

```javascript
// Example: Page transition animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

### 8.5 Custom CSS Classes
```javascript
// Example: Custom utility classes
const customClasses = {
  glassmorphism: "backdrop-blur-sm bg-white/10 border border-white/20",
  gradientText: "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
  cardHover: "transform hover:scale-105 transition-all duration-300",
  buttonPrimary: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
};
```

---

## 9. Performance & Optimization

### 9.1 3D Performance
- **Frame Rate**: Target 60fps for smooth animations
- **Particle Optimization**: Reduced particle count for mobile devices
- **LOD System**: Level of detail based on distance
- **Frustum Culling**: Only render visible objects

### 9.2 Bundle Optimization
- **Code Splitting**: Lazy loading of components
- **Tree Shaking**: Remove unused code
- **Asset Compression**: Optimized images and textures
- **CDN Usage**: External libraries from CDN when possible

### 9.3 Memory Management
- **Cleanup Functions**: Proper disposal of Three.js resources
- **Event Listener Removal**: Clean up event handlers
- **Texture Management**: Dispose of unused textures
- **Animation Loop Cleanup**: Stop animation loops on unmount

### 9.4 Loading Performance
- **Lazy Loading**: Load components on demand
- **Suspense Boundaries**: Loading states for async components
- **Progressive Enhancement**: Basic functionality first, then enhanced
- **Critical Path Optimization**: Load essential resources first

### 9.5 Performance Monitoring
```javascript
// Example: Performance monitoring hook
const usePerformanceMonitor = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`${entry.name}: ${entry.duration}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect();
  }, []);
};
```

---

## 10. Deployment & Configuration

### 10.1 Build Process
```bash
# Development
npm run dev          # Start development server

# Production build
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run predeploy    # Build before deployment
npm run deploy       # Deploy to GitHub Pages
```

### 10.2 Environment Configuration
```javascript
// .env file for environment variables
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 10.3 GitHub Pages Deployment
- **Repository**: Public repository required
- **Branch**: gh-pages branch for deployment
- **Domain**: Custom domain configuration
- **HTTPS**: Automatic SSL certificate

### 10.4 Build Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/MY_PORTFOLIO/',  // Repository name
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
});
```

### 10.5 Environment-Specific Configs
```javascript
// Development vs Production configurations
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debugMode: true,
    particleCount: 1000
  },
  production: {
    apiUrl: 'https://api.yourdomain.com',
    debugMode: false,
    particleCount: 500
  }
};
```

---

## 11. Development Workflow

### 11.1 Setup Instructions
```bash
# Clone repository
git clone https://github.com/MAYANK2264/MY_PORTFOLIO.git
cd MY_PORTFOLIO

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:5173
```

### 11.2 Development Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Code linting
npm run deploy       # Deploy to GitHub Pages
```

### 11.3 Code Quality
- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting (recommended)
- **React Best Practices**: Modern React patterns
- **Component Structure**: Consistent file organization

### 11.4 Testing Strategy
- **Manual Testing**: Cross-browser and device testing
- **Performance Testing**: Lighthouse audits
- **Accessibility Testing**: Screen reader compatibility
- **User Experience Testing**: Navigation and interaction testing

### 11.5 Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

### 11.6 Code Review Checklist
- [ ] Code follows project conventions
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented
- [ ] Performance considerations addressed
- [ ] Mobile responsiveness verified
- [ ] 3D performance optimized
- [ ] Tests pass (when implemented)

