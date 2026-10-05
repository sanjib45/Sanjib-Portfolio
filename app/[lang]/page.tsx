import ScrollProgress from "@/components/layout/scroll-progress";
import ManifestoFlow from "@/components/effects/manifesto-flow";
import Hero from "@/components/sections/hero";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { ClientMarquee } from "@/components/sections/client-marquee";
import About from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import Stack from "@/components/sections/stack";
import Projects from "@/components/sections/projects";
import Roadmap from "@/components/sections/roadmap";
import Resume from "@/components/sections/resume";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <main className="bg-background relative">

        <Hero />

        <CurrentlyBuilding />

        <ClientMarquee />

        <div className="relative z-10 bg-background border-t border-border">

          <section id="about">
            <About />
          </section>

          <ManifestoFlow />

          <section id="process">
            <Process />
          </section>

          <section id="stack">
            <Stack />
          </section>

          <ManifestoFlow reverse />

          <section id="projects">
            <Projects />
          </section>

          <ManifestoFlow />

          <section id="roadmap">
            <Roadmap />
          </section>

          <ManifestoFlow reverse />

          <section id="resume" className="scroll-mt-24">
            <Resume />
          </section>

          <ManifestoFlow />

          <section id="contact">
            <Contact />
          </section>

        </div>

      </main >
    </>
  );
}

