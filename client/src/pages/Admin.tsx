import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import AdminLayout from "../components/admin/AdminLayout";
import ServiceForm from "../components/admin/ServiceForm";
import ProjectForm from "../components/admin/ProjectForm";
import TestimonialForm from "../components/admin/TestimonialForm";
import PartenairesForm from "../components/admin/PartenairesForm";
import ContactList from "../components/admin/ContactList";

const Admin = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("services");

  // Verify admin authentication
  const { data: authStatus, isLoading } = useQuery({
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

  // Redirect to login if not authenticated as admin
  if (!isLoading && (!authStatus?.authenticated || !authStatus?.isAdmin)) {
    setLocation("/login");
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0080FF]"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Tableau de bord administrateur
        </h1>

        <Tabs
          defaultValue="services"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-8 bg-gray-800">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            <ServiceForm />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectForm />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialForm />
          </TabsContent>
          <TabsContent value="partenaires">
            <PartenairesForm />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactList />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Admin;
