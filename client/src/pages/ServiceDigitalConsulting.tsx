import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faLightbulb, faLayerGroup, faUsers, faRoute, faRocket, faShieldAlt, faSitemap } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceDigitalConsulting = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Conseil <span className="text-gradient">Digital</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Guidez votre transformation digitale avec notre expertise. Nous vous aidons à définir et mettre en œuvre une stratégie digitale sur mesure pour répondre à vos objectifs d'affaires et créer un avantage concurrentiel.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services de Conseil Digital</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nous vous accompagnons à chaque étape de votre transformation digitale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faRoute} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stratégie Digitale</h3>
              <p className="text-gray-400">
                Définition d'une vision et d'une feuille de route digitale alignées avec vos objectifs d'affaires et adaptées à votre marché.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLightbulb} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation & Disruption</h3>
              <p className="text-gray-400">
                Identification d'opportunités d'innovation et de modèles d'affaires disruptifs pour créer de nouveaux avantages concurrentiels.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faUsers} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expérience Client</h3>
              <p className="text-gray-400">
                Optimisation de l'expérience client à travers tous les points de contact digitaux pour augmenter l'engagement et la fidélité.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faSitemap} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transformation Organisationnelle</h3>
              <p className="text-gray-400">
                Accompagnement au changement pour adapter votre culture, structure et processus aux enjeux du digital.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLayerGroup} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Architecture Digitale</h3>
              <p className="text-gray-400">
                Conception d'une architecture technologique flexible, évolutive et sécurisée pour soutenir votre transformation digitale.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Analytics & Data</h3>
              <p className="text-gray-400">
                Exploitation de vos données pour générer des insights et prendre des décisions éclairées grâce à des tableaux de bord et KPIs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Approach Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Approche</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour vous accompagner vers le succès digital.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-[#0080FF] via-[#FFC000] to-[#0080FF] top-24 left-0 right-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Évaluation",
                  description: "Analyse de votre maturité digitale, de vos besoins et de votre écosystème concurrentiel",
                  icon: faLightbulb,
                  iconBg: "#0080FF",
                  steps: ["Audit digital", "Analyse concurrentielle", "Identification des opportunités"]
                },
                {
                  title: "Stratégie",
                  description: "Définition d'une vision claire et d'une roadmap digitale adaptée à vos objectifs",
                  icon: faRoute,
                  iconBg: "#FFC000",
                  steps: ["Vision et ambition", "Feuille de route", "Priorisation des initiatives"]
                },
                {
                  title: "Implémentation",
                  description: "Mise en œuvre des initiatives prioritaires avec une approche agile et itérative",
                  icon: faRocket,
                  iconBg: "#0080FF",
                  steps: ["MVP et prototypage", "Développement agile", "Tests et optimisation"]
                },
                {
                  title: "Accélération",
                  description: "Mise à l'échelle des succès et optimisation continue de votre transformation",
                  icon: faChartLine,
                  iconBg: "#FFC000",
                  steps: ["Déploiement global", "Mesure des performances", "Amélioration continue"]
                }
              ].map((step, index) => (
                <div key={index} className="feature-card text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 lg:block hidden">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 bg-gray-900`} style={{ borderColor: step.iconBg }}>
                      <FontAwesomeIcon icon={step.icon} className="text-2xl" style={{ color: step.iconBg }} />
                    </div>
                  </div>
                  
                  <div className="lg:mt-16 bg-gray-700 rounded-xl p-8 hover:bg-gray-650 transition-all duration-300">
                    <div className="lg:hidden w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-4" style={{ borderColor: step.iconBg, backgroundColor: "rgba(0,0,0,0.2)" }}>
                      <FontAwesomeIcon icon={step.icon} className="text-2xl" style={{ color: step.iconBg }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 mb-6">{step.description}</p>
                    <ul className="space-y-2 text-left">
                      {step.steps.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-white mr-2">•</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertise Sectorielle</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nous comprenons les spécificités et les enjeux digitaux de votre secteur d'activité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                sector: "Finance & Banque",
                challenges: "Disruption par les FinTech, exigences réglementaires, attentes clients élevées",
                solutions: "Digitalisation des processus, open banking, expérience client omnicanale"
              },
              {
                sector: "Retail & E-commerce",
                challenges: "Concurrence des pure players, expérience omnicanale, logistique du dernier kilomètre",
                solutions: "Stratégie omnicanale, personnalisation, optimisation de la supply chain"
              },
              {
                sector: "Industrie & Manufacturing",
                challenges: "Industrie 4.0, productivité et efficacité, nouveaux modèles d'affaires",
                solutions: "IoT industriel, maintenance prédictive, servitisation"
              },
              {
                sector: "Santé & Pharma",
                challenges: "Contraintes réglementaires, expérience patient, efficience opérationnelle",
                solutions: "Télémédecine, santé connectée, digitalisation des parcours patients"
              },
              {
                sector: "Télécoms & Médias",
                challenges: "Revenus sous pression, nouveaux entrants OTT, monétisation des données",
                solutions: "Nouveaux services à valeur ajoutée, personnalisation, stratégie data"
              },
              {
                sector: "Services Publics",
                challenges: "Attentes citoyennes, contraintes budgétaires, transformation des missions",
                solutions: "E-administration, services centrés utilisateurs, modernisation IT"
              }
            ].map((industry, index) => (
              <div key={index} className="feature-card bg-gray-800 rounded-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-gradient">{industry.sector}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-200">Enjeux :</h4>
                      <p className="text-gray-400">{industry.challenges}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-200">Notre approche :</h4>
                      <p className="text-gray-400">{industry.solutions}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez ce qui distingue notre approche du conseil digital.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Expertise Technique & Business",
                description: "Nous combinons une expertise technique pointue avec une solide compréhension des enjeux business pour des recommandations pertinentes et réalisables.",
                icon: faLightbulb,
                color: "#0080FF"
              },
              {
                title: "Approche Pragmatique",
                description: "Nous privilégions les actions concrètes et rapides qui génèrent de la valeur, plutôt que de longues études théoriques.",
                icon: faRocket,
                color: "#FFC000"
              },
              {
                title: "Focus sur les Résultats",
                description: "Nous nous engageons sur des résultats mesurables et nous concentrons sur l'impact réel de nos recommandations sur votre activité.",
                icon: faChartLine,
                color: "#0080FF"
              },
              {
                title: "Transfert de Compétences",
                description: "Nous formons vos équipes pendant nos missions pour garantir votre autonomie et la pérennité de votre transformation digitale.",
                icon: faUsers,
                color: "#FFC000"
              }
            ].map((advantage, index) => (
              <div key={index} className="feature-card bg-gray-900 rounded-xl p-8 flex items-start hover:bg-gray-850 transition-all duration-300">
                <div className="mr-6">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${advantage.color}20` }}>
                    <FontAwesomeIcon icon={advantage.icon} className="text-2xl" style={{ color: advantage.color }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                  <p className="text-gray-400">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Section - Simplified */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Réussites</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez comment nous avons aidé nos clients à réussir leur transformation digitale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                client: "Grande Banque Française",
                title: "Stratégie d'Open Banking",
                description: "Définition et implémentation d'une stratégie d'open banking ayant permis le lancement de 5 nouvelles offres digitales en 18 mois.",
                results: "35% d'augmentation de l'acquisition client digital, 20% de revenus additionnels"
              },
              {
                client: "Retailer International",
                title: "Transformation Omnicanale",
                description: "Refonte de l'expérience client omnicanale pour unifier parcours physiques et digitaux.",
                results: "45% d'augmentation du taux de conversion, +28% de chiffre d'affaires digital"
              },
              {
                client: "Industriel Manufacturier",
                title: "Programme Industrie 4.0",
                description: "Conception et déploiement d'un programme de transformation vers l'Industrie 4.0 incluant IoT, IA et automatisation.",
                results: "Réduction de 23% des coûts de maintenance, +15% de productivité"
              }
            ].map((case_study, index) => (
              <div key={index} className="feature-card bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-8">
                  <div className="text-sm text-gray-400 mb-2">{case_study.client}</div>
                  <h3 className="text-xl font-bold mb-4 text-gradient">{case_study.title}</h3>
                  <p className="text-gray-300 mb-6">{case_study.description}</p>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="font-medium mb-1 text-white">Résultats :</div>
                    <p className="text-gray-400">{case_study.results}</p>
                  </div>
                </div>
              </div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à accélérer votre transformation digitale ?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Contactez-nous pour un diagnostic digital gratuit et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center bg-gradient-to-r from-[#0080FF] to-[#FFC000] px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Demander un diagnostic gratuit
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceDigitalConsulting;