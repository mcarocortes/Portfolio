import { useEffect, useState } from 'react';
import Navbar from './componentes/Menu/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './componentes/Hero/Hero';
import About from './componentes/About/About';
import Preloader from './componentes/Preloader/Preloader';


export default function App() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

// Guardamos el momento exacto en que la página carga
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (splineLoaded) {
      const minDuration = 5000; 
      const timeElapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - timeElapsed);

      const timer = setTimeout(() => {
        setAnimateOut(true); // Inicia desvanecimiento CSS (0.5s)

        setTimeout(() => {
          setShowPreloader(false);
        }, 500); 
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, [splineLoaded, startTime]);

  return (
    <>
        {showPreloader && <Preloader animateOut={animateOut} />}
        <Navbar />
        <Hero onSplineReady={() => setSplineLoaded(true)} />
        <About />
        <div className="container"></div>
    </>
  )
}

