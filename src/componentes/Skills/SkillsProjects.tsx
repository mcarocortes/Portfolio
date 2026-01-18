
import './SkillsProjects.css'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SkillsProjects() {

      const ref = useRef(null)
        const isInView = useInView(ref, { amount: 0.1 }) // 20%
    return (

            <>
                <motion.section ref={ref} id="WhatIDo"
     
    className="page-wrapper-vertical"       
    animate={{
        backgroundColor: isInView ? "var(--skillsBg)" : "var(--purpura)"
      }}
      transition={{ duration: 0.6 }}>
                <div className="main-wrapper-vertical">

                    <div className='section_stack'>
                        <div className='padding-global'>
                            <div className='container-large'>

                                <div className='stack_component'>
                                    <div className='section_description'>
                                        <h1 className="heading">What I Bring</h1>
                                        <p>See how my background and approach align with your <span>needs</span></p>
                                    </div>
                                    <div className='stack_card one'>
                                        <div className='ImgIcon'></div>
                                        <div className='card_description'>
                                            <h3>User Interface <span>Design</span></h3>
                                            <p>Websites and apps that are easy to love, hard to ignore. We design digital experiences that convert and delight</p>
                                            <ul>
                                                <li>Website & landing page design</li>
                                                <li>App UX/UI design</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='stack_card two'>
                                        <div className='ImgIcon'></div>
                                        <div className='card_description'>
                                            <h3>Web <span>Development</span></h3>
                                            <p>Websites that look stunning, load fast, and work flawlessly. From no-code to pixel-perfect builds, we make it happen</p>
                                            <ul>
                                                <li>React & Framer development</li>
                                                <li>No-code & Code builds</li>
                                                <li>SEO-friendly, mobile-first dev</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='stack_card three'>
                                                                                <div className='ImgIcon'></div>
                                        <div className='card_description'>
                                            <h3>Brand <span>Design</span></h3>
                                            <p>Look sharp, feel right, and make your brand unforgettable. From logos to full brand systems, we create identities that last</p>
                                            <ul>
                                                <li>Logo & identity design</li>
                                                <li>Brand guidelines</li>
                                                <li>Rebranding & refresh</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='stack_card four'></div>

                                </div>
                            </div>
                        </div>
                    </div>                 
                </div>
            </motion.section>
            </>
    )
}
