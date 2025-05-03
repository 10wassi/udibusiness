import  React,{ useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faBrain,
  faCogs,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { type Service } from "@shared/schema";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/services"],
  });

  useEffect(() => {
    if (services.length === 0) return; // Attendez que les services soient chargés

    gsap.fromTo(
      "#services-heading *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [services]);

  // Helper function to get the right icon for each service
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "fa-code":
        return faCode;
      case "fa-brain":
        return faBrain;
      case "fa-cogs":
        return faCogs;
      case "fa-chart-line":
        return faChartLine;
      default:
        return faCode;
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section
        id="services"
        className="py-24 bg-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-10 w-60 bg-gray-700 rounded-lg mx-auto mb-4"></div>
            <div className="h-5 w-full max-w-2xl bg-gray-700 rounded-lg mx-auto"></div>
            <div className="w-20 h-1 bg-gray-700 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative overflow-hidden animate-pulse"
              >
                <div className="p-4 bg-gray-700 rounded-full w-16 h-16 mb-6"></div>
                <div className="h-6 bg-gray-700 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-3/4 mb-6"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="py-24 bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div id="services-heading" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nos <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Des solutions innovantes pour répondre à tous vos besoins numériques
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0080FF] to-[#FFC000] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Service d'automatisation en premier et en pleine largeur */}
          {services
            .filter((service) => service.title.includes("Automatisation"))
            .map((service) => (
              <div
                key={service.id}
                className="service-card md:col-span-12 p-10 
                  bg-gray-800/50 backdrop-blur-sm border border-[#FFC000]/30
                  rounded-xl relative overflow-hidden group z-10"
              >
                <div className="absolute -top-2 left-10 bg-[#FFC000] text-gray-900 px-4 py-1 rounded-b-lg text-sm font-semibold">
                  Service Phare
                </div>

                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#FFC000]/20 to-transparent rounded-bl-full"></div>

                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center md:justify-start">
                    <div className="p-6 bg-[#FFC000]/10 rounded-full w-24 h-24 flex items-center justify-center group-hover:bg-[#FFC000]/20 transition duration-300">
                      <FontAwesomeIcon
                        icon={getIcon(service.icon)}
                        className="text-[#FFC000] text-4xl"
                      />
                    </div>
                  </div>

                  <div className="md:w-3/4 md:pl-6">
                    <h3 className="text-2xl font-bold mb-3 text-[#FFC000] text-center md:text-left">
                      {service.title}
                      <span className="block text-sm font-normal text-gray-400 mt-1">
                        Notre expertise principale - L'intelligence artificielle
                        au service de votre croissance
                      </span>
                    </h3>

                    <p className="text-gray-300 mb-6">{service.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2 bg-[#FFC000]/10 px-3 py-1.5 rounded-full text-sm">
                        <div className="h-2 w-2 rounded-full bg-[#FFC000]"></div>
                        <span>Réduit les tâches administratives</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-[#FFC000]/10 px-3 py-1.5 rounded-full text-sm">
                        <div className="h-2 w-2 rounded-full bg-[#FFC000]"></div>
                        <span>Disponible 24/7</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-[#FFC000]/10 px-3 py-1.5 rounded-full text-sm">
                        <div className="h-2 w-2 rounded-full bg-[#FFC000]"></div>
                        <span>ROI rapide</span>
                      </div>
                    </div>

                    <a
                      href="/ServiceAutomation"
                      className="inline-flex items-center bg-[#FFC000] text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition duration-300 transform hover:scale-105"
                    >
                      Découvrir notre service phare
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
              </div>
            ))}

          {/* Autres services */}
          {services
            .filter((service) => !service.title.includes("Automatisation"))
            .map((service) => (
              <div
                key={service.id}
                className="service-card md:col-span-4 p-8 
                  bg-gray-800/50 backdrop-blur-sm border border-gray-700
                  rounded-xl relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[${service.color === "blue" ? "#0080FF" : "#FFC000"}]/20 to-transparent rounded-bl-full`}
                ></div>

                <div
                  className={`p-4 bg-[${service.color === "blue" ? "#0080FF" : "#FFC000"}]/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[${service.color === "blue" ? "#0080FF" : "#FFC000"}]/20 transition duration-300`}
                >
                  <FontAwesomeIcon
                    icon={getIcon(service.icon)}
                    className={`text-[${service.color === "blue" ? "#0080FF" : "#FFC000"}] text-2xl`}
                  />
                </div>

                <h3 className="text-xl font-bold mb-4">{service.title}</h3>

                <p className="text-gray-300 mb-6">{service.description}</p>

                <a
                  href={
                    service.title.includes("Développement")
                      ? "/ServiceSoftwareDev"
                      : service.title.includes("IA")
                        ? "/ServiceAIBigData"
                        : service.title.includes("Conseil")
                          ? "/ServiceDigitalConsulting"
                          : "#"
                  }
                  className={`inline-flex items-center text-[${service.color === "blue" ? "#0080FF" : "#FFC000"}] hover:text-[${service.color === "blue" ? "#FFC000" : "#0080FF"}] transition duration-300`}
                >
                  En savoir plus
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
            ))}
        </div>
      </div>

      {/* 3D floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#0080FF]/10 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#FFC000]/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  );
};

export default ServicesSection;
