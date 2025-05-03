import  React,{ useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery<Project[]>({
    queryKey: [
      "https://udi-business-foji.onrender.com/api/projects",
      activeCategory,
    ],
    queryFn: async ({ queryKey }) => {
      const [_, category] = queryKey;
      const url =
        category === "Tous"
          ? "/api/projects"
          : `/api/projects?category=${encodeURIComponent(category as string)}`;
      const res = await fetch("https://udi-business-foji.onrender.com" + url);
      return res.json();
    },
  });

  const categories = [
    "Tous",
    "Développement",
    "Intelligence Artificielle",
    "Automatisation",
    "Conseil",
  ];

  useEffect(() => {
    refetch();
  }, [activeCategory, refetch]);

  useEffect(() => {
    if (projects.length === 0) return; // Attendez que les projets soient chargés

    gsap.fromTo(
      "#projects-heading *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "#project-categories button",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: "#project-categories",
          start: "top 85%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [projects]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section id="projects" className="py-24 bg-gray-800 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-10 w-60 bg-gray-700 rounded-lg mx-auto mb-4"></div>
            <div className="h-5 w-full max-w-2xl bg-gray-700 rounded-lg mx-auto"></div>
            <div className="w-20 h-1 bg-gray-700 mx-auto mt-6"></div>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-4 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="px-6 py-2 rounded-full bg-gray-700 w-28 h-10"
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="h-60 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-800 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded-lg w-full mb-6"></div>
                  <div className="h-4 bg-gray-800 rounded-lg w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-gray-800 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div id="projects-heading" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Notre <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez quelques-unes de nos réalisations les plus récentes
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0080FF] to-[#FFC000] mx-auto mt-6"></div>
        </div>

        <div
          id="project-categories"
          className="mb-10 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                activeCategory === category
                  ? "bg-[#0080FF] text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-gray-900 rounded-xl overflow-hidden group relative"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-3 py-1 ${
                      project.category === "Intelligence Artificielle" ||
                      project.category === "Conseil"
                        ? "bg-[#FFC000] text-gray-900"
                        : "bg-[#0080FF]"
                    } rounded-full text-xs font-medium`}
                  >
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 group-hover:text-${
                    project.category === "Intelligence Artificielle" ||
                    project.category === "Conseil"
                      ? "[#FFC000]"
                      : "[#0080FF]"
                  } transition duration-300`}
                >
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className={`inline-flex items-center text-${
                    project.category === "Intelligence Artificielle" ||
                    project.category === "Conseil"
                      ? "[#0080FF]"
                      : "[#FFC000]"
                  } hover:text-${
                    project.category === "Intelligence Artificielle" ||
                    project.category === "Conseil"
                      ? "[#FFC000]"
                      : "[#0080FF]"
                  } transition duration-300`}
                >
                  Voir le projet
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-medium hover:shadow-lg transition duration-300 transform hover:scale-105 inline-block"
          >
            Voir tout le portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
