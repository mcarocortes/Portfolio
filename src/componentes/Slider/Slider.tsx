import { Fragment, useEffect, useRef } from 'react';
import './Slider.css'
import emoji from './../../assets/img/About/mFaceHandUp.png'

export default function Slider() {
//Contenedor que se va a mover
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sliderRef.current) {
                const scrollY = window.scrollY; //posición actual de scroll
                const moveX = scrollY * 0.9; //se mueve a la derecha x Velocidad               
                sliderRef.current.style.transform = `translateX(${moveX}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <>
            <aside className="purpose">
                <div  ref={sliderRef} className="codewithstyle">
                    <div className="div-block-97">
                    {[1, 2, 3, 4, 5, 6,7,8].map((item) => (
                        <Fragment key={item}>
                            <img
                                src= {emoji}
                                loading="lazy"
                                sizes="84.57500457763672px"
                                className="image-67"
                                alt=""
                            />
                            <h1 className="heading-9">Code with Style</h1>
                        </Fragment>
                    ))}
                </div>
                </div>
            </aside>
        </>
    )
}