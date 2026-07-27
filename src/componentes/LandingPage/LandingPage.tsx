import About2 from "../About/About";
import Contact from "../Contact/Contact";
import Evolution from "../Evolution/Evolution";
import Projects from "../Projects/Projects";
import SkillsProjects from "../Skills/SkillsProjects";
import Webs  from "../Webs/Webs";

export default function LandingPage() {
  return (
    <>        
        <About2 />
        <div className="about-scroll-runway" aria-hidden="true" />
        <Projects />
        <Evolution />
        <Webs />
        <SkillsProjects/>
        <Contact />

    </>
  );
}
