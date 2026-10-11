import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import logoLight from "../../assets/img/Hero/MacarenaCaroLogo.svg";
import logoDark from "../../assets/img/Hero/MacarenaCaroLogo_darkmode.svg";
import { getSceneLoad, subscribeSceneLoad } from "../../lib/sceneLoad";
import { getLenisInstance, resetScrollInstant, scrollToHash } from "../../lib/smoothScroll";
import "./Preloader.css";

const RING_RADIUS = 86;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const ARC_RATIO = 0.78;
const ARC_LENGTH = RING_CIRCUMFERENCE * ARC_RATIO;
const ARC_START = 90 + ((1 - ARC_RATIO) * 360) / 2;

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const { t } = useTranslation();
  const load = useSyncExternalStore(subscribeSceneLoad, getSceneLoad, getSceneLoad);
  const loadRef = useRef(load);
  const onDoneRef = useRef(onDone);
  const [display, setDisplay] = useState(0);
  const [phase, setPhase] = useState<"run" | "leave">("run");
  const darkMode = useRef(
    typeof localStorage !== "undefined" && localStorage.getItem("darkMode") === "true"
  ).current;

  loadRef.current = load;
  onDoneRef.current = onDone;

  const pinScrollRef = useRef(true);

  useLayoutEffect(() => {
    document.documentElement.classList.add("is-preloading");
    resetScrollInstant();
    getLenisInstance()?.stop();

    let pinning = false;
    const pin = () => {
      if (!pinScrollRef.current || pinning) return;
      if ((window.scrollY || document.documentElement.scrollTop || 0) < 1) return;
      pinning = true;
      resetScrollInstant();
      pinning = false;
    };

    window.addEventListener("scroll", pin, { passive: true });

    return () => {
      window.removeEventListener("scroll", pin);
      document.documentElement.classList.remove("is-preloading");
      getLenisInstance()?.start();
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    let peak = 0;
    const started = performance.now();

    const tick = () => {
      const snapshot = loadRef.current;
      const elapsed = performance.now() - started;
      const waitingForAssets = snapshot.progress <= 0 && !snapshot.active;
      const boot = waitingForAssets ? Math.min(12, elapsed / 90) : 0;
      const asset = Math.min(92, snapshot.progress * 0.92);

      peak = Math.max(peak, boot, snapshot.progress > 0 || snapshot.active ? asset : 0);

      const stalled = elapsed > 25000 && !snapshot.active && !snapshot.ready;
      const failed = snapshot.failed && !snapshot.active;
      const forceDone = snapshot.ready || failed || stalled;
      const target = forceDone ? 100 : peak;

      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.35) current = target;
      if (forceDone && current > 99.15) current = 100;

      setDisplay(current);

      if (current >= 100 && forceDone) {
        setPhase("leave");
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "leave") return;

    pinScrollRef.current = false;
    document.documentElement.classList.remove("is-preloading");
    getLenisInstance()?.start();

    const hash = window.location.hash;
    if (hash && hash !== "#" && hash !== "#Home") {
      scrollToHash(hash, { immediate: true });
    } else {
      resetScrollInstant();
    }

    document.documentElement.classList.add("scene-ready");

    const timer = window.setTimeout(() => onDoneRef.current(), 1100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const rounded = Math.round(display);
  const announced = Math.min(100, Math.floor(rounded / 5) * 5);
  const dashOffset = ARC_LENGTH * (1 - display / 100);
  const headAngle = ARC_START + (display / 100) * ARC_RATIO * 360;
  const logo = darkMode ? logoDark : logoLight;

  return (
    <div
      className={`preloader${darkMode ? " is-dark" : ""}${phase === "leave" ? " is-leaving" : ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={rounded}
      aria-valuetext={`${rounded}%`}
      aria-label={t("loaderScene")}
      aria-busy={phase === "run"}
    >
      <div className="preloader__field" aria-hidden="true">
        <span className="preloader__orb preloader__orb-a" />
        <span className="preloader__orb preloader__orb-b" />
        <span className="preloader__orb preloader__orb-c" />
      </div>

      <div className="preloader__content">
        <img className="preloader__logo" src={logo} alt="Macarena Caro" draggable={false} />

        <div className="preloader__stage">
          <svg className="preloader__ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle className="ring-dashes" cx="100" cy="100" r="96" />
            <circle
              className="ring-track"
              cx="100"
              cy="100"
              r={RING_RADIUS}
              transform={`rotate(${ARC_START} 100 100)`}
              strokeDasharray={`${ARC_LENGTH} ${RING_CIRCUMFERENCE}`}
            />
            <circle
              className="ring-progress"
              cx="100"
              cy="100"
              r={RING_RADIUS}
              transform={`rotate(${ARC_START} 100 100)`}
              strokeDasharray={`${ARC_LENGTH} ${RING_CIRCUMFERENCE}`}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="spin spin-a" aria-hidden="true"><span className="sat" /></div>
          <div className="spin spin-b" aria-hidden="true"><span className="sat sat-b" /></div>
          <div className="spin spin-c" aria-hidden="true"><span className="sat sat-c" /></div>

          <div
            className="preloader__head-rotor"
            style={{ transform: `rotate(${headAngle}deg)` }}
            aria-hidden="true"
          >
            <span className="preloader__head" />
          </div>

          <div className="preloader__meter">
            <p className="preloader__count">
              <span>{rounded}</span>
              <span className="preloader__pct">%</span>
            </p>
            <div className="preloader__track" aria-hidden="true">
              <div className="preloader__fill" style={{ width: `${display}%` }}>
                <span className="preloader__bead" />
              </div>
            </div>
          </div>
        </div>

        {/*<p className="preloader__label">{t("loaderScene")}</p>*/}
      </div>

      <span className="preloader__live" aria-live="polite">
        {t("loaderScene")} {announced}%
      </span>
    </div>
  );
}
