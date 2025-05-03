import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { useToast } from "../../hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { insertPartenairesSchema } from "../../../../shared/schema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export type Partenaires = {
  id: number;
  name: string;
  company: string;
  logo: string;
  link: string;
};

const PartenairesFormSchema = insertPartenairesSchema.extend({
  company: z.string().nonempty("Le champ entreprise est requis"),
});
type PartenairesFormValues = z.infer<typeof PartenairesFormSchema>;

const PartenairesForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartenaireId, setCurrentPartenaireId] = useState<number | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: partenaires = [],
    isLoading,
    refetch,
  } = useQuery<Partenaires[]>({
    queryKey: ["partenaires"],
    queryFn: () =>
      apiRequest("GET", "https://udi-business-foji.onrender.com/api/partenaires"),
  });

  const form = useForm<PartenairesFormValues>({
    resolver: zodResolver(PartenairesFormSchema),
    defaultValues: {
      name: "",
      company: "",
      logo: "",
      link: "",
    },
  });

  const createMutation = useMutation<Partenaires, Error, PartenairesFormValues>({
    mutationFn: (data) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/admin/partenaires",
        data
      ),
    onSuccess: () => {
      toast({
        title: "Partenaire créé",
        description: "Le partenaire a été ajouté avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["partenaires"] });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PartenairesFormValues }) =>
      apiRequest(
        "PUT",
        `https://udi-business-foji.onrender.com/api/admin/partenaires/${id}`,
        data
      ),
    onSuccess: () => {
      toast({
        title: "Partenaire mis à jour",
        description: "Le partenaire a été mis à jour avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["partenaires"] });
      refetch();
      form.reset();
      setIsEditing(false);
      setCurrentPartenaireId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la mise à jour du partenaire.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(
        "DELETE",
        `https://udi-business-foji.onrender.com/api/admin/partenaires/${id}`
      ),
    onSuccess: () => {
      toast({
        title: "Partenaire supprimé",
        description: "Le partenaire a été supprimé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["partenaires"] });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la suppression du partenaire.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PartenairesFormValues) => {
    if (isEditing && currentPartenaireId) {
      updateMutation.mutate({ id: currentPartenaireId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (partenaire: Partenaires) => {
    setIsEditing(true);
    setCurrentPartenaireId(partenaire.id);
    form.reset({
      name: partenaire.name,
      company: partenaire.company,
      logo: partenaire.logo,
      link: partenaire.link,
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentPartenaireId(null);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0080FF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Form and list rendering */}
    </div>
  );
};

export default PartenairesForm;
