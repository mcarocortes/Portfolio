import About2 from "../About/About";
import Contact from "../Contact/Contact";
import Evolution from "../Evolution/Evolution";
import Projects from "../Projects/Projects";
import TechStack from "../TechStack/TechStack";
import WhatIBring from "../WhatIBring/WhatIBring";
import Webs from "../Webs/Webs";

export default function LandingPage() {
  return (
    <>
      <div className="about-scroll-runway" aria-hidden="true" />
      <About2 />
      <Evolution />
      <WhatIBring />
      <Projects />
      <TechStack />
      <Contact />

    </>
  );
}
