import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMoneyBillWave, faClock, faChartLine, faExchangeAlt, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'wouter';

gsap.registerPlugin(ScrollTrigger);

const TimeAndMoneySaving = () => {
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
    );

    // Animate statistics
    gsap.utils.toArray<HTMLElement>('.stat-item').forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });

    // Animate the comparison
    gsap.fromTo(
      '.comparison-left',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.comparison-section',
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(
      '.comparison-right',
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.comparison-section',
          start: 'top 75%',
        }
      }
    );
    
    // Animate testimonial slides
    gsap.utils.toArray<HTMLElement>('.testimonial-slide').forEach((slide, i) => {
      gsap.fromTo(
        slide,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: slide,
            start: 'top 80%',
          }
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/ServiceAutomation" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>Retour au service d'automatisation</span>
          </Link>
          
          <div className="bg-[#FFC000]/10 inline-block px-4 py-1 rounded-full mb-4">
            <span className="text-[#FFC000] font-medium text-sm">UDI-BUSINESS Automation</span>
          </div>
          
          <h1 id="value-title" className="text-4xl md:text-5xl font-bold mb-4">
            Gain de temps et <span className="text-[#FFC000]">d'argent</span> considérable
          </h1>
          
          <h2 id="value-subtitle" className="text-xl md:text-2xl text-gray-300 font-medium mb-6">
            Réduisez vos coûts opérationnels et augmentez votre productivité avec l'automatisation
          </h2>
          
          <p id="value-desc" className="text-gray-400 max-w-3xl mb-12">
            L'automatisation intelligente proposée par UDI-BUSINESS permet d'éliminer les tâches répétitives, 
            d'optimiser les processus métier et de rediriger vos ressources vers des activités à plus forte valeur ajoutée.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="stat-item rounded-xl overflow-hidden bg-gray-800 border border-[#FFC000]/20 p-6 text-center">
                  <div className="text-[#FFC000] text-4xl font-bold mb-2 animate-pulse-glow">-70%</div>
                  <div className="text-gray-300">Temps traitement</div>
                </div>
                <div className="stat-item rounded-xl overflow-hidden bg-gray-800 border border-[#FFC000]/20 p-6 text-center">
                  <div className="text-[#FFC000] text-4xl font-bold mb-2 animate-pulse-glow">+35%</div>
                  <div className="text-gray-300">Productivité</div>
                </div>
                <div className="stat-item rounded-xl overflow-hidden bg-gray-800 border border-[#FFC000]/20 p-6 text-center">
                  <div className="text-[#FFC000] text-4xl font-bold mb-2 animate-pulse-glow">-45%</div>
                  <div className="text-gray-300">Coûts opérationnels</div>
                </div>
                <div className="stat-item rounded-xl overflow-hidden bg-gray-800 border border-[#FFC000]/20 p-6 text-center">
                  <div className="text-[#FFC000] text-4xl font-bold mb-2 animate-pulse-glow">ROI</div>
                  <div className="text-gray-300">en 3-6 mois</div>
                </div>
              </div>
              
              <motion.div
                className="bg-gradient-to-br from-[#FFC000]/20 to-transparent p-1 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#FFC000] mr-3" />
                    <span>Le saviez-vous?</span>
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Une entreprise moyenne passe <span className="text-[#FFC000] font-semibold">plus de 20 heures par semaine</span> sur des 
                    tâches administratives répétitives qui pourraient être facilement automatisées.
                  </p>
                  <p className="text-gray-300">
                    Cela représente plus de <span className="text-[#FFC000] font-semibold">1000 heures par an</span> qui pourraient être consacrées 
                    au développement commercial et à l'innovation.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC000]/20 via-[#FFC000]/10 to-transparent rounded-3xl blur-2xl"></div>
              
              <div className="relative rounded-xl overflow-hidden">
                <div className="aspect-w-4 aspect-h-3 w-full">
                  <motion.svg 
                    viewBox="0 0 500 375" 
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Graphique sur fond sombre */}
                    <rect x="0" y="0" width="500" height="375" fill="#1e293b" />
                    
                    {/* Lignes de grille */}
                    <line x1="50" y1="50" x2="50" y2="325" stroke="#334155" strokeWidth="1" />
                    <line x1="125" y1="50" x2="125" y2="325" stroke="#334155" strokeWidth="1" />
                    <line x1="200" y1="50" x2="200" y2="325" stroke="#334155" strokeWidth="1" />
                    <line x1="275" y1="50" x2="275" y2="325" stroke="#334155" strokeWidth="1" />
                    <line x1="350" y1="50" x2="350" y2="325" stroke="#334155" strokeWidth="1" />
                    <line x1="425" y1="50" x2="425" y2="325" stroke="#334155" strokeWidth="1" />
                    
                    <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="105" x2="450" y2="105" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="160" x2="450" y2="160" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="215" x2="450" y2="215" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="270" x2="450" y2="270" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="325" x2="450" y2="325" stroke="#334155" strokeWidth="1" />
                    
                    {/* Axe des X */}
                    <line x1="50" y1="325" x2="450" y2="325" stroke="#94a3b8" strokeWidth="2" />
                    <text x="50" y="345" fill="#94a3b8" fontSize="12" textAnchor="middle">Jan</text>
                    <text x="125" y="345" fill="#94a3b8" fontSize="12" textAnchor="middle">Fév</text>
                    <text x="200" y="345" fill="#94a3b8" fontSize="12" textAnchor="middle">Mar</text>
                    <text x="275" y="345" fill="#94a3b8" fontSize="12" textAnchor="middle">Avr</text>
                    <text x="350" y="345" fill="#94a3b8" fontSize="12" textAnchor="middle">Mai</text>
                    <text x="425" y="345" fill="#94a3b8" fontSize="12" textAnchor="middle">Juin</text>
                    
                    {/* Axe des Y */}
                    <line x1="50" y1="50" x2="50" y2="325" stroke="#94a3b8" strokeWidth="2" />
                    <text x="40" y="325" fill="#94a3b8" fontSize="12" textAnchor="end">0</text>
                    <text x="40" y="270" fill="#94a3b8" fontSize="12" textAnchor="end">20</text>
                    <text x="40" y="215" fill="#94a3b8" fontSize="12" textAnchor="end">40</text>
                    <text x="40" y="160" fill="#94a3b8" fontSize="12" textAnchor="end">60</text>
                    <text x="40" y="105" fill="#94a3b8" fontSize="12" textAnchor="end">80</text>
                    <text x="40" y="50" fill="#94a3b8" fontSize="12" textAnchor="end">100</text>
                    
                    {/* Ligne de coûts sans automatisation (rouge) */}
                    <path 
                      d="M50,160 L125,175 L200,185 L275,200 L350,215 L425,245" 
                      stroke="#ef4444" 
                      strokeWidth="3" 
                      fill="none"
                      className="animate-draw"
                    />
                    
                    {/* Points sur la ligne rouge */}
                    <circle cx="50" cy="160" r="5" fill="#ef4444" />
                    <circle cx="125" cy="175" r="5" fill="#ef4444" />
                    <circle cx="200" cy="185" r="5" fill="#ef4444" />
                    <circle cx="275" cy="200" r="5" fill="#ef4444" />
                    <circle cx="350" cy="215" r="5" fill="#ef4444" />
                    <circle cx="425" cy="245" r="5" fill="#ef4444" />
                    
                    {/* Ligne de coûts avec automatisation (vert) */}
                    <path 
                      d="M50,160 L125,145 L200,120 L275,95 L350,80 L425,70" 
                      stroke="#FFC000" 
                      strokeWidth="3" 
                      fill="none" 
                      className="animate-draw"
                    />
                    
                    {/* Points sur la ligne verte */}
                    <circle cx="50" cy="160" r="5" fill="#FFC000" />
                    <circle cx="125" cy="145" r="5" fill="#FFC000" />
                    <circle cx="200" cy="120" r="5" fill="#FFC000" />
                    <circle cx="275" cy="95" r="5" fill="#FFC000" />
                    <circle cx="350" cy="80" r="5" fill="#FFC000" />
                    <circle cx="425" cy="70" r="5" fill="#FFC000" />
                    
                    {/* Légende */}
                    <rect x="295" y="20" width="15" height="3" fill="#ef4444" />
                    <text x="315" y="23" fill="#ef4444" fontSize="12">Sans automatisation</text>
                    
                    <rect x="295" y="35" width="15" height="3" fill="#FFC000" />
                    <text x="315" y="38" fill="#FFC000" fontSize="12">Avec automatisation</text>
                    
                    {/* Titre */}
                    <text x="50" y="25" fill="white" fontSize="14" fontWeight="bold">Évolution des coûts opérationnels</text>
                  </motion.svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section className="comparison-section py-16 md:py-24 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Avant vs Après l'Automatisation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="comparison-left p-8 bg-gray-900 rounded-xl border border-red-500/20 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 py-2 rounded-full border border-red-500/30">
                <span className="text-red-500 font-semibold">AVANT</span>
              </div>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">✕</span>
                  <span className="text-gray-300">Temps de traitement des demandes clients : <span className="text-red-400 font-semibold">48-72 heures</span></span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">✕</span>
                  <span className="text-gray-300">3-4 employés à temps plein dédiés aux tâches administratives répétitives</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">✕</span>
                  <span className="text-gray-300">Taux d'erreur dans les processus manuels : <span className="text-red-400 font-semibold">15-20%</span></span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">✕</span>
                  <span className="text-gray-300">Disponibilité limitée (heures de bureau seulement)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">✕</span>
                  <span className="text-gray-300">Coût mensuel : <span className="text-red-400 font-semibold">10 000€ - 15 000€</span></span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 text-red-500 flex-shrink-0">✕</span>
                  <span className="text-gray-300">Satisfaction client moyenne : <span className="text-red-400 font-semibold">65%</span></span>
                </li>
              </ul>
            </div>
            
            <div className="comparison-right p-8 bg-gray-900 rounded-xl border border-[#FFC000]/20 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 py-2 rounded-full border border-[#FFC000]/30">
                <span className="text-[#FFC000] font-semibold">APRÈS</span>
              </div>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FFC000]/10 flex items-center justify-center mr-3 text-[#FFC000] flex-shrink-0">✓</span>
                  <span className="text-gray-300">Temps de traitement des demandes clients : <span className="text-[#FFC000] font-semibold">Instantané à 4 heures</span></span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FFC000]/10 flex items-center justify-center mr-3 text-[#FFC000] flex-shrink-0">✓</span>
                  <span className="text-gray-300">Personnel réaffecté à des tâches stratégiques à forte valeur ajoutée</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FFC000]/10 flex items-center justify-center mr-3 text-[#FFC000] flex-shrink-0">✓</span>
                  <span className="text-gray-300">Taux d'erreur dans les processus : <span className="text-[#FFC000] font-semibold">moins de 1%</span></span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FFC000]/10 flex items-center justify-center mr-3 text-[#FFC000] flex-shrink-0">✓</span>
                  <span className="text-gray-300">Disponibilité <span className="text-[#FFC000] font-semibold">24/7</span>, 365 jours par an</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FFC000]/10 flex items-center justify-center mr-3 text-[#FFC000] flex-shrink-0">✓</span>
                  <span className="text-gray-300">Coût mensuel : <span className="text-[#FFC000] font-semibold">3 000€ - 5 000€</span></span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FFC000]/10 flex items-center justify-center mr-3 text-[#FFC000] flex-shrink-0">✓</span>
                  <span className="text-gray-300">Satisfaction client : <span className="text-[#FFC000] font-semibold">92%</span></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-gray-800 px-6 py-3 rounded-xl border border-[#FFC000]/30 mb-6">
              <div className="text-3xl font-bold text-[#FFC000]">
                Économie annuelle estimée : 70 000€ - 120 000€
              </div>
            </div>
            <p className="text-gray-400">
              Ces chiffres varient selon la taille de votre entreprise et la complexité de vos processus. 
              Contactez-nous pour une estimation personnalisée basée sur votre situation spécifique.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Témoignages de nos clients</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
            Découvrez comment nos solutions d'automatisation ont transformé les activités de nos clients
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-slide bg-gray-800 rounded-xl p-6 shadow-lg border border-[#FFC000]/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FFC000]/10 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faUserTie} className="text-[#FFC000]" />
                </div>
                <div>
                  <h3 className="font-semibold">Marc Dupont</h3>
                  <p className="text-gray-400 text-sm">Directeur Financier, FinTech SA</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Depuis l'implémentation des solutions d'automatisation d'UDI-BUSINESS, notre département comptable a 
                réduit le temps de traitement des factures de 80%. Notre ROI a été atteint en seulement 4 mois."
              </p>
              <div className="flex">
                <span className="text-[#FFC000]">★★★★★</span>
              </div>
            </div>
            
            <div className="testimonial-slide bg-gray-800 rounded-xl p-6 shadow-lg border border-[#FFC000]/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FFC000]/10 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faUserTie} className="text-[#FFC000]" />
                </div>
                <div>
                  <h3 className="font-semibold">Sophie Leclerc</h3>
                  <p className="text-gray-400 text-sm">Responsable RH, MedGroup</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "L'automatisation de nos processus RH nous a permis d'économiser plus de 45 heures par semaine. Notre équipe 
                peut désormais se concentrer sur le développement des talents plutôt que sur la paperasse."
              </p>
              <div className="flex">
                <span className="text-[#FFC000]">★★★★★</span>
              </div>
            </div>
            
            <div className="testimonial-slide bg-gray-800 rounded-xl p-6 shadow-lg border border-[#FFC000]/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FFC000]/10 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faUserTie} className="text-[#FFC000]" />
                </div>
                <div>
                  <h3 className="font-semibold">Jean-Paul Mercier</h3>
                  <p className="text-gray-400 text-sm">PDG, E-Commerce Plus</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Grâce à l'automatisation de notre service client via WhatsApp, nous avons augmenté notre chiffre d'affaires de 
                25% tout en réduisant nos coûts opérationnels de 40%. Un investissement qui s'est avéré indispensable."
              </p>
              <div className="flex">
                <span className="text-[#FFC000]">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FFC000]/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à réduire vos coûts et à gagner du temps ?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contactez-nous aujourd'hui pour une analyse personnalisée de vos processus et découvrez comment 
              notre solution d'automatisation peut transformer votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-[#FFC000] text-gray-900 font-semibold rounded-full shadow-lg shadow-[#FFC000]/20 hover:shadow-[#FFC000]/40 transition"
              >
                Demander une analyse gratuite
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

export default TimeAndMoneySaving;