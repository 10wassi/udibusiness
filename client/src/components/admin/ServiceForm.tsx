import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { useToast } from "../../hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faBrain,
  faCogs,
  faChartLine,
  faTrash,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { insertServiceSchema, type Service } from "../../../../shared/schema";
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
  FormDescription,
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

const serviceFormSchema = insertServiceSchema;
type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const ServiceForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery<Service[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/services"],
  });

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "fa-code",
      color: "blue",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ServiceFormValues) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/admin/services",
        data
      ),
    onSuccess: () => {
      toast({
        title: "Service créé",
        description: "Le service a été créé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/services"],
      });
      refetch();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la création du service.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ServiceFormValues }) =>
      apiRequest(
        "PUT",
        `https://udi-business-foji.onrender.com/api/admin/services/${id}`,
        data
      ),
    onSuccess: () => {
      toast({
        title: "Service mis à jour",
        description: "Le service a été mis à jour avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/services"],
      });
      refetch();
      form.reset();
      setIsEditing(false);
      setCurrentServiceId(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la mise à jour du service.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(
        "DELETE",
        `https://udi-business-foji.onrender.com/api/admin/services/${id}`
      ),
    onSuccess: () => {
      toast({
        title: "Service supprimé",
        description: "Le service a été supprimé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/services"],
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la suppression du service.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ServiceFormValues) => {
    if (isEditing && currentServiceId) {
      updateMutation.mutate({ id: currentServiceId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (service: Service) => {
    setIsEditing(true);
    setCurrentServiceId(service.id);
    form.reset({
      title: service.title,
      description: service.description,
      icon: service.icon,
      color: service.color,
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentServiceId(null);
    form.reset();
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "fa-code":
        return faCode;
      case "fa-brain":
        return faBrain;
      case "fa-cogs":
        return faCogs;
      case "fa-chart-line":
        return faChartLine;
      default:
        return faCode;
    }
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
            {isEditing ? "Modifier le service" : "Ajouter un service"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du service"
              : "Ajoutez un nouveau service à la liste"}
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
                        placeholder="Ex: Développement Logiciel"
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
                        placeholder="Description du service..."
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icône</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez une icône" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="fa-code">
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faCode} className="mr-2" />{" "}
                              Code
                            </div>
                          </SelectItem>
                          <SelectItem value="fa-brain">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faBrain}
                                className="mr-2"
                              />{" "}
                              Cerveau
                            </div>
                          </SelectItem>
                          <SelectItem value="fa-cogs">
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faCogs} className="mr-2" />{" "}
                              Engrenages
                            </div>
                          </SelectItem>
                          <SelectItem value="fa-chart-line">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faChartLine}
                                className="mr-2"
                              />{" "}
                              Graphique
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Couleur</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez une couleur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="blue">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-[#0080FF] mr-2"></div>{" "}
                              Bleu
                            </div>
                          </SelectItem>
                          <SelectItem value="yellow">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-[#FFC000] mr-2"></div>{" "}
                              Jaune
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
          <CardTitle>Services existants</CardTitle>
          <CardDescription>
            Liste des services affichés sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.length === 0 ? (
              <p className="text-center text-gray-400 py-4">
                Aucun service disponible
              </p>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start justify-between p-4 bg-gray-800 rounded-lg group"
                >
                  <div className="flex items-start">
                    <div
                      className={`p-3 bg-[${service.color === "blue" ? "#0080FF" : "#FFC000"}]/10 rounded-full mr-4`}
                    >
                      <FontAwesomeIcon
                        icon={getIconComponent(service.icon)}
                        className={`text-[${service.color === "blue" ? "#0080FF" : "#FFC000"}] text-xl`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{service.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(service)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300"
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
                            Êtes-vous sûr de vouloir supprimer ce service ?
                            Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-700 text-white border-gray-600">
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDelete(service.id)}
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default ServiceForm;
