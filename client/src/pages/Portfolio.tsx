import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Project } from "../../../shared/schema";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLink,
  faLaptopCode,
  faBrain,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedPageHeader from "../components/AnimatedPageHeader";
import { headerBackgrounds } from "../assets/headers";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", label: "Tous", icon: null },
  { id: "Développement", label: "Développement", icon: faLaptopCode },
  { id: "Intelligence Artificielle", label: "IA & Big Data", icon: faBrain },
  { id: "Automatisation", label: "Automatisation", icon: faCogs },
  { id: "Conseil", label: "Conseil Digital", icon: faChartLine },
];

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useScrollAnimation();

  const { data: projects = [], isLoading: isProjectsLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("https://udi-business-foji.onrender.com/api/projects");
      if (!res.ok) throw new Error("Erreur lors du chargement des projets");
      return res.json();
    },
  });

  useEffect(() => {
    // Animations pour les sections
    gsap.fromTo(
      "#portfolio-header h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#portfolio-header",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "#portfolio-header p",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: "#portfolio-header",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "#category-filters button",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#category-filters",
          start: "top 90%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
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
  }, [filteredProjects]);

  const handleFilter = (category: string) => {
    setActiveFilter(category);
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  if (isProjectsLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-800 rounded-lg w-1/3 mx-auto"></div>
            <div className="h-6 bg-gray-800 rounded-lg w-2/3 mx-auto"></div>
            <div className="flex justify-center space-x-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-28 bg-gray-800 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="h-[70px]"></div>
      <AnimatedPageHeader
        id="portfolio-header"
        title="Notre Portfolio"
        subtitle="Découvrez nos réalisations les plus récentes."
        backgroundImages={headerBackgrounds.portfolio}
        highlightedWord="Portfolio"
        textPosition="center"
        height="md:h-[40vh] h-[50vh]"
      />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
