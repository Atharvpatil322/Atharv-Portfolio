import { SiteShell } from "@/components/SiteShell";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Connect } from "@/components/sections/Connect";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="noise relative min-h-screen">
      <BackgroundFX />
      <SiteShell />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Connect />
      <Chatbot />
    </main>
  );
}
