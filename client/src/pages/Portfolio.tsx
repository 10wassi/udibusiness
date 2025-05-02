import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
import AnimatedPageHeader from "@/components/AnimatedPageHeader";
import { headerBackgrounds } from "@/assets/headers";

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
    // Header animation
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
  
    // Filter buttons animation
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
  
    // Projects animation
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

  // If projects are still loading, show a skeleton loader
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="h-48 bg-gray-700"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-700 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded-lg"></div>
                    <div className="h-4 bg-gray-700 rounded-lg w-1/2"></div>
                  </div>
                </div>
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
      {/* Spacer pour la barre de navigation */}
      <div className="h-[70px]"></div>
      {/* Hero Section */}
      <AnimatedPageHeader
        id="portfolio-header"
        title="Notre Portfolio"
        subtitle="Découvrez nos réalisations les plus récentes et comment nous avons aidé nos clients à atteindre leurs objectifs digitaux. Chaque projet raconte une histoire de transformation et d'innovation."
        backgroundImages={headerBackgrounds.portfolio}
        highlightedWord="Portfolio"
        textPosition="center"
        height="md:h-[40vh] h-[50vh]"
      />

      {/* Filters */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div
            id="category-filters"
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilter(category.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 flex items-center ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-semibold shadow-md"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.icon && (
                  <FontAwesomeIcon icon={category.icon} className="mr-2" />
                )}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">
                Aucun projet dans cette catégorie
              </h3>
              <p className="text-gray-400">
                Veuillez sélectionner une autre catégorie ou revenir plus tard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card bg-gray-800 rounded-xl overflow-hidden group cursor-pointer"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openProjectModal(project)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-[#0080FF]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white text-gray-900 text-sm font-semibold py-2 px-3 rounded-full flex items-center shadow-md">
                        <FontAwesomeIcon icon={faEye} className="mr-1.5" />
                        Voir détails
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.category === "Intelligence Artificielle" ||
                          project.category === "Conseil"
                            ? "bg-[#FFC000] text-gray-900"
                            : "bg-[#0080FF] text-white"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <motion.div
            className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-80 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-gray-900/70 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProject.category === "Intelligence Artificielle" ||
                    selectedProject.category === "Conseil"
                      ? "bg-[#FFC000] text-gray-900"
                      : "bg-[#0080FF] text-white"
                  }`}
                >
                  {selectedProject.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gradient">
                    Description du projet
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gradient">
                    Technologies utilisées
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies &&
                    selectedProject.technologies.length > 0 ? (
                      selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">
                        Information non disponible
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gradient">
                    Résultats clés
                  </h3>
                  {selectedProject.keyResults &&
                  selectedProject.keyResults.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {selectedProject.keyResults.map((result, i) => (
                        <li key={i}>{result}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">Information non disponible</p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-700 flex justify-end">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-[#0080FF] to-[#FFC000] px-5 py-2 text-sm rounded-full text-white font-semibold hover:shadow-lg transition transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faLink} className="mr-1.5" />
                    Visiter le projet
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* CTA Section */}
      <section className="py-24 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#0080FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Nous sommes prêts à transformer vos idées en solutions digitales
              innovantes. Contactez-nous pour discuter de votre prochain projet.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center bg-gradient-to-r from-[#0080FF] to-[#FFC000] px-6 py-3 text-sm md:text-base rounded-full text-white font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Commencer un projet
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
