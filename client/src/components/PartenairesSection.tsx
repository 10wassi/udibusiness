import  React,{ useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Partenaires } from "@shared/schema";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PartenairesSection = () => {
  const { data: partenaires = [], isLoading } = useQuery<Partenaires[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/partenaires"],
  });

  useEffect(() => {
    if (partenaires.length === 0) return; // Attendez que les partenaires soient chargés

    gsap.fromTo(
      "#partenaires-heading *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: "#partenaires",
          start: "top 80%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".partenaire-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, [partenaires]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section
        id="partenaires"
        className="py-24 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0080FF] rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-[#FFC000] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-[#0080FF]/50 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-10 w-60 bg-gray-700 rounded-lg mx-auto mb-4"></div>
            <div className="h-5 w-full max-w-2xl bg-gray-700 rounded-lg mx-auto"></div>
            <div className="w-20 h-1 bg-gray-700 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-3/4 mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-700 rounded-lg w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded-lg w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="partenaires"
      className="py-24 bg-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0080FF] rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-60 h-60 bg-[#FFC000] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-[#0080FF]/50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div id="partenaires-heading" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nos <span className="text-gradient">Partenaires</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-[#0080FF] to-[#FFC000] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partenaires.map((partenaire, index) => (
            <div
              key={partenaire.id}
              className="partenaire-card bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 relative"
            >
              <a
                href={partenaire.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center text-center"
              >
                <img
                  src={partenaire.logo}
                  alt={partenaire.name}
                  className="w-24 h-24 rounded-full"
                />
                <h4 className="font-bold">{partenaire.name}</h4>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartenairesSection;
