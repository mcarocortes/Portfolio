import SplineMaca from './SplineMaca';
import './Hero.css'

export default function Hero({ onSplineReady }: HeroProps) {

  const handleSplineLoad = () => {setTimeout(() => {onSplineReady();}, 750); };

  return (
    <section id="Home" className="hero-wrapper">
      <section className="hero-section">
        <div id="canvas3d">   
          <SplineMaca onSceneLoad={handleSplineLoad} />
        </div>  
        <div className="hero-subtitle">
          <div className="web-developer">
            <div className="text-webDeveloper">FRONT-END DESIGNER</div>
          </div>
        </div>

      </section>
      <div className="spacer"></div>
    </section>
  );
}

type HeroProps = {
  onSplineReady: () => void;
};