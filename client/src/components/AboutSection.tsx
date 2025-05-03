import  React,{ useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ImageAbout from "../assets/others/image_about.jpg";
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
      },
    });

    tl.fromTo(
      "#about-image",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1 }
    );

    tl.fromTo(
      "#about-content > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
      "-=0.5"
    );

    gsap.utils.toArray<HTMLElement>(".about-feature").forEach((feature) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: feature,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="about" className="py-24 bg-gray-900 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div id="about-image" className="relative group">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[#0080FF] to-[#FFC000] opacity-30 blur-xl group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-gray-800 rounded-xl overflow-hidden">
              <img
                // src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                src={ImageAbout}
                alt="UDI Team"
                className="w-full h-auto transform group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div id="about-content">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              À propos de <span className="text-gradient">UDI</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0080FF] to-[#FFC000] mb-8"></div>

            <p className="text-xl text-gray-300 mb-6">
              Chez Unity of Digital Innovation, nous sommes passionnés par la
              technologie et déterminés à créer des solutions qui font la
              différence. Depuis notre création, nous avons développé des
              centaines de projets pour des clients de tous secteurs.
            </p>

            <p className="text-xl text-gray-300 mb-8">
              Notre équipe est composée d'experts en développement, en
              intelligence artificielle, en automatisation et en conseil
              digital, tous partageant la même vision : utiliser la technologie
              pour créer un impact positif.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="about-feature flex items-center">
                <div className="p-3 bg-[#0080FF]/10 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#0080FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Qualité</h3>
                  <p className="text-gray-400">Excellence à chaque étape</p>
                </div>
              </div>

              <div className="about-feature flex items-center">
                <div className="p-3 bg-[#FFC000]/10 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FFC000]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Innovation</h3>
                  <p className="text-gray-400">Toujours à la pointe</p>
                </div>
              </div>

              <div className="about-feature flex items-center">
                <div className="p-3 bg-[#0080FF]/10 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#0080FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Collaboration</h3>
                  <p className="text-gray-400">Partenaires de confiance</p>
                </div>
              </div>

              <div className="about-feature flex items-center">
                <div className="p-3 bg-[#FFC000]/10 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FFC000]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Ponctualité</h3>
                  <p className="text-gray-400">Résultats à l'heure</p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-medium hover:shadow-lg transition duration-300"
            >
              Rencontrez notre équipe
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
    </section>
  );
};

export default AboutSection;
