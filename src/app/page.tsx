import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import HeroSection from "@/components/sections/HeroSection";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import SectionReveal from "@/components/sections/SectionReveal";

export default function Home() {
  return (
    <>
      <div className="container">
        <HeroSection />

        <SectionReveal>
          <About />
        </SectionReveal>

        <SectionReveal>
          <Experience />
        </SectionReveal>

        <SectionReveal>
          <Skills />
        </SectionReveal>

        <SectionReveal>
          <Projects />
        </SectionReveal>

        <SectionReveal>
          <Contact />
        </SectionReveal>
      </div>
    </>
  );
}
