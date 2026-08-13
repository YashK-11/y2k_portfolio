import Navigation from "@/components/Navigation/Navigation";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Stack from "@/components/Stack/Stack";
import Background from "@/components/Background/Background";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <main>
        <Hero />
        <Projects />
        <About />
        <Stack />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
