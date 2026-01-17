import SplineMaca from './SplineMaca';
import './Hero.css'

type HeroProps = {
  onSplineReady: () => void;
};

export default function Hero({ onSplineReady }: HeroProps) {

  const handleSplineLoad = () => {
    setTimeout(() => { onSplineReady(); }, 750);
  };

  return (
    <section id="Home" className="hero-wrapper">
      <section className="hero-section">
        <div id="canvas3d">
          <SplineMaca onSceneLoad={handleSplineLoad} />
        </div>
      </section>
      <div className='distance'></div>
    </section>
  );
}