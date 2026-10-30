import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070e] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {isDesktop && (
        <div 
          className="pointer-events-none fixed z-30 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`
          }}
        />
      )}

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
