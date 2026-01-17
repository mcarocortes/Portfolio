import About from "../About/About";
import Contact from "../Contact/Contact";
import Projects from "../Projects/Projects";
import SkillsProjects from "../Skills/SkillsProjects";
import Webs  from "../Webs/Webs";

export default function LandingPage() {
  return (
    <>        
        <About />
        <Projects />
        <Webs />
       <SkillsProjects/>
        <Contact />

    </>
  );
}
