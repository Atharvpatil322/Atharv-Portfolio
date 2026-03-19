import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ConnectFooter } from "@/components/ConnectFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <Intro />
      <ExperienceSection />
      <ConnectFooter />
    </main>
  );
}
