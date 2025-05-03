import { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faChartPie,
  faRobot,
  faSearchDollar,
  faComments,
  faChartLine,
  faNetworkWired,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceAIBigData = () => {
  useScrollAnimation();

  useEffect(() => {
    // Animation for the header
    gsap.fromTo(
      "#service-header h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#service-header",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "#service-header p",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: "#service-header",
          start: "top 80%",
        },
      }
    );

    // Animation for features
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section
        id="service-header"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0080FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFC000]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Intelligence Artificielle &{" "}
              <span className="text-gradient">Big Data</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transformez vos données en insights stratégiques grâce à nos
              solutions d'Intelligence Artificielle et de Big Data. Nous vous
              aidons à exploiter la puissance de vos données pour prendre des
              décisions éclairées et créer un avantage concurrentiel.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Solutions IA & Big Data
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Explorez nos services d'Intelligence Artificielle et de Big Data
              pour transformer vos données en valeur ajoutée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon
                  icon={faBrain}
                  className="text-2xl text-[#0080FF]"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Machine Learning</h3>
              <p className="text-gray-400">
                Développement d'algorithmes de machine learning adaptés à vos
                besoins spécifiques pour la prédiction, la classification et la
                recommandation.
              </p>
            </div>
            {/* Add other feature cards here */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceAIBigData;