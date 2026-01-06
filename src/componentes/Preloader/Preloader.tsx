import './Preloader.css'
import Lottie from 'lottie-react';
import animationData from '../../assets/json/Preloader/MacaPreolader Gradient.json'; 
import { useEffect, useState } from 'react';

export default function Preloader({ animateOut }: PreloaderProps) {
    const [bgVisible, setBgVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBgVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  
  return (
          <div className={`preloader  ${animateOut ? 'hidden' : ''}  ${bgVisible ? 'bg-visible' : 'bg-hidden'}`}>
            <Lottie animationData={animationData} loop={false} autoplay={true} style={{ height: '100vh', width: '100vw' }} rendererSettings={{preserveAspectRatio: 'xMidYMid slice' }}/>
          </div>
  );
}


interface PreloaderProps {
  animateOut: boolean;
}