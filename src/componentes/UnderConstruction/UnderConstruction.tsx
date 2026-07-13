import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import logoLight from "../../assets/img/Hero/MacarenaCaroLogo.svg";
import logoDark from "../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg";
import "./UnderConstruction.css";

const stars = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 17) % 84)}%`,
  top: `${6 + ((i * 23) % 88)}%`,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.35,
  duration: 2.8 + (i % 4) * 0.6,
}));

export default function UnderConstruction() {
  const { darkMode } = useDarkMode();
  const logo = darkMode ? logoDark : logoLight;

  return (
    <main className="under-construction">
      <div className="under-construction__bg" aria-hidden="true">
        <div className="under-construction__grid" />
        <div className="under-construction__glow under-construction__glow--left" />
        <div className="under-construction__glow under-construction__glow--right" />
        {stars.map((star) => (
          <span
            key={star.id}
            className="under-construction__star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="under-construction__content">
        <motion.div
          className="under-construction__logo-wrap"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="under-construction__orbit under-construction__orbit--outer" />
          <div className="under-construction__orbit under-construction__orbit--inner" />
          <img src={logo} alt="Macarena Caro" className="under-construction__logo" />
        </motion.div>

        <motion.span
          className="under-construction__badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Próximamente
        </motion.span>

        <motion.h1
          className="under-construction__title"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.6 }}
        >
          Página en construcción
        </motion.h1>

        <motion.p
          className="under-construction__text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          Estoy dando los últimos detalles a mi nuevo portafolio. Muy pronto
          podrás conocer mis proyectos, experiencia y la forma en que construyo
          interfaces web.
        </motion.p>

        <motion.div
          className="under-construction__progress"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="under-construction__progress-track">
            <div className="under-construction__progress-bar" />
          </div>
          <p className="under-construction__progress-label">
            Trabajando en ello
            <span className="under-construction__dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
