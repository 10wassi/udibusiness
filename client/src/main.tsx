import React from 'react';
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import "./index.css";

// Import FontAwesome for the icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCode, 
  faBrain, 
  faCogs, 
  faChartLine, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(
  faCode, 
  faBrain, 
  faCogs, 
  faChartLine, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt
);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
