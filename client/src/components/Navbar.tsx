import  React,{ useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Logo from './logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setIsServicesMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const toggleServicesMenu = () => {
    setIsServicesMenuOpen(!isServicesMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold">UDI-BUSINESS</span>
          </a>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-white hover:text-[#FFC000] transition duration-300">Accueil</a>
            
            {/* Service Dropdown */}
            <div className="relative" ref={servicesMenuRef}>
              <button
                className="text-white hover:text-[#FFC000] transition duration-300 flex items-center space-x-1"
                onClick={toggleServicesMenu}
              >
                <span>Services</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-2 space-y-1">
                    <Link
                      href="/ServiceAutomation"
                      className="block px-4 py-3 text-sm text-[#FFC000] bg-gray-900/80 border border-[#FFC000]/30 rounded-md transition duration-300 hover:bg-[#FFC000]/10 relative overflow-hidden"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FFC000] text-gray-900 text-xs px-2 py-0.5 rounded-full font-medium">
                        Phare
                      </div>
                      <div>
                        <span className="font-semibold">Automatisation des Processus</span>
                        <p className="text-xs text-gray-400 mt-0.5">Solution innovante IA pour l'automatisation des tâches</p>
                      </div>
                    </Link>
                    
                    <Link
                      href="/ServiceSoftwareDev"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Développement Logiciel
                    </Link>
                    <Link
                      href="/ServiceAIBigData"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      IA & Big Data
                    </Link>
                    <Link
                      href="/ServiceDigitalConsulting"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Conseil Digital
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <a
                      href="/#services"
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Tous nos services
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/portfolio" className="text-white hover:text-[#FFC000] transition duration-300">Portfolio</Link>
            <a 
              href="/#contact" 
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-medium hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              Contact
            </a>
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Accueil</a>
            
            {/* Services section in mobile menu */}
            <div className="border-b border-gray-800 pb-3">
              <a href="/#services" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300 font-medium">
                Services
              </a>
              <div className="mt-2 ml-4 flex flex-col space-y-3">
                <Link 
                  href="/ServiceAutomation" 
                  onClick={closeMobileMenu} 
                  className="text-[#FFC000] font-semibold hover:text-[#FFC000] transition duration-300 text-sm bg-gray-800 p-3 rounded-md border border-[#FFC000]/30 relative"
                >
                  <div className="flex justify-between items-center">
                    <span>• Automatisation des Processus</span>
                    <span className="bg-[#FFC000] text-gray-900 text-xs px-2 py-0.5 rounded-full font-medium">
                      Phare
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 pl-2">Solution innovante IA pour l'automatisation des tâches</p>
                </Link>
                <Link 
                  href="/ServiceSoftwareDev" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • Développement Logiciel
                </Link>
                <Link 
                  href="/ServiceAIBigData" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • IA & Big Data
                </Link>
                <Link 
                  href="/ServiceDigitalConsulting" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • Conseil Digital
                </Link>
              </div>
            </div>
            
            <Link href="/portfolio" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Portfolio</Link>
            <a 
              href="/#contact" 
              onClick={closeMobileMenu}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-medium text-center hover:shadow-lg transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
