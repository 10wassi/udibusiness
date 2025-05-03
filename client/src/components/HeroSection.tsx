import  React,{ useEffect, useRef, useState } from 'react';
import ThreeBackground from './ThreeBackground';
import Logo from './logo';
import gsap from 'gsap';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookMessenger, faTelegram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import AutomationPlatformsDemo from './AutomationPlatformsDemo';

const HeroSection = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const automationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP complex animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      '#hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      '#hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      '#hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      '#hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(
      '#hero-logo',
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      "-=1.4"
    )
    .fromTo(
      '#hero-scroll',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power1.inOut" },
      "-=0.4"
    );

    // Chat message animation timeline
    if (messageRef.current && replyRef.current && automationRef.current) {
      const chatTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      chatTl.fromTo(messageRef.current, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(replyRef.current, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 1 }
      )
      .fromTo(automationRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "+=0.5"
      )
      .to([messageRef.current, replyRef.current, automationRef.current], 
        { opacity: 0, duration: 0.5, stagger: 0.1, delay: 2 }
      );
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ThreeBackground />
      <div className="container mx-auto px-4 relative z-10 mt-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
              <span className="text-gradient">UDI-BUSINESS</span>
            </h1>
            <h2 id="hero-subtitle" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              Automatisez votre relation client
            </h2>
            <p id="hero-description" className="text-xl text-gray-300 mb-8 max-w-xl">
              Notre solution phare d'automatisation multiplateforme transforme votre service client sur WhatsApp, Email, Telegram, Messenger, LinkedIn et SMS. Réponses instantanées et intelligence artificielle pour toutes vos conversations.
            </p>
            
            <div className="mb-10 bg-[#1c2641]/60 p-5 rounded-xl border border-[#0080FF]/30 shadow-xl">
              <div className="flex flex-col space-y-3">
                <div ref={messageRef} className="self-start bg-gray-700/60 rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">Bonjour, je souhaite des informations sur vos services.</p>
                </div>
                <div ref={replyRef} className="self-end bg-[#0080FF]/50 rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">Bonjour ! Je suis l'assistant virtuel d'UDI-BUSINESS. Comment puis-je vous aider aujourd'hui ?</p>
                </div>
                <div ref={automationRef} className="self-center bg-[#FFC000]/20 rounded-full px-4 py-1 text-sm text-white/80 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faRobot} className="text-[#FFC000]" />
                  <span>Réponse automatisée multiplateforme</span>
                </div>
              </div>
            </div>
            
            <div id="hero-buttons" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/ServiceAutomation" 
                className="glowing-btn px-8 py-4 rounded-full bg-gradient-to-r from-[#0080FF] to-[#0080FF]/80 text-white font-semibold text-center hover:shadow-lg hover:shadow-[#0080FF]/20 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span className="text-sm md:text-base">Découvrir notre service phare</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full border-2 border-white/20 hover:border-[#FFC000]/50 text-white font-semibold text-center transition duration-300 hover:bg-white/5 text-sm md:text-base"
              >
                Discuter de votre projet
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div id="hero-logo" className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0080FF]/20 to-[#FFC000]/20 rounded-full blur-3xl"></div>
              
              {/* Démo multiplateforme */}
              <div className="relative">
                <AutomationPlatformsDemo 
                  initialPlatform="whatsapp" 
                  autoRotate={true} 
                  interval={4000} 
                  width="w-full max-w-sm mx-auto" 
                  height="h-[400px]"
                  className="shadow-2xl rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/80"
                />
                
                {/* Icônes des plateformes autour du chat */}
                <div className="absolute -left-6 top-1/4 transform -translate-y-1/2 animate-pulse-slow">
                  <div className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                  </div>
                </div>
                
                <div className="absolute -right-6 top-1/4 transform -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: "0.5s" }}>
                  <div className="w-12 h-12 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#0084FF]/20">
                    <FontAwesomeIcon icon={faFacebookMessenger} size="lg" />
                  </div>
                </div>
                
                <div className="absolute -left-8 top-2/3 transform -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: "0.7s" }}>
                  <div className="w-12 h-12 bg-[#0088CC] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#0088CC]/20">
                    <FontAwesomeIcon icon={faTelegram} size="lg" />
                  </div>
                </div>
                
                <div className="absolute -right-8 top-2/3 transform -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: "1s" }}>
                  <div className="w-12 h-12 bg-[#EA4335] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#EA4335]/20">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  </div>
                </div>
                
                <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: "1.3s" }}>
                  <div className="w-12 h-12 bg-[#0A66C2] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#0A66C2]/20">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </div>
                </div>
                
                <div className="absolute left-1/4 -top-6 transform -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: "1.5s" }}>
                  <div className="w-12 h-12 bg-[#8E8E93] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#8E8E93]/20">
                    <FontAwesomeIcon icon={faComment} size="lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="hero-scroll" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <a href="#services" className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition duration-300">
            <span className="text-sm uppercase tracking-wider">Découvrir</span>
            <div className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
