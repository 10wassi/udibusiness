import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faRobot, faChartLine, faFileAlt, faHandshake, faLightbulb, faCloudUploadAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceAutomation = () => {
  useScrollAnimation();
  
  useEffect(() => {
    // Animation for the header
    gsap.fromTo(
      '#service-header h1',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#service-header',
          start: 'top 80%',
        },
      }
    );
    
    gsap.fromTo(
      '#service-header p',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: '#service-header',
          start: 'top 80%',
        },
      }
    );
    
    // Animation for features
    gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
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
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      {/* Spacer pour la barre de navigation */}
      <div className="h-[70px]"></div>
      
      <section 
        id="service-header" 
        className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFC000]/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFC000]/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FFC000]/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-block px-6 py-2 bg-[#FFC000]/10 rounded-full mb-6 border border-[#FFC000]/30">
              <span className="text-[#FFC000] font-semibold">Notre Service Phare</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">L'Intelligence Artificielle au Service de <span className="text-gradient-yellow">l'Automatisation</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Notre nouvelle approche chez UDI-BUSINESS : créer un écosystème où les tâches sont hyper-automatisées, 
              améliorant l'expérience des équipes administratives en Afrique. En tant que pionniers de l'innovation, 
              nous transformons la manière dont les entreprises opèrent sur le continent africain.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="#contact" className="px-6 py-3 bg-[#FFC000] text-gray-900 rounded-full font-semibold hover:shadow-lg transition hover:bg-[#FFD000]">
                Commencer maintenant
              </a>
              <a href="#avantages" className="px-6 py-3 bg-transparent text-white border border-[#FFC000]/50 rounded-full font-semibold hover:bg-[#FFC000]/10 transition">
                Découvrir les avantages
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-r from-[#FFC000]/20 to-transparent p-1 rounded-lg mb-8">
                <div className="border border-[#FFC000]/30 rounded-lg p-8 bg-gray-900">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#FFC000]/20 flex items-center justify-center mr-3 text-[#FFC000]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Notre Mission
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Offrir des solutions d'automatisation intelligentes accessibles à toutes les entreprises africaines, 
                    afin qu'elles puissent optimiser leur communication, améliorer la satisfaction client et booster leur croissance.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#0080FF]/20 to-transparent p-1 rounded-lg">
                <div className="border border-[#0080FF]/30 rounded-lg p-8 bg-gray-900">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#0080FF]/20 flex items-center justify-center mr-3 text-[#0080FF]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Notre Vision
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Devenir le leader de l'automatisation IA en Afrique, en aidant les entreprises locales à se digitaliser de 
                    manière efficace et accessible, tout en améliorant leur compétitivité sur le marché international.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Nos Valeurs</h2>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#FFC000]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Innovation continue</h3>
                  <p className="text-gray-400">Nous croyons en l'innovation constante pour offrir des solutions de pointe à nos clients.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#0080FF]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Accessibilité</h3>
                  <p className="text-gray-400">Nous nous engageons à rendre l'automatisation accessible à tous types d'entreprises, quelle que soit leur taille.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#FFC000]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Satisfaction client</h3>
                  <p className="text-gray-400">Nous plaçons la satisfaction client au cœur de notre activité, en offrant des solutions pratiques et des services sur mesure.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#0080FF]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Éthique et transparence</h3>
                  <p className="text-gray-400">Chaque solution que nous proposons respecte des normes éthiques rigoureuses et une transparence totale envers nos clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Propositions de Valeur Section */}
      <section id="avantages" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Propositions de Valeurs Uniques</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Notre approche de l'automatisation redéfinit le paysage technologique africain.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="feature-card rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#FFC000]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Automatisez votre relation client en un clic</h3>
                </div>
                <p className="text-gray-300 mb-6 pl-16">
                  Boostez votre efficacité avec des agents intelligents sur WhatsApp, Facebook et Email.
                </p>
                <div className="pl-16 flex items-center">
                  <a href="/ValueProposition/WhatsAppAutomation" className="text-[#FFC000] flex items-center text-sm font-medium hover:underline">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="feature-card rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#0080FF]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Solution simple et rapide</h3>
                </div>
                <p className="text-gray-300 mb-6 pl-16">
                  Nos agents autonomes sont prêts à optimiser vos ventes, facturations, services clients, et bien plus encore. Ces assistants intelligents travaillent 24h/24 pour vous.
                </p>
                <div className="pl-16 flex items-center">
                  <a href="/ValueProposition/WhatsAppAutomation" className="text-[#0080FF] flex items-center text-sm font-medium hover:underline">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="feature-card rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#FFC000]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Gain de temps et d'argent</h3>
                </div>
                <p className="text-gray-300 mb-6 pl-16">
                  Ne perdez plus de temps avec des tâches répétitives. Notre solution permet d'automatiser les processus, de réduire les erreurs humaines et d'augmenter vos revenus.
                </p>
                <div className="pl-16 flex items-center">
                  <a href="/ValueProposition/TimeAndMoneySaving" className="text-[#FFC000] flex items-center text-sm font-medium hover:underline">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="feature-card rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#0080FF]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Adapté à vos besoins spécifiques</h3>
                </div>
                <p className="text-gray-300 mb-6 pl-16">
                  Chaque entreprise est unique, c'est pourquoi nos agents sont conçus pour répondre précisément aux besoins de votre secteur (commerce, finance, éducation, etc.).
                </p>
                <div className="pl-16 flex items-center">
                  <a href="/ValueProposition/TimeAndMoneySaving" className="text-[#0080FF] flex items-center text-sm font-medium hover:underline">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="feature-card rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#FFC000]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Accessibilité et flexibilité</h3>
                </div>
                <p className="text-gray-300 mb-6 pl-16">
                  Facile à intégrer sur vos canaux existants (WhatsApp, SMS, email). Pas besoin d'investissements massifs en infrastructure, nous offrons une solution clé en main.
                </p>
                <div className="pl-16 flex items-center">
                  <a href="/ValueProposition/TimeAndMoneySaving" className="text-[#FFC000] flex items-center text-sm font-medium hover:underline">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Solutions d'Automatisation</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Des solutions sur mesure pour automatiser vos processus métiers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-[#0080FF] to-[#0080FF]/70 h-3"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faRobot} className="text-2xl text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4">RPA</h3>
                <p className="text-gray-400 mb-6">
                  Automatisation Robotisée des Processus pour remplacer les tâches manuelles répétitives par des robots logiciels.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Automatisation du traitement des documents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Extraction et saisie de données</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Réconciliation de données entre systèmes</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="feature-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-[#FFC000] to-[#FFC000]/70 h-3"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-[#FFC000]/10 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-[#FFC000]" />
                </div>
                <h3 className="text-xl font-bold mb-4">BPM & Workflows</h3>
                <p className="text-gray-400 mb-6">
                  Gestion et optimisation des processus métier pour améliorer l'efficacité opérationnelle.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#0080FF] mr-2">•</span>
                    <span>Modélisation et optimisation des processus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0080FF] mr-2">•</span>
                    <span>Automatisation des flux de travail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0080FF] mr-2">•</span>
                    <span>Suivi et reporting des KPIs</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="feature-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-[#0080FF] to-[#0080FF]/70 h-3"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="text-2xl text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Intégration Système</h3>
                <p className="text-gray-400 mb-6">
                  Connectez vos applications et systèmes pour un flux de données transparent et efficace.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Développement d'APIs et de middleware</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Intégration ERP, CRM et autres systèmes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Migration et synchronisation de données</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Domaines d'Application</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              L'automatisation peut être appliquée à de nombreux départements et processus de l'entreprise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#0080FF]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCogs} className="text-[#0080FF]" />
                </span>
                Finance & Comptabilité
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Traitement automatisé des factures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Réconciliation bancaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Reporting financier</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Gestion des notes de frais</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#FFC000]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faHandshake} className="text-[#FFC000]" />
                </span>
                Ressources Humaines
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Onboarding des nouveaux employés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Gestion des congés et absences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Traitement de la paie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Analyse des CV et présélection</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#0080FF]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faFileAlt} className="text-[#0080FF]" />
                </span>
                Service Client
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Chatbots et assistants virtuels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Traitement automatisé des demandes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Gestion des tickets et escalades</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Analyse des sentiments clients</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#FFC000]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faTasks} className="text-[#FFC000]" />
                </span>
                Achats & Supply Chain
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Gestion automatisée des commandes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Suivi des livraisons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Gestion des stocks et inventaires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Prévision de la demande</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Partenaires Technologiques</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nous travaillons avec les meilleurs outils et plateformes d'automatisation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12">
            {[
              'UiPath', 'Automation Anywhere', 'BluePrism', 'Microsoft Power Automate',
              'Zapier', 'IFTTT', 'Nintex', 'Pega', 'Appian', 'Camunda',
              'MuleSoft', 'IBM RPA', 'WorkFusion'
            ].map((tech, index) => (
              <div 
                key={index}
                className="feature-card bg-gray-700 rounded-xl p-6 flex items-center justify-center text-center hover:bg-gray-650 transition-all duration-300"
              >
                <span className="font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Méthodologie</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Une approche structurée pour garantir le succès de vos projets d'automatisation.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0080FF] to-[#FFC000] transform -translate-x-1/2"></div>
            
            {[
              {
                title: "Évaluation et Découverte",
                description: "Identification des processus à fort potentiel d'automatisation et analyse ROI.",
                icon: faLightbulb
              },
              {
                title: "Conception et Planification",
                description: "Conception détaillée de la solution et planification de la mise en œuvre.",
                icon: faTasks
              },
              {
                title: "Développement et Test",
                description: "Développement de la solution d'automatisation et tests rigoureux.",
                icon: faCogs
              },
              {
                title: "Déploiement et Formation",
                description: "Mise en production et formation des utilisateurs finaux.",
                icon: faCloudUploadAlt
              },
              {
                title: "Support et Optimisation",
                description: "Support continu et amélioration itérative des processus automatisés.",
                icon: faChartLine
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 p-4">
                  <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 md:mr-8 md:ml-0">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center z-10 border-4 border-gray-700">
                    <FontAwesomeIcon icon={step.icon} className="text-2xl text-[#FFC000]" />
                  </div>
                </div>
                
                <div className="md:w-1/2 p-4 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Avantages Concrets Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#FFC000]/10 rounded-full mb-4 border border-[#FFC000]/30">
              <span className="text-[#FFC000] text-sm font-medium">OPTIMISEZ VOTRE ENTREPRISE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Les avantages de nos solutions</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez comment nos agents intelligents transforment la manière dont les entreprises opèrent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#FFC000]/30 transition duration-300">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#FFC000]/10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Réduction des coûts opérationnels</h3>
              </div>
              <p className="text-gray-300">
                Moins d'employés nécessaires pour gérer les tâches répétitives (vente, facturation, suivi client).
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#0080FF]/30 transition duration-300">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#0080FF]/10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Amélioration de l'expérience client</h3>
              </div>
              <p className="text-gray-300">
                Les clients reçoivent une réponse instantanée, 24h/24, et peuvent résoudre leurs problèmes sans délai.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#FFC000]/30 transition duration-300">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#FFC000]/10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Efficacité accrue</h3>
              </div>
              <p className="text-gray-300">
                Les agents IA gèrent plusieurs tâches simultanément sans fatigue, permettant aux équipes humaines de se concentrer sur des missions à plus forte valeur ajoutée.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#0080FF]/30 transition duration-300">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#0080FF]/10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0080FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Adaptabilité</h3>
              </div>
              <p className="text-gray-300">
                Nos solutions sont modulables en fonction des besoins spécifiques de chaque entreprise (petites, moyennes, ou grandes entreprises).
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#FFC000]/30 transition duration-300">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#FFC000]/10 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Scalabilité</h3>
              </div>
              <p className="text-gray-300">
                Nos agents peuvent facilement évoluer avec l'entreprise, intégrant de nouvelles fonctionnalités sans perturber les opérations existantes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Exemples d'utilisation Section */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#FFC000]/10 rounded-full mb-4 border border-[#FFC000]/30">
              <span className="text-[#FFC000] text-sm font-medium">SECTEURS D'APPLICATION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bénéfices concrets pour les entreprises</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nos solutions d'automatisation s'adaptent à tous les secteurs d'activité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-[#FFC000]">PME commerciales et de distribution</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-300">
                  <span className="text-[#FFC000] mr-2 mt-1">•</span>
                  <span>Automatisation des ventes via WhatsApp</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#FFC000] mr-2 mt-1">•</span>
                  <span>Amélioration du suivi des commandes et livraisons</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#FFC000] mr-2 mt-1">•</span>
                  <span>Meilleur engagement client grâce à des promotions ciblées</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-[#0080FF]">Microfinance, Fintech et institutions financières</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-300">
                  <span className="text-[#0080FF] mr-2 mt-1">•</span>
                  <span>Gestion des demandes de prêts via WhatsApp ou SMS</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#0080FF] mr-2 mt-1">•</span>
                  <span>Relances automatiques pour les paiements</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#0080FF] mr-2 mt-1">•</span>
                  <span>Pré-évaluation des demandes de crédit avec scoring IA</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-[#FFC000]">Agroalimentaire et logistique</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-300">
                  <span className="text-[#FFC000] mr-2 mt-1">•</span>
                  <span>Support client intelligent, capable de répondre à des questions courantes</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#FFC000] mr-2 mt-1">•</span>
                  <span>Suivi automatisé des livraisons et de la chaîne d'approvisionnement</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#FFC000] mr-2 mt-1">•</span>
                  <span>Gestion des commandes et des stocks en temps réel</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-[#0080FF]">Santé et éducation</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-300">
                  <span className="text-[#0080FF] mr-2 mt-1">•</span>
                  <span>Prise de rendez-vous automatisée et rappels</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#0080FF] mr-2 mt-1">•</span>
                  <span>Suivi pédagogique et administratif des étudiants</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <span className="text-[#0080FF] mr-2 mt-1">•</span>
                  <span>Assistance informative 24/7 pour les questions fréquentes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#FFC000]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC000]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-[#FFC000]/10 rounded-full mb-6 border border-[#FFC000]/30">
              <span className="text-[#FFC000] text-sm font-medium">COMMENCEZ DÈS AUJOURD'HUI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à automatiser vos processus ?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Contactez-nous dès aujourd'hui pour une évaluation gratuite de votre potentiel d'automatisation et un calcul de ROI personnalisé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/#contact" 
                className="inline-block bg-[#FFC000] px-8 py-3 rounded-full text-gray-900 font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Demander une évaluation gratuite
              </a>
              <a 
                href="/#portfolio" 
                className="inline-block bg-transparent border border-[#FFC000]/50 px-8 py-3 rounded-full text-white font-semibold hover:bg-[#FFC000]/10 transition"
              >
                Voir nos réalisations
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceAutomation;