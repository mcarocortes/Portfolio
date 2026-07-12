import About2 from "../About/About";
import Contact from "../Contact/Contact";
import Projects3 from "../Projects/Projects3";
import SkillsProjects from "../Skills/SkillsProjects";
import Webs  from "../Webs/Webs";

export default function LandingPage() {
  return (
    <>        
        <About2 />
        <div className="about-scroll-runway" aria-hidden="true" />
        <Projects3 />
        <Webs />
        <SkillsProjects/>
        <Contact />

    </>
  );
}
