import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';

interface SplineMacaProps {
  onSceneLoad?: () => void;
}

export default function SplineMaca({ onSceneLoad }: SplineMacaProps) {
  // 1. Estado para detectar si es mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para verificar el ancho
    const checkResizing = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Ejecutar al montar
    checkResizing();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkResizing);

    return () => window.removeEventListener('resize', checkResizing);
  }, []);

  return (
    <>
      {isMobile ? (
        <Spline
          scene="https://prod.spline.design/gP5oJjL5KyijCOu8/scene.splinecode"
          onLoad={onSceneLoad}
        />
      ) : (
        <Spline
          scene="https://prod.spline.design/mXYOAUV6ziXwYtIV/scene.splinecode"
          onLoad={onSceneLoad}
        />)
      }

    </>
  );
}