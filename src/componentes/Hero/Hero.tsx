import SplineMaca from './SplineMaca';
import './Hero.css'
import scroll from '../../assets/Scroll down.json';
import Lottie from 'lottie-react';

export default function Hero({ onSplineReady }: HeroProps) {

  const handleSplineLoad = () => { setTimeout(() => { onSplineReady(); }, 750); };

  return (
    <section id="Home" className="hero-wrapper">
      <section className="hero-section">
        <div id="canvas3d">
          <SplineMaca onSceneLoad={handleSplineLoad} />
        </div>
        <div className="hero-subtitle">
          <div className="outLineScroll">
            <div className="scroll">
              <Lottie animationData={scroll} loop={true} autoplay={true} style={{ height: '50px', width: '30px' }} rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
            </div>
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