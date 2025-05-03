import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRobot, faServer } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";

export default function NotFound() {
  const errorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation pour le texte d'erreur
    if (textRef.current) {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Animation pour le robot
    if (robotRef.current) {
      gsap.to(robotRef.current, {
        y: -10,
        repeat: -1,
        duration: 1.5,
        yoyo: true,
        ease: "power1.inOut"
      });
      
      gsap.to(robotRef.current, {
        rotation: 5,
        repeat: -1,
        duration: 3,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Animation pour l'arrière-plan
    const errorElement = errorRef.current;
    if (errorElement) {
      gsap.set(errorElement, { backgroundPosition: "0% 0%" });
      gsap.to(errorElement, {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <div 
      ref={errorRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
      style={{ 
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(0, 128, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255, 192, 0, 0.15) 0%, transparent 40%)" 
      }}
    >
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i + 20}
            className="absolute w-2 h-2 rounded-full bg-yellow-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center px-6 max-w-3xl">
        <div ref={robotRef} className="mb-8 text-8xl text-[#FFC000] inline-block">
          <FontAwesomeIcon icon={faRobot} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FFC000]/5 animate-pulse-slow opacity-50"></div>
        </div>
        
        <h1 ref={textRef} className="text-8xl font-bold text-white mb-4">
          <span className="text-gradient">404</span>
        </h1>
        
        <h2 className="text-3xl font-semibold text-white mb-6">
          Page non trouvée
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          L'automatisation que vous recherchez semble avoir pris un autre chemin. Retournons au point de départ.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/">
            <Button size="lg" className="glowing-btn px-8 py-6 rounded-full bg-gradient-to-r from-[#0080FF] to-[#0080FF]/80 text-white font-semibold hover:shadow-lg hover:shadow-[#0080FF]/20 transition duration-300 transform hover:scale-105">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          
          <Link to="/ServiceAutomation">
            <Button variant="outline" size="lg" className="px-8 py-6 rounded-full border-2 border-white/20 hover:border-[#FFC000]/50 text-white font-semibold transition duration-300 hover:bg-white/5">
              <FontAwesomeIcon icon={faServer} className="mr-2" />
              Notre service phare
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Lignes de code numériques en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden opacity-10 z-0">
        <div className="h-full flex">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-xs text-white/50 font-mono px-4">
              {[...Array(40)].map((_, j) => (
                <div key={j} className="my-1">
                  {Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
