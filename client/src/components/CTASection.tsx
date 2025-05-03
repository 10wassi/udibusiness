import  React,{ useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 80%',
      },
    });

    tl.fromTo(
      '#cta-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    tl.fromTo(
      '#cta-buttons a',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
      '-=0.4'
    );
  }, []);

  return (
    <section id="cta-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0080FF]/20 to-[#FFC000]/20"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gray-900/90 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl border border-white/10 relative">
          {/* Badge spécial */}
          <div className="absolute -top-5 right-10 bg-[#FFC000] text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg transform rotate-2 z-20">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Automatisez votre entreprise</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div id="cta-content" className="mb-8 lg:mb-0 lg:mr-8 lg:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à <span className="text-[#FFC000]">transformer</span> vos processus métier ?
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Découvrez comment notre solution d'Automatisation IA peut éliminer les tâches répétitives, réduire les coûts et améliorer l'expérience client.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-full text-sm">
                  <div className="h-2 w-2 rounded-full bg-[#FFC000]"></div>
                  <span>Économisez 40-75% de temps</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-full text-sm">
                  <div className="h-2 w-2 rounded-full bg-[#FFC000]"></div>
                  <span>Disponible 24/7</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 rounded-full text-sm">
                  <div className="h-2 w-2 rounded-full bg-[#FFC000]"></div>
                  <span>ROI rapide</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/5 bg-gray-800/50 p-6 rounded-xl border border-[#FFC000]/20">
              <h3 className="text-xl font-bold mb-4 text-[#FFC000]">Service Phare : Automatisation</h3>
              <p className="text-gray-300 mb-6">
                Notre nouvelle approche utilise l'IA pour automatiser vos tâches administratives et optimiser votre communication client.
              </p>
              <div id="cta-buttons" className="flex flex-col space-y-3">
                <a 
                  href="/ServiceAutomation" 
                  className="px-6 py-3 text-sm bg-[#FFC000] text-gray-900 rounded-full font-semibold text-center shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <span>Découvrir notre solution d'Automatisation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 text-sm rounded-full border border-[#FFC000]/30 hover:bg-[#FFC000]/10 text-white font-semibold text-center transition duration-300"
                >
                  Contactez-nous pour un devis
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
