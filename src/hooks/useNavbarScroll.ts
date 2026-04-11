import { useEffect, useRef, useState } from "react";

export default function useNavbarScroll() {

  const [hidden, setHidden] = useState(false); //navbar hidden or visible

  const lastScroll = useRef(0);//last scroll position
  const ticking = useRef(false);//Optimización de performance,evita que el scroll se ejecute demasiadas veces.


  //cuando el componente se monte, ejecuta esto
  useEffect(() => {
    
/* Hide or Show navbar. */
    const updateScroll = () => {

      const currentScroll = window.scrollY;

      if (Math.abs(currentScroll - lastScroll.current) < 10) {
        ticking.current = false;
        return;
      }

      if (currentScroll > lastScroll.current && currentScroll > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = currentScroll;
      ticking.current = false;
    };

    const handleScroll = () => {

      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return hidden;

}