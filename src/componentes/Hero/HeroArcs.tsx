export default function HeroArcs() {
  return (
    <>
      {/* arco inferior izquierdo */}
      <svg className="arc-bottom" viewBox="0 0 1000 1000">

        <defs>
          <linearGradient id="arcGradientBottom" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--white-transparent)" stopOpacity="1"/>
            <stop offset="57%" stopColor="var(--white-transparent)" stopOpacity="1"/>
            <stop offset="70%" stopColor="var(--purpura3)" stopOpacity="0.45"/>
            <stop offset="90%" stopColor="var(--purpura)" stopOpacity="1"/>
          </linearGradient>
        </defs>

        <circle
          cx="500"
          cy="500"
          r="450"
          className="arc-line"
          stroke="url(#arcGradientBottom)"
        />
      </svg>


      {/* arco superior derecho */}
      <svg className="arc-top" viewBox="0 0 1000 1000">

        <defs>
          <linearGradient id="arcGradientTop" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--purpura)" stopOpacity="1"/>
            <stop offset="10%" stopColor="var(--purpura)" stopOpacity="1"/>
            <stop offset="30%" stopColor="var(--purpura3)" stopOpacity="0.45"/>
            <stop offset="40%" stopColor="var(--white-transparent)" stopOpacity="1"/>
          </linearGradient>
        </defs>

        <circle
          cx="500"
          cy="500"
          r="450"
          className="arc-line"
          stroke="url(#arcGradientTop)"
        />
      </svg>
    </>
  );
}