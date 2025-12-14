import { useState, useEffect } from 'react';
import SplineMaca from './SplineMaca';

export default function Hero() {
  const [readyToShowSpline, setReadyToShowSpline] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Iniciar temporizador de 3 segundos al montar
    const timer = setTimeout(() => {
      setReadyToShowSpline(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Cuando ambos: cargó Spline Y pasaron 3s → ocultar loader
  const loaderShouldHide = readyToShowSpline && splineLoaded;

  return (
    <section id="Home" className="hero-wrapper">
      <section className="hero-section">
        {!loaderShouldHide && (
          <div id="loader">
            <div className="spinner"></div>
            <p>Cargando a Mimi…</p>
          </div>
        )}

        <div id="canvas3d">
          <SplineMaca onSceneLoad={() => setSplineLoaded(true)} />
        </div>

        <div className="img_spline"></div>
        <div className="hero-subtitle">
          <div className="web-developer">
            <div className="text-block">WEB DEVELOPER | BIG DATA | AI</div>
          </div>
        </div>
      </section>
      <div className="spacer"></div>
    </section>
  );
}