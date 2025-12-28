
import './Projects.css'
import { motion } from 'framer-motion'

export default function Projects() {
    //Opacity useEffect onComponent
    const containerVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 80 },
    };

    return (
        <>
            {/*
            <div className='page-wrapper'>
                <div id="Projects" className="main-wrapper">

                    <div className='section_stack'>
                        <div className='padding-global'>
                            <div className='container-large'>

                                <div className='stack_component'>
                                    <div className='section_description'>
                                        <h1 className="heading">Projects</h1>
                                    </div>
                                    <div className='stack_card one'></div>
                                    <div className='stack_card two'></div>
                                    <div className='stack_card three'></div>
                                    <div className='stack_card four'></div>
                                    <div className='stack_card five'></div>

                                </div>
                            </div>
                        </div>
                    </div>                 
                </div>
            </div>*/}


            <div id="Projects" className='page-wrapper'>
                <div className="main-wrapper">

                    <div className="containers">                        
                        <div className='wrapperA'>

                                                <motion.div
                                                    className="descriptionProjects"
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    exit="exit"
                                                    viewport={{ once: false, amount: 0.3 }}
                                                    variants={containerVariants}
                                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                                                >
                                <h1 className="heading">Projects</h1>
                                <p>More text about projects More text about projectsMore text about projectsMore text about projectsMore text about projects</p>
                            </motion.div>



                                                <motion.div
                                                    className="wrapperB"
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    exit="exit"
                                                    viewport={{ once: false, amount: 0.3 }}
                                                    variants={containerVariants}
                                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.20 }}
                                                >
                            <div className='figure A'>
                                <div className='contentExterior'>
                                    <div className='imagenProyecto'>
                                        <h2>Nombre del Proyecto</h2>
                                    </div>
                                    <div className='content'>
                                        <p>Algo interesante que decir del proyecto</p>
                                        <button>Click for more</button>
                                    </div>
                                </div>
                            </div>
                            <div className='figure A'>
                                <div className='contentExterior'>
                                    <div className='imagenProyecto'>
                                        <h2>Nombre del Proyecto</h2>
                                    </div>
                                    <div className='content'>
                                        <p>Algo interesante que decir del proyecto</p>
                                        <button>Click for more</button>
                                    </div>
                                </div>
                            </div>
                            <div className='figure A'>
                                <div className='contentExterior'>
                                    <div className='imagenProyecto'>
                                        <h2>Nombre del Proyecto</h2>
                                    </div>
                                    <div className='content'>
                                        <p>Algo interesante que decir del proyecto</p>
                                        <button>Click for more</button>
                                    </div>
                                </div>
                            </div>
                            <div className='figure A'>
                                <div className='contentExterior'>
                                    <div className='imagenProyecto'>
                                        <h2>Nombre del Proyecto</h2>
                                    </div>
                                    <div className='content'>
                                        <p>Algo interesante que decir del proyecto</p>
                                        <button>Click for more</button>
                                    </div>
                                </div>
                            </div>
                            <div className='figure A'>
                                <div className='contentExterior'>
                                    <div className='imagenProyecto'>
                                        <h2>Nombre del Proyecto</h2>
                                    </div>
                                    <div className='content'>
                                        <p>Algo interesante que decir del proyecto</p>
                                        <button>Click for more</button>
                                    </div>
                                </div>
                            </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>





        </>
    )
}
