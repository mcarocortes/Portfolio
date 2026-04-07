import About from "../About/About";
import Contact from "../Contact/Contact";
import Projects from "../Projects/Projects";
import Projects3 from "../Projects/Projects3";
import SkillsProjects from "../Skills/SkillsProjects";
import Webs  from "../Webs/Webs";

export default function LandingPage() {
  return (
    <>        
        <About />
        {/*<Projects />*/}
        <Projects3 />
        <Webs />
        <SkillsProjects/>
        <Contact />

    </>
  );
}
