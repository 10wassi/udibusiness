import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faServer, faMobileAlt, faDesktop, faDatabase, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceSoftwareDev = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Développement <span className="text-gradient">Logiciel</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous concevons et développons des solutions logicielles sur mesure pour répondre aux besoins spécifiques de votre entreprise. Notre expertise technique combinée à notre approche orientée client garantit des produits performants, évolutifs et faciles à maintenir.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos expertises en développement</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez notre large éventail de compétences techniques pour la réalisation de vos projets de développement logiciel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCode} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Applications Web</h3>
              <p className="text-gray-400">
                Développement d'applications web réactives, performantes et évolutives utilisant les dernières technologies front-end et back-end.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faMobileAlt} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Applications Mobiles</h3>
              <p className="text-gray-400">
                Création d'applications mobiles natives et cross-platform pour iOS et Android, offrant une expérience utilisateur optimale.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faDesktop} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Logiciels de Bureau</h3>
              <p className="text-gray-400">
                Développement d'applications de bureau puissantes et intuitives pour Windows, MacOS et Linux.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCloudDownloadAlt} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Architecture Cloud</h3>
              <p className="text-gray-400">
                Conception et mise en œuvre d'architectures cloud évolutives, sécurisées et rentables sur AWS, Azure ou Google Cloud.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faServer} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">APIs & Microservices</h3>
              <p className="text-gray-400">
                Développement d'APIs RESTful et de microservices pour des architectures distribuées performantes et faciles à maintenir.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faDatabase} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bases de Données</h3>
              <p className="text-gray-400">
                Conception, optimisation et gestion de bases de données relationnelles et NoSQL pour des applications performantes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Stack Technologique</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nous utilisons les technologies les plus performantes et innovantes pour développer vos projets.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">
            {[
              { name: 'JavaScript', color: '#f7df1e' },
              { name: 'TypeScript', color: '#3178c6' },
              { name: 'Python', color: '#3776ab' },
              { name: 'React', color: '#61dafb' },
              { name: 'Vue.js', color: '#42b883' },
              { name: 'Angular', color: '#dd0031' },
              { name: 'Node.js', color: '#339933' },
              { name: 'Express', color: '#000000' },
              { name: 'Django', color: '#092e20' },
              { name: 'Ruby on Rails', color: '#cc0000' },
              { name: 'PHP', color: '#777bb4' },
              { name: 'Laravel', color: '#ff2d20' },
              { name: 'Java', color: '#007396' },
              { name: 'Spring', color: '#6db33f' },
              { name: '.NET', color: '#512bd4' }
            ].map((tech, index) => (
              <div 
                key={index}
                className="feature-card bg-gray-700 rounded-lg p-4 flex items-center justify-center text-center hover:bg-gray-650 transition-all duration-300"
                style={{ borderLeft: `4px solid ${tech.color}` }}
              >
                <span className="font-semibold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus de Développement</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Une méthodologie Agile éprouvée pour des projets livrés dans les délais et le budget.
            </p>
          </div>
          
          <div className="relative mt-20">
            {/* Timeline vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#0080FF] to-[#FFC000]"></div>
            
            {/* Timeline steps */}
            <div className="space-y-24">
              {[
                {
                  title: "Analyse des besoins",
                  description: "Nous travaillons étroitement avec vous pour comprendre vos objectifs, vos défis et vos exigences techniques et fonctionnelles.",
                  icon: faCode,
                  iconColor: "#0080FF"
                },
                {
                  title: "Conception",
                  description: "Nous élaborons l'architecture technique et les maquettes de l'interface utilisateur pour validation avant développement.",
                  icon: faServer,
                  iconColor: "#FFC000"
                },
                {
                  title: "Développement",
                  description: "Notre équipe met en œuvre la solution en utilisant des méthodes Agiles avec des sprints réguliers et des démos pour validation.",
                  icon: faDesktop,
                  iconColor: "#0080FF"
                },
                {
                  title: "Tests et Assurance Qualité",
                  description: "Nous effectuons des tests rigoureux (unitaires, d'intégration, de performance) pour garantir la fiabilité du produit.",
                  icon: faMobileAlt,
                  iconColor: "#FFC000"
                },
                {
                  title: "Déploiement et Maintenance",
                  description: "Après la mise en production, nous assurons un support continu et des mises à jour régulières.",
                  icon: faCloudDownloadAlt,
                  iconColor: "#0080FF"
                }
              ].map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-5/12"></div>
                  
                  {/* Timeline dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-4`} style={{ borderColor: step.iconColor }}>
                      <FontAwesomeIcon icon={step.icon} className="text-xl" style={{ color: step.iconColor }} />
                    </div>
                  </div>
                  
                  {/* Timeline content */}
                  <div className="w-5/12">
                    <div className="feature-card bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#0080FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à concrétiser votre projet ?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins de développement logiciel et obtenir un devis gratuit.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center bg-gradient-to-r from-[#0080FF] to-[#FFC000] px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceSoftwareDev;