import React from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Equipe from "./pages/Equipe";
import ServiceSoftwareDev from "./pages/ServiceSoftwareDev";
import ServiceAIBigData from "./pages/ServiceAIBigData";
import ServiceAutomation from "./pages/ServiceAutomation";
import ServiceDigitalConsulting from "./pages/ServiceDigitalConsulting";
import NotFound from "./pages/not-found";
import ProgressBar from "./components/ProgressBar";
import CustomCursor from "./components/CustomCursor";
import CTABubble from "./components/CTABubble";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppAutomation from "./pages/ValueProposition/WhatsAppAutomation";
import TimeAndMoneySaving from "./pages/ValueProposition/TimeAndMoneySaving";

function App() {
  // Check authentication status
  const { data: authStatus } = useQuery({
    queryKey: ["https://udi-business-foji.onrender.com/api/auth/status"],
    queryFn: async () => {
      const res = await fetch(
        "https://udi-business-foji.onrender.com/api/auth/status",
        {
          credentials: "include",
        }
      );
      return res.json();
    },
  });

  return (
    <>
      <ProgressBar />
      <CustomCursor />
      <CTABubble interval={15000} />
      <WhatsAppButton
        phoneNumber="+2290148006488"
        message="Bonjour, j'aimerais en savoir plus sur les services d'UDI-BUSINESS."
      />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/equipe" component={Equipe} />

        {/* Routes directes pour les services */}
        <Route path="/ServiceSoftwareDev" component={ServiceSoftwareDev} />
        <Route path="/ServiceAIBigData" component={ServiceAIBigData} />
        <Route path="/ServiceAutomation" component={ServiceAutomation} />
        <Route
          path="/ServiceDigitalConsulting"
          component={ServiceDigitalConsulting}
        />

        {/* Routes pour les pages de Propositions de Valeur */}
        <Route
          path="/ValueProposition/WhatsAppAutomation"
          component={WhatsAppAutomation}
        />
        <Route
          path="/ValueProposition/TimeAndMoneySaving"
          component={TimeAndMoneySaving}
        />

        {/* Maintenir les anciennes routes pour la compatibilité */}
        <Route
          path="/services/developpement-logiciel"
          component={ServiceSoftwareDev}
        />
        <Route path="/services/ia-big-data" component={ServiceAIBigData} />
        <Route path="/services/automatisation" component={ServiceAutomation} />
        <Route
          path="/services/conseil-digital"
          component={ServiceDigitalConsulting}
        />

        <Route path="/admin">
          {authStatus?.authenticated && authStatus?.isAdmin ? (
            <Admin />
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>

      <Toaster />
    </>
  );
}

export default App;
