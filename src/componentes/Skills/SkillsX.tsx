import './Skills.css'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'


export default function Skills(){

  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2 }) // 20%

return(
    <>

    <motion.section ref={ref} 
    id="Skills" 
    className="myskills"       
    animate={{
        backgroundColor: isInView ? "#1a1a1a" : "#ffffff"
      }}
      transition={{ duration: 0.6 }}>
      <div className='wrapperSkills'></div>
      {/*<div className="columns-6 w-row"> 
        <div className="column-7 w-col w-col-6 w-col-stack">
          <div className="div-block-13"></div>
          <div className="lateral">
            <div>
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c62_TOP1.webp"
                loading="lazy"
                alt=""
                className="image-8"
              />
              <div className="div-block-21"></div>
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c63_BACK2.webp"
                loading="lazy"
                alt=""
                className="image-22"
              />
            </div>
            <div className="div-block-20">
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c68_ia.webp"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="div-block-20">
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c67_databases.webp"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="div-block-20">
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c66_window.webp"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="div-block-20">
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c69_engranaje.webp"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="div-block-20">
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/677c57b66c8a0d9347ff2e44_Recurso%204.png"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="div-block-20">
              <img
                src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/677c57b6367edf5408fa7854_Recurso%205.avif"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="column-8 w-col w-col-6 w-col-stack">
          <div className="div-block-44">
            <h1 className="heading _3">Skills</h1>
            <div className="webapp">
              <div className="columns-9 w-row">
                <div
                  className="column-106 w-col w-col-1 w-col-small-1 w-col-tiny-1"
                >
                  <div className="text-block-13">01</div>
                </div>
                <div
                  className="column-102 w-col w-col-11 w-col-small-11 w-col-tiny-11"
                >
                  <div className="text-block-12">Front End Development</div>
                  <div className="text-block-12 _2">Languages and Frameworks</div>
                  <div className="linea"></div>
                  <div className="div-block-28">
                    <div className="div-block-27">JavaScript</div>
                    <div className="div-block-27">Boostrap</div>
                    <div className="div-block-27">HTML</div>
                    <div className="div-block-27">CSS</div>
                    <div className="div-block-27">React</div>
                  </div>
                </div>
              </div>
              <div className="columns-10 w-row">
                <div className="w-col w-col-1 w-col-small-1 w-col-tiny-1">
                  <div className="text-block-13">02</div>
                </div>
                <div className="w-col w-col-11 w-col-small-11 w-col-tiny-11">
                  <div className="text-block-12">Back-End Development <br /></div>
                  <div className="text-block-12 _2">Languages and Frameworks</div>
                  <div className="linea"></div>
                  <div className="div-block-28">
                    <div className="div-block-27">.NET</div>
                    <div className="div-block-27">MVC</div>
                    <div className="div-block-27">C#</div>
                    <div className="div-block-27">Razor Pages</div>
                    <div className="div-block-27">Entity Framework</div>
                    <div className="div-block-27">ASP.NET<br /></div>
                    <div className="div-block-27">Python</div>
                  </div>
                  <div className="text-block-12 _2">
                    Databases &amp; Integrations
                  </div>
                  <div className="linea"></div>
                  <div className="div-block-28">
                    <div className="div-block-27">SQL Server</div>
                    <div className="div-block-27">PostgreSQL</div>
                    <div className="div-block-27">MongoDB (NoSQL)</div>
                    <div className="div-block-27">MVC</div>
                    <div className="div-block-27">Github</div>
                    <div className="div-block-27">Vagrant</div>
                    <div className="div-block-27">RESTful APIs</div>
                  </div>
                </div>
              </div>
              <div className="columns-10 w-row">
                <div className="w-col w-col-1 w-col-small-1 w-col-tiny-1">
                  <div className="text-block-13">03</div>
                </div>
                <div className="w-col w-col-11 w-col-small-11 w-col-tiny-11">
                  <div className="text-block-12">
                    Big Data and Artificial Intelligence
                  </div>
                  <div className="text-block-12 _2">
                    Data Analysis &amp; Methods
                  </div>
                  <div className="linea"></div>
                  <div className="div-block-28">
                    <div className="div-block-27">Numpy</div>
                    <div className="div-block-27">Scikit-learn</div>
                    <div className="div-block-27">Pandas</div>
                    <div className="div-block-27">Matplotlib</div>
                    <div className="div-block-27">Machine Learning</div>
                    <div className="div-block-27">K-means</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </motion.section>
    <div className="bajomyskills w-row">
      <div className="column-9 w-col w-col-8">
        <img
          src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66fad774923e6a26cf1e5bdb_graybigunder.avif"
          loading="lazy"
          sizes="(max-width: 767px) 100vw, 67vw"
          /*srcset="
            https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66fad774923e6a26cf1e5bdb_graybigunder-p-500.avif  500w,
            https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66fad774923e6a26cf1e5bdb_graybigunder.avif       1274w
          "*/
          alt=""
          className="image-7"
        />
      </div>
      <div className="column-10 w-col w-col-4">
        <img
          src="https://cdn.prod.website-files.com/66f53b4e20ea887a10108c17/66f53b4e20ea887a10108c65_grayunder.webp"
          loading="lazy"
          alt=""
          className="image-23"
        />
      </div>
    </div>
    <div className="spacer_myskills"></div>


    </>
)

}