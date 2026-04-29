import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Seminars } from "@/components/Seminars";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { Recommendations } from "@/components/Recommendations";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionNav } from "@/components/ui/SectionNav";
import { ChatBot } from "@/components/ui/ChatBot";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <AnimatedBackground />
      <LoadingScreen />
      <ThemeToggle />
      <ScrollToTop />
      <SectionNav />
      <ChatBot />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">

        <FadeIn>
          <div id="header">
            <Header />
          </div>
        </FadeIn>

        {/* About + Experience side by side */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div id="about" className="contents">
              <About />
            </div>
            <Experience />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div id="recommendations"><Recommendations /></div>
        </FadeIn>

        <FadeIn delay={200}>
          <div id="skills"><Skills /></div>
        </FadeIn>

        <FadeIn delay={250}>
          <div id="projects"><Projects /></div>
        </FadeIn>

        <FadeIn delay={300}>
          <div id="certifications"><Certifications /></div>
        </FadeIn>

        <FadeIn delay={350}>
          <div id="education"><Education /></div>
        </FadeIn>

        <FadeIn delay={400}>
          <div id="seminars"><Seminars /></div>
        </FadeIn>

        <FadeIn delay={450}>
          <div id="gallery"><Gallery /></div>
        </FadeIn>

        <FadeIn delay={500}>
          <div id="contact"><Footer /></div>
        </FadeIn>

      </div>
    </main>
  );
}