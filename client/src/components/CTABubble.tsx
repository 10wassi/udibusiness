import  React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface CTABubbleProps {
  interval?: number; // Intervalle d'apparition en millisecondes
}

const CTABubble: React.FC<CTABubbleProps> = ({ interval = 15000 }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    {
      title: "Automatisez votre service client",
      content: "Votre assistant virtuel travaille 24/7, laissez-le gérer les demandes courantes",
      cta: "Découvrir",
      link: "/ServiceAutomation"
    },
    {
      title: "Gagnez 70h par mois",
      content: "Nos clients économisent en moyenne 70 heures mensuelles grâce à l'automatisation",
      cta: "Comment ça marche",
      link: "/ValueProposition/TimeAndMoneySaving"
    },
    {
      title: "L'automatisation WhatsApp",
      content: "Gérez vos conversations clients instantanément, même pendant votre sommeil",
      cta: "Voir la démo",
      link: "/ValueProposition/WhatsAppAutomation"
    }
  ];
  
  // Changer de message à chaque affichage
  useEffect(() => {
    if (visible) {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }
  }, [visible]);
  
  // Émettre un événement personnalisé quand la visibilité change
  useEffect(() => {
    // Créer et dispatcher un événement personnalisé
    const event = new CustomEvent('ctaBubbleVisibilityChange', {
      detail: { isVisible: visible }
    });
    window.dispatchEvent(event);
  }, [visible]);

  // Gérer les intervalles d'apparition
  useEffect(() => {
    // Ne montrer la bulle que si elle n'a pas été rejetée
    if (!dismissed) {
      // Montrer la bulle initialement après 5 secondes
      const initialTimer = setTimeout(() => {
        setVisible(true);
      }, 5000);
      
      // Configurer l'intervalle régulier
      const regularTimer = setInterval(() => {
        if (!visible) {
          setVisible(true);
        }
      }, interval);
      
      // Configurer le timer pour cacher la bulle
      const hideTimer = interval === Infinity ? null : setInterval(() => {
        if (visible) {
          setVisible(false);
        }
      }, interval - 5000); // Cacher 5 secondes avant la prochaine apparition
      
      return () => {
        clearTimeout(initialTimer);
        clearInterval(regularTimer);
        if (hideTimer) clearInterval(hideTimer);
      };
    }
  }, [interval, visible, dismissed]);
  
  // Réinitialiser le dismissed après un changement de page
  useEffect(() => {
    const handleRouteChange = () => {
      setDismissed(false);
      setVisible(false);
      
      // Montrer à nouveau après un court délai lors du changement de page
      setTimeout(() => {
        if (!dismissed) {
          setVisible(true);
        }
      }, 3000);
    };
    
    // Écouter les changements de route
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [dismissed]);
  
  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    
    // Réactiver après 5 minutes même si dismissé
    setTimeout(() => {
      setDismissed(false);
    }, 300000);
  };
  
  const message = messages[currentMessage];
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-[#FFC000]/30">
            <div className="flex justify-between items-center bg-[#FFC000]/10 px-4 py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#FFC000] flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faRobot} className="text-gray-900" />
                </div>
                <h3 className="font-medium text-white">Assistant UDI-BUSINESS</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </button>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-lg mb-2 text-[#FFC000]">{message.title}</h4>
              <p className="text-gray-300 text-sm mb-4">{message.content}</p>
              
              <Link href={message.link} className="inline-flex items-center bg-[#FFC000] text-gray-900 font-medium text-sm px-4 py-2 rounded-full hover:bg-[#FFD000] transition-colors">
                {message.cta}
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
            
            <div className="px-4 py-2 bg-gray-850 text-center">
              <div className="flex justify-center space-x-1">
                {messages.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMessage ? 'bg-[#FFC000]' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CTABubble;