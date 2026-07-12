import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import logoLight from "../../assets/img/Hero/MacarenaCaroLogo.svg";
import logoDark from "../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg";
import "./NotFound.css";

const stars = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 17) % 84)}%`,
  top: `${6 + ((i * 23) % 88)}%`,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.35,
  duration: 2.8 + (i % 4) * 0.6,
}));

export default function NotFound() {
  const { darkMode } = useDarkMode();
  const logo = darkMode ? logoDark : logoLight;

  return (
    <main className="not-found">
      <div className="not-found__bg" aria-hidden="true">
        <div className="not-found__grid" />
        <div className="not-found__glow not-found__glow--left" />
        <div className="not-found__glow not-found__glow--right" />
        {stars.map((star) => (
          <span
            key={star.id}
            className="not-found__star"
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

      <div className="not-found__content">
        <motion.div
          className="not-found__logo-wrap"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="not-found__orbit not-found__orbit--outer" />
          <div className="not-found__orbit not-found__orbit--inner" />
          <img src={logo} alt="Macarena Caro" className="not-found__logo" />
        </motion.div>

        <motion.p
          className="not-found__code"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          404
        </motion.p>

        <motion.h1
          className="not-found__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          Esta página se ha perdido en el espacio
        </motion.h1>

        <motion.p
          className="not-found__text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          La ruta que buscas no existe en{" "}
          <span className="not-found__domain">macarenacaro.es</span>. Vuelve al
          portfolio y sigue explorando.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <Link to="/" className="not-found__btn">
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
