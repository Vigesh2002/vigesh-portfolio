import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Education } from '@/components/sections/education';
import { Manifesto } from '@/components/sections/manifesto';
import { Contact } from '@/components/sections/contact';
import { Preloader } from '@/components/motion/preloader';

export default function HomePage() {
  return (
    <>
      {/* First-visit-only entry curtain. Renders nothing under reduced motion
          or on repeat visits, so it never delays repeat page loads. */}
      <Preloader />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Manifesto />
      <Contact />
    </>
  );
}
