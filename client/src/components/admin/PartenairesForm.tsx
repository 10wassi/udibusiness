import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { insertPartenairesSchema } from "@shared/schema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Modifier le partenaire" : "Ajouter un partenaire"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du partenaire"
              : "Ajoutez un nouveau partenaire"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Partenaire A"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL du logo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/logo.jpg"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Entreprise B"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                {isEditing && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Annuler
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="bg-[#0080FF] hover:bg-[#0080FF]/80"
                >
                  <FontAwesomeIcon
                    icon={isEditing ? faEdit : faPlus}
                    className="mr-2"
                  />
                  {isEditing ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partenaires existants</CardTitle>
          <CardDescription>
            Liste des partenaires affichés sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partenaires.length === 0 ? (
              <p className="text-center text-gray-400 py-4">
                Aucun partenaire disponible
              </p>
            ) : (
              partenaires.map((partenaire) => (
                <div
                  key={partenaire.id}
                  className="p-6 bg-gray-800 rounded-lg relative group"
                >
                  <div className="flex items-center">
                    <img
                      src={partenaire.logo}
                      alt={partenaire.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <a href={partenaire.link} target="_blank" rel="noreferrer">
                      <h4 className="font-bold">{partenaire.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {partenaire.company}
                      </p>
                    </a>
                  </div>
                  <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(partenaire)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(partenaire.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartenairesForm;
