import { useEffect, useState } from 'react';
import Navbar from './componentes/Menu/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './componentes/Hero/Hero';
import About from './componentes/About/About';
import Preloader from './componentes/Preloader/Preloader';
import Projects from './componentes/Projects/Projects';
import Lenis from 'lenis';

export default function App() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (splineLoaded) {
      const minDuration = 5000; 
      const timeElapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - timeElapsed);

      const timer = setTimeout(() => {
        setAnimateOut(true);

        setTimeout(() => {
          setShowPreloader(false);
        }, 500); 
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [splineLoaded, startTime]);


useEffect(() => {
  const lenis = new Lenis({
    duration: 0.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.5, // Aumentamos un poco la fuerza del scroll (opcional)
    touchMultiplier: 5,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}, []);


  return (
    <>
        {showPreloader && <Preloader animateOut={animateOut} />}
        <Navbar />
        <Hero onSplineReady={() => setSplineLoaded(true)} />
        <About />
        <Projects/>
        <div className="container"></div>
    </>
  )
}

