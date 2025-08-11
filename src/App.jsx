import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Certificates from './pages/Certificates';
import SpaceEnvironment from './components/SpaceEnvironment';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="relative z-0">
      {/* Show SpaceEnvironment only on non-Home pages for simpler backgrounds */}
      {!isHomePage && <SpaceEnvironment />}
      
      {/* Add a simple background for non-Home pages */}
      {!isHomePage && (
        <div 
          className="fixed inset-0 -z-20" 
          style={{
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
          }}
        />
      )}
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
