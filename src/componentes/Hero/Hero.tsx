import SplineMaca from './SplineMaca';
import './Hero.css'
import logo from './../../assets/img/Hero/MacarenaCaroLogo.svg'
import HeroParticles from './HeroParticles';

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
        <div className='hero-bg'>
            <HeroParticles/>  
        </div>
        {/*<div id="canvas3d">          
          <SplineMaca onSceneLoad={handleSplineLoad} />*/}
          <div className='content-hero'>
            <img src={logo} loading="lazy" alt="" className="logoName-hero2" />
            <h1>Creative Designer and Developer</h1>
            <p>I build designs that solve problems, inspire actions, and drive success</p>
          </div>   
        {/*</div>*/}

        {/*<div className='outLineScroll scroll'></div>*/}
      </section>
      <div className='distance'></div>
    </section>
  );
}