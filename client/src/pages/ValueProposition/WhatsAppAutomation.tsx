import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRobot, faComment, faChartLine, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'wouter';
import AutomationPlatformsDemo from "../../components/AutomationPlatformsDemo";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppAutomation = () => {
  useEffect(() => {
    // Animation for the header
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#value-header',
        start: 'top 80%',
      }
    });

    tl.fromTo(
      '#value-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      '#value-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      '#value-desc',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      '.chat-bubble',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Animate feature cards
    gsap.utils.toArray<HTMLElement>('.feature-item').forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });

    // Animate use case items
    gsap.utils.toArray<HTMLElement>('.use-case').forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Spacer pour la barre de navigation */}
      <div className="h-[70px]"></div>
      
      {/* Header Section */}
      <section id="value-header" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/ServiceAutomation" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>Retour au service d'automatisation</span>
          </Link>
          
          <div className="bg-[#25D366]/10 inline-block px-4 py-1 rounded-full mb-4">
            <span className="text-[#25D366] font-medium text-sm">WhatsApp Business Automation</span>
          </div>
          
          <h1 id="value-title" className="text-4xl md:text-5xl font-bold mb-4">
            Automatisez votre relation client <span className="text-[#25D366]">en un clic</span>
          </h1>
          
          <h2 id="value-subtitle" className="text-xl md:text-2xl text-gray-300 font-medium mb-6">
            Augmentez votre réactivité et offrez une expérience client exceptionnelle 24/7
          </h2>
          
          <p id="value-desc" className="text-gray-400 max-w-3xl mb-12">
            Notre solution d'automatisation WhatsApp transforme votre relation client en permettant des interactions 
            instantanées, personnalisées et intelligentes, tout en réduisant considérablement votre charge de travail.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 max-w-xl">
              <div className="bg-[#111827]/80 p-6 rounded-lg border border-[#25D366]/20 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FontAwesomeIcon icon={faRobot} className="text-[#25D366] mr-3" />
                  <span>Comment ça fonctionne</span>
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">1</span>
                    <span>Nous configurons un assistant virtuel intelligent sur votre compte WhatsApp Business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">2</span>
                    <span>L'assistant est formé pour comprendre les questions et demandes spécifiques à votre secteur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">3</span>
                    <span>Vos clients reçoivent des réponses instantanées et pertinentes 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">4</span>
                    <span>Pour les demandes complexes, l'assistant transfère intelligemment à un agent humain</span>
                  </li>
                </ul>
              </div>
              
              <motion.div 
                className="p-5 rounded-lg border border-[#25D366]/20 bg-gradient-to-b from-[#25D366]/10 to-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">Résultats attendus</h3>
                  <span className="text-[#25D366] text-sm">CLIENT SUCCESS</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-[#25D366] text-2xl font-bold">+65%</div>
                    <div className="text-gray-400 text-sm">Taux de réponse</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#25D366] text-2xl font-bold">-40%</div>
                    <div className="text-gray-400 text-sm">Charge de travail</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#25D366] text-2xl font-bold">24/7</div>
                    <div className="text-gray-400 text-sm">Disponibilité</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#25D366] text-2xl font-bold">+80%</div>
                    <div className="text-gray-400 text-sm">Satisfaction client</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366]/20 via-[#25D366]/10 to-transparent rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-gray-800/80 rounded-2xl p-5 border border-gray-700/50 shadow-xl max-w-md mx-auto">
                <div className="flex items-center pb-3 border-b border-gray-700/50 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <div className="text-gray-400 text-sm ml-2">WhatsApp Business</div>
                </div>
                
                <div className="space-y-3">
                  <div className="chat-bubble self-start bg-gray-700 rounded-lg rounded-bl-none px-4 py-3 max-w-[80%] ml-2 relative">
                    <p className="text-white text-sm">Bonjour, j'aimerais obtenir des informations sur vos services de consulting.</p>
                    <span className="text-xs text-gray-400 mt-1 block">10:31</span>
                    <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 rotate-45 w-3 h-3 bg-gray-700"></div>
                  </div>
                  
                  <div className="chat-bubble self-end bg-[#25D366] rounded-lg rounded-br-none px-4 py-3 max-w-[80%] mr-2 ml-auto relative">
                    <p className="text-white text-sm">Bonjour ! Je suis l'assistant virtuel d'UDI-BUSINESS. Ravi de vous aider aujourd'hui.</p>
                    <p className="text-white text-sm mt-2">Nous proposons plusieurs services de consulting. Pouvez-vous préciser quel domaine vous intéresse ?</p>
                    <ol className="text-white text-sm mt-2 space-y-1">
                      <li>1. Transformation digitale</li>
                      <li>2. Optimisation des processus</li>
                      <li>3. Stratégie technologique</li>
                    </ol>
                    <span className="text-xs text-white/70 mt-1 block">10:31</span>
                    <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 rotate-45 w-3 h-3 bg-[#25D366]"></div>
                  </div>
                  
                  <div className="chat-bubble self-start bg-gray-700 rounded-lg rounded-bl-none px-4 py-3 max-w-[80%] ml-2 relative">
                    <p className="text-white text-sm">Je suis intéressé par l'option 2 - Optimisation des processus.</p>
                    <span className="text-xs text-gray-400 mt-1 block">10:32</span>
                    <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 rotate-45 w-3 h-3 bg-gray-700"></div>
                  </div>
                  
                  <div className="chat-bubble self-end bg-[#25D366] rounded-lg rounded-br-none px-4 py-3 max-w-[80%] mr-2 ml-auto relative">
                    <p className="text-white text-sm">Excellent choix ! Notre service d'optimisation des processus aide les entreprises à identifier les inefficacités et à mettre en place des solutions automatisées.</p>
                    <p className="text-white text-sm mt-2">Souhaitez-vous recevoir notre brochure détaillée ou programmer un appel avec l'un de nos consultants ?</p>
                    <span className="text-xs text-white/70 mt-1 block">10:32</span>
                    <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 rotate-45 w-3 h-3 bg-[#25D366]"></div>
                  </div>
                  
                  <div className="text-center">
                    <span className="inline-block animate-typing w-8 h-5 bg-[#25D366] rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Multi-Platform Demo Section */}
      <section className="py-16 bg-gray-850">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre solution fonctionne sur toutes les plateformes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Notre technologie d'automatisation ne se limite pas à WhatsApp. Intégrez-la avec tous vos canaux de communication pour offrir une expérience client cohérente et efficace.
            </p>
          </div>
          
          <div className="relative p-4 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/30 shadow-xl mx-auto max-w-4xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {/* Cercles décoratifs */}
              <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-2xl"></div>
              <div className="absolute top-[30%] right-[-15%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-2xl"></div>
              <div className="absolute bottom-[-20%] left-[10%] w-[35%] h-[35%] rounded-full bg-blue-600/5 blur-3xl"></div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Multi-Plateforme</h3>
              <p className="text-gray-400 max-w-xl mx-auto mb-4">
                Notre solution d'automatisation fonctionne sur toutes vos plateformes de communication. Centralisez tous vos canaux et offrez une expérience client cohérente.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div className="order-2 md:order-1">
                <div className="space-y-4">
                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="flex items-center text-lg font-medium mb-2">
                      <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <FontAwesomeIcon icon={faRobot} className="text-blue-400" />
                      </span>
                      Communication unifiée
                    </h4>
                    <p className="text-gray-400 pl-11">
                      Gérez WhatsApp, Email, SMS, Messenger, Telegram et LinkedIn depuis une seule interface, avec des automatisations personnalisées pour chaque canal.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="flex items-center text-lg font-medium mb-2">
                      <span className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                        <FontAwesomeIcon icon={faComment} className="text-yellow-400" />
                      </span>
                      Synchronisation en temps réel
                    </h4>
                    <p className="text-gray-400 pl-11">
                      Les conversations sont synchronisées en temps réel entre toutes les plateformes, permettant une transition fluide d'un canal à l'autre.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="transform md:rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl"
                >
                  <AutomationPlatformsDemo 
                    initialPlatform="whatsapp" 
                    autoRotate={true} 
                    interval={4000} 
                    width="w-full max-w-sm mx-auto" 
                    height="h-[450px]"
                    className="shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Fonctionnalités principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-item p-6 bg-gray-900 rounded-xl border border-[#25D366]/20 shadow-lg transition duration-300 hover:shadow-[#25D366]/20 hover:border-[#25D366]/50">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faRobot} className="text-[#25D366] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assistant IA intelligent</h3>
              <p className="text-gray-400">Algorithmes d'IA avancés qui comprennent le langage naturel et apprennent des interactions passées.</p>
            </div>
            
            <div className="feature-item p-6 bg-gray-900 rounded-xl border border-[#25D366]/20 shadow-lg transition duration-300 hover:shadow-[#25D366]/20 hover:border-[#25D366]/50">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faComment} className="text-[#25D366] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Réponses personnalisées</h3>
              <p className="text-gray-400">Messages adaptés à chaque client et au contexte de la conversation pour une expérience plus humaine.</p>
            </div>
            
            <div className="feature-item p-6 bg-gray-900 rounded-xl border border-[#25D366]/20 shadow-lg transition duration-300 hover:shadow-[#25D366]/20 hover:border-[#25D366]/50">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faChartLine} className="text-[#25D366] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyses détaillées</h3>
              <p className="text-gray-400">Tableau de bord complet pour suivre les performances, identifier les tendances et optimiser vos réponses.</p>
            </div>
            
            <div className="feature-item p-6 bg-gray-900 rounded-xl border border-[#25D366]/20 shadow-lg transition duration-300 hover:shadow-[#25D366]/20 hover:border-[#25D366]/50">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-[#25D366] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transfert intelligent</h3>
              <p className="text-gray-400">Détection automatique des demandes complexes avec transfert vers vos agents humains au moment opportun.</p>
            </div>
            
            <div className="feature-item p-6 bg-gray-900 rounded-xl border border-[#25D366]/20 shadow-lg transition duration-300 hover:shadow-[#25D366]/20 hover:border-[#25D366]/50">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faLightbulb} className="text-[#25D366] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scénarios personnalisables</h3>
              <p className="text-gray-400">Créez des flux de conversation adaptés à votre secteur d'activité et aux besoins spécifiques de vos clients.</p>
            </div>
            
            <div className="feature-item p-6 bg-gray-900 rounded-xl border border-[#25D366]/20 shadow-lg transition duration-300 hover:shadow-[#25D366]/20 hover:border-[#25D366]/50">
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Intégration complète</h3>
              <p className="text-gray-400">Connectez votre assistant WhatsApp à votre CRM, vos outils de e-commerce ou votre système de gestion pour une automatisation totale.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Cas d'utilisation</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
            Notre solution d'automatisation WhatsApp s'adapte à tous les secteurs d'activité et à diverses utilisations
          </p>
          
          <div className="space-y-16">
            <div className="use-case grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="bg-gradient-to-br from-[#25D366]/20 to-transparent p-1 rounded-xl">
                  <div className="bg-gray-900 rounded-xl p-8 h-full">
                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">E-commerce</h3>
                    <p className="text-gray-400 mb-6">
                      Automatisez les demandes clients concernant les commandes, le suivi des colis et les retours produits.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-5 h-5 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">✓</span>
                        <span className="text-gray-300">Réponses automatiques aux questions fréquentes</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-5 h-5 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">✓</span>
                        <span className="text-gray-300">Notifications de statut de commande</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-5 h-5 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">✓</span>
                        <span className="text-gray-300">Assistance pour les retours et remboursements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 p-6 bg-gray-800/30 rounded-xl border border-gray-700/40">
                <div className="bg-gradient-to-br from-[#25D366]/10 to-transparent rounded-lg p-4">
                  <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-400">Exemple de conversation</span>
                    <span className="text-[#25D366]">WhatsApp Business API</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg rounded-bl-none px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">Bonjour, je n'ai pas encore reçu ma commande #45872. Où en est-elle ?</p>
                    </div>
                    
                    <div className="bg-[#25D366] rounded-lg rounded-br-none px-4 py-3 max-w-[80%] ml-auto">
                      <p className="text-white text-sm">Bonjour ! Je vérifie immédiatement le statut de votre commande #45872.</p>
                      <p className="text-white text-sm mt-2">Votre commande a été expédiée hier et est actuellement en transit. Selon notre transporteur, la livraison est prévue pour demain avant 18h.</p>
                      <p className="text-white text-sm mt-2">Voici le lien de suivi : https://tracking.exemple.com/45872</p>
                      <p className="text-white text-sm mt-2">Souhaitez-vous recevoir des notifications automatiques sur l'avancement de votre livraison ?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="use-case grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 md:order-1 order-2 p-6 bg-gray-800/30 rounded-xl border border-gray-700/40">
                <div className="bg-gradient-to-br from-[#25D366]/10 to-transparent rounded-lg p-4">
                  <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-400">Exemple de conversation</span>
                    <span className="text-[#25D366]">WhatsApp Business API</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg rounded-bl-none px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">Je voudrais prendre rendez-vous avec un conseiller financier cette semaine.</p>
                    </div>
                    
                    <div className="bg-[#25D366] rounded-lg rounded-br-none px-4 py-3 max-w-[80%] ml-auto">
                      <p className="text-white text-sm">Bien sûr, je peux vous aider à planifier un rendez-vous avec l'un de nos conseillers financiers.</p>
                      <p className="text-white text-sm mt-2">Voici les créneaux disponibles cette semaine :</p>
                      <ul className="text-white text-sm mt-1 space-y-1">
                        <li>- Mercredi 15/10 : 10h00, 14h30</li>
                        <li>- Jeudi 16/10 : 11h00, 15h00, 17h30</li>
                        <li>- Vendredi 17/10 : 9h30, 13h00</li>
                      </ul>
                      <p className="text-white text-sm mt-2">Quel créneau vous conviendrait le mieux ?</p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg rounded-bl-none px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">Jeudi à 15h00 me conviendrait parfaitement.</p>
                    </div>
                    
                    <div className="bg-[#25D366] rounded-lg rounded-br-none px-4 py-3 max-w-[80%] ml-auto">
                      <p className="text-white text-sm">Excellent ! J'ai réservé votre rendez-vous pour jeudi 16/10 à 15h00 avec notre conseiller M. Dupont.</p>
                      <p className="text-white text-sm mt-2">Un e-mail de confirmation vient de vous être envoyé avec tous les détails.</p>
                      <p className="text-white text-sm mt-2">Souhaitez-vous recevoir un rappel 24h avant votre rendez-vous ?</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 md:order-2 order-1">
                <div className="bg-gradient-to-br from-[#25D366]/20 to-transparent p-1 rounded-xl">
                  <div className="bg-gray-900 rounded-xl p-8 h-full">
                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Prise de rendez-vous</h3>
                    <p className="text-gray-400 mb-6">
                      Facilitez la prise de rendez-vous pour vos clients et réduisez les absences grâce aux rappels automatiques.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-5 h-5 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">✓</span>
                        <span className="text-gray-300">Gestion intelligente des disponibilités</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-5 h-5 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">✓</span>
                        <span className="text-gray-300">Confirmation automatique</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-5 h-5 bg-[#25D366]/20 rounded-full flex items-center justify-center mr-3 text-[#25D366] flex-shrink-0">✓</span>
                        <span className="text-gray-300">Rappels pour réduire l'absentéisme</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#25D366]/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à révolutionner votre relation client ?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contactez notre équipe dès aujourd'hui pour une démonstration personnalisée et découvrez comment notre solution d'automatisation WhatsApp peut transformer votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-[#25D366] text-white font-semibold rounded-full shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition"
              >
                Demander une démo
              </a>
              <Link
                to="/ServiceAutomation"
                className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-semibold hover:bg-white/5 transition"
              >
                Retour aux services
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WhatsAppAutomation;