
import './Projects.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function Projects() {
    //Opacity useEffect onComponent
    const containerVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 80 },
    };

    const projectsData = [
        { id: 'ProyectA', title: "modulAR", subt: "modulAR is a platform for creatives that connects talent, projects, and clients through Augmented Reality, increasing engagement and sales.", url: "/modulAR" },
        { id: 'ProyectB', title: "Valezka Cortés", subt: "A clean, professional website designed to build trust and make psychological and family mediation services easily accessible.", url: "/Vc" },
        { id: 'ProyectC', title: "Bank App", subt: "An academic banking application developed in C# (.NET), featuring client and branch management with database integration.", url: "/Bank" },
        { id: 'ProyectD', title: "Movies", subt: "A React-based movie platform with user accounts, a film catalog, and a custom API developed in .NET.", url: "/Movies" },
        { id: 'ProyectE', title: "Vinos", subt: "An elegant WordPress website for a wine bar, focused on minimalism, usability, and online menu exploration", url: "/Vinos" },

    ];
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
                                {/* <p>Work I'm Proud Of <FontAwesomeIcon icon={fas['faHeart']} /></p>*/}
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

                                {projectsData.map((proj) => (
                                    <motion.div key={proj.id} className={`figure ${proj.id}`}>
                                        <div className='contentExterior'>
                                            <div className='titleSection'>
                                                <div className='ProjectName'>
                                                    <Link to={proj.url} className='ProjectNameLink'>{proj.title}</Link> </div>
                                                <div className='Description'>
                                                <p>{proj.subt}</p>
                                                <Link to={proj.url} className="btnLink">
                                                    Learn more
                                                </Link> 
                                                </div>                                           
                                            </div>

                                        </div>
                                    </motion.div>
                                ))}

                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>





        </>
    )
}
