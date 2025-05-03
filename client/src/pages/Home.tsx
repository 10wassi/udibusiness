import  React,{ useEffect } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import CTASection from "../components/CTASection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PartenairesSection from "../components/PartenairesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { initThreeJsBackground } from "../lib/threejs";

const Home = () => {
  useScrollAnimation();

  useEffect(() => {
    // Update document title
    document.title =
      "Unity of Digital Innovation - Transformons vos idées en réalité digitale";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Unity of Digital Innovation (UDI) - Expertise en développement logiciel, intelligence artificielle, automatisation et conseil digital."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Unity of Digital Innovation (UDI) - Expertise en développement logiciel, intelligence artificielle, automatisation et conseil digital.";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <CTASection />
      <AboutSection />
      <TestimonialsSection />
      <PartenairesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
