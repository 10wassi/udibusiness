import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { useToast } from "../../hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { insertProjectSchema, type Project } from "../../../../shared/schema";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const projectFormSchema = insertProjectSchema;
type ProjectFormValues = z.infer<typeof projectFormSchema>;

const ProjectForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery<Project[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/projects"],
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      link: "#",
      technologies: [],
      keyResults: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ProjectFormValues) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/admin/projects",
        data
      ),
    onSuccess: () => {
      toast({
        title: "Projet créé",
        description: "Le projet a été créé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/projects"],
      });
      refetch();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la création du projet.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProjectFormValues }) =>
      apiRequest(
        "PUT",
        `https://udi-business-foji.onrender.com/api/admin/projects/${id}`,
        data
      ),
    onSuccess: () => {
      toast({
        title: "Projet mis à jour",
        description: "Le projet a été mis à jour avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/projects"],
      });
      refetch();
      form.reset();
      setIsEditing(false);
      setCurrentProjectId(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la mise à jour du projet.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(
        "DELETE",
        `https://udi-business-foji.onrender.com/api/admin/projects/${id}`
      ),
    onSuccess: () => {
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/projects"],
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la suppression du projet.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    if (isEditing && currentProjectId) {
      updateMutation.mutate({ id: currentProjectId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (project: Project) => {
    setIsEditing(true);
    setCurrentProjectId(project.id);
    form.reset({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      link: project.link,
      technologies: project.technologies || [],
      keyResults: project.keyResults || [],
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentProjectId(null);
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
            {isEditing ? "Modifier le projet" : "Ajouter un projet"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du projet"
              : "Ajoutez un nouveau projet à la galerie"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Plateforme E-commerce"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description du projet..."
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de l'image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="Développement">
                            Développement
                          </SelectItem>
                          <SelectItem value="Intelligence Artificielle">
                            Intelligence Artificielle
                          </SelectItem>
                          <SelectItem value="Automatisation">
                            Automatisation
                          </SelectItem>
                          <SelectItem value="Conseil">Conseil</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien du projet</FormLabel>
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

              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => {
                  const [techInput, setTechInput] = useState("");
                  const handleAddTech = () => {
                    if (
                      techInput.trim() &&
                      !field.value?.includes(techInput.trim())
                    ) {
                      const newTechnologies = [
                        ...(field.value || []),
                        techInput.trim(),
                      ];
                      field.onChange(newTechnologies);
                      setTechInput("");
                    }
                  };
                  const handleRemoveTech = (index: number) => {
                    const newTechnologies = [...(field.value || [])];
                    newTechnologies.splice(index, 1);
                    field.onChange(newTechnologies);
                  };
                  return (
                    <FormItem>
                      <FormLabel>Technologies utilisées</FormLabel>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <Input
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            placeholder="Ajouter une technologie..."
                            className="bg-gray-800 border-gray-700 text-white flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTech();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={handleAddTech}
                            className="bg-[#0080FF] hover:bg-[#0080FF]/80"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(field.value || []).map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-700 rounded-full px-3 py-1"
                            >
                              <span className="text-sm">{tech}</span>
                              <button
                                type="button"
                                className="ml-2 text-gray-400 hover:text-white"
                                onClick={() => handleRemoveTech(index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="keyResults"
                render={({ field }) => {
                  const [resultInput, setResultInput] = useState("");
                  const handleAddResult = () => {
                    if (
                      resultInput.trim() &&
                      !field.value?.includes(resultInput.trim())
                    ) {
                      const newResults = [
                        ...(field.value || []),
                        resultInput.trim(),
                      ];
                      field.onChange(newResults);
                      setResultInput("");
                    }
                  };
                  const handleRemoveResult = (index: number) => {
                    const newResults = [...(field.value || [])];
                    newResults.splice(index, 1);
                    field.onChange(newResults);
                  };
                  return (
                    <FormItem>
                      <FormLabel>Résultats clés</FormLabel>
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <Input
                            value={resultInput}
                            onChange={(e) => setResultInput(e.target.value)}
                            placeholder="Ex: Augmentation des ventes de 45%..."
                            className="bg-gray-800 border-gray-700 text-white flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddResult();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={handleAddResult}
                            className="bg-[#0080FF] hover:bg-[#0080FF]/80"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(field.value || []).map((result, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-700 rounded-lg px-3 py-2"
                            >
                              <span className="text-sm flex-1">{result}</span>
                              <button
                                type="button"
                                className="ml-2 text-gray-400 hover:text-white"
                                onClick={() => handleRemoveResult(index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

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
          <CardTitle>Projets existants</CardTitle>
          <CardDescription>
            Liste des projets affichés sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.length === 0 ? (
              <p className="text-center text-gray-400 py-4 col-span-full">
                Aucun projet disponible
              </p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg overflow-hidden group"
                >
                  <div className="relative h-40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(project)}
                        className="bg-gray-800/70 text-white hover:bg-gray-700"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-gray-800/70 text-red-400 hover:bg-gray-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmation de suppression
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              Êtes-vous sûr de vouloir supprimer ce projet ?
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-700 text-white border-gray-600">
                              Annuler
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDelete(project.id)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.category === "Intelligence Artificielle" ||
                          project.category === "Conseil"
                            ? "bg-[#FFC000] text-gray-900"
                            : "bg-[#0080FF] text-white"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {project.description}
                    </p>
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

export default ProjectForm;
