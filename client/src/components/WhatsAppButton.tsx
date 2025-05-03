import  React,{ useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface WhatsAppButtonProps {
  phoneNumber: string; // format: international sans +, ex: "33612345678"
  message?: string;
  showWhenCTABubbleHidden?: boolean;
}

const WhatsAppButton = ({ 
  phoneNumber, 
  message = "Bonjour, j'aimerais en savoir plus sur vos services.", 
  showWhenCTABubbleHidden = true 
}: WhatsAppButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCTAVisible, setIsCTAVisible] = useState(false);

  // Fonction pour générer l'URL WhatsApp
  const generateWhatsAppURL = () => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Écoute l'événement personnalisé pour savoir quand la bulle CTA est visible/cachée
  useEffect(() => {
    const handleCTAVisibilityChange = (event: CustomEvent) => {
      setIsCTAVisible(event.detail.isVisible);
      setIsVisible(!event.detail.isVisible && showWhenCTABubbleHidden);
    };

    // Typecasting pour résoudre le problème de TypeScript avec CustomEvent
    window.addEventListener('ctaBubbleVisibilityChange' as any, handleCTAVisibilityChange);

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('ctaBubbleVisibilityChange' as any, handleCTAVisibilityChange);
    };
  }, [showWhenCTABubbleHidden]);

  // Si initialement pas de CTA visible, montrer le bouton WhatsApp
  useEffect(() => {
    if (!isCTAVisible && showWhenCTABubbleHidden) {
      setIsVisible(true);
    }
  }, [isCTAVisible, showWhenCTABubbleHidden]);

  if (!isVisible) return null;

  return (
    <a
      href={generateWhatsAppURL()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
      title="Discuter sur WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
    </a>
  );
};

export default WhatsAppButton;