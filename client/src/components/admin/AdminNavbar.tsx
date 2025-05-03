import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { useToast } from "../../hooks/use-toast";
import Logo from "../logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faTimes,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const AdminNavbar = () => {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: () =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/auth/logout",
        {}
      ),
    onSuccess: () => {
      toast({
        title: "Déconnexion réussie",
        variant: "default",
      });
      setLocation("/login");
    },
    onError: () => {
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size={32} />
            <span className="ml-2 text-lg font-bold">UDI Admin</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Voir le site
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              disabled={logoutMutation.isPending}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              {logoutMutation.isPending ? "Déconnexion..." : "Déconnexion"}
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2"
              aria-expanded={isMobileMenuOpen}
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Voir le site
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              disabled={logoutMutation.isPending}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              {logoutMutation.isPending ? "Déconnexion..." : "Déconnexion"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
