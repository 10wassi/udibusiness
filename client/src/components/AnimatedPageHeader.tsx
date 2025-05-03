import  React,{ useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface AnimatedPageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImages: string[];
  highlightedWord?: string;
  height?: string;
  overlayColor?: string;
  textPosition?: "left" | "center" | "right";
  children?: React.ReactNode;
  id?: string;
}

const AnimatedPageHeader = ({
  title,
  subtitle,
  backgroundImages,
  highlightedWord,
  height = "h-[60vh]",
  overlayColor = "from-gray-900/90 to-gray-900/70",
  textPosition = "center",
  children,
  id,
}: AnimatedPageHeaderProps) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const positionClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  useEffect(() => {
    // Animation avec GSAP pour l'entrée des textes
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }
    // Animation pour changer l'image de fond
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Création du titre avec le mot mis en évidence
  const renderTitle = () => {
    if (!highlightedWord || !title.includes(highlightedWord)) {
      return <span>{title}</span>;
    }

    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      // id={id}
      className={`relative ${height} overflow-hidden`}
      ref={headerRef}
    >
      {/* Images de fond qui défilent */}
      {backgroundImages.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: currentBgIndex === index ? 1 : 0,
            scale: currentBgIndex === index ? 1 : 1.1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      ))}

      {/* Overlay pour améliorer la lisibilité du texte */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`}
      ></div>

      {/* Contenu principal */}
      <div
        className={`relative z-10 
          container mx-auto px-4 h-full flex flex-col justify-center 
          ${positionClasses[textPosition]}
          `}
      >
        <div className="max-w-3xl">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            {renderTitle()}
          </h1>

          {subtitle && (
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-200 max-w-2xl"
            >
              {subtitle}
            </p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Élément décoratif en bas */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>

      {/* Effet particules/lignes animées */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[#0080FF] to-transparent"></div>
        <div className="absolute top-0 left-2/4 w-1 h-2/3 bg-gradient-to-b from-[#FFC000] to-transparent"></div>
        <div className="absolute top-1/3 left-3/4 w-1 h-2/3 bg-gradient-to-b from-[#0080FF] to-transparent"></div>

        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0080FF] to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFC000] to-transparent"></div>
      </div>
    </div>
  );
};

export default AnimatedPageHeader;
