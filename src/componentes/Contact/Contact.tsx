import './Contact.css'
import logoName from '../../assets/img/Footer/macarenaFooter.svg'
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../lib/smoothScroll'

export default function Contact() {
  return (
    <>
      <section id="Contact" >
        {/*<div className='loop'>
          <div className="track">
              <img src={logoName} alt="" />
              <img src={logoName} alt="" />
              <img src={logoName} alt="" />              
              <img src={logoName} alt="" />
              <img src={logoName} alt="" />
              <img src={logoName} alt="" />
              </div>
        </div>*/}
        <div className='content'>
          <div className='message'>
            
            <p className='title'>Crafting <span>bold <br />design</span> experiences</p>

            <button className='btnAContacto' onClick={() =>
              window.location.href =
              "mailto:m.caro.cortes2@gmail.com?subject=I%20want%20to%20connect!"
            }>Let's talk!</button>

            <p className='madeWith'>Made with <span>love</span> in Spain ❤︎</p>
          </div>

          <div className='items'>
            
            <ul>
              <li>
                <a href="mailto:m.caro.cortes2@gmail.com" className="list">Email</a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/macarena-caro-cortes/"className="list" target="_blank"rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/mcarocortes" className="list" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/macarocortes/"
                  className="list"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>

          </div>

        </div>

        <div className='logoTrack'>

        </div>
        <div className='footerLine'>
          Copyright © Macarena Caro 2026. All rights reserved
          <Link
            to="#Home"
            className="back"
            onClick={() => {
              scrollToTop();
              window.history.replaceState(null, "", "#Home");
            }}
          >
            Back to top
          </Link>
        </div>
        {/*<div className='figures'>
          <Spline scene="https://prod.spline.design/H3rK74CKvZRSLX4n/scene.splinecode" />
        </div>*/}
      </section>


    </>
  )


}