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
  faUser,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { insertTestimonialSchema, type Testimonial } from "../../../../shared/schema";
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

const testimonialFormSchema = insertTestimonialSchema;
type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

const TestimonialForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonialId, setCurrentTestimonialId] = useState<
    number | null
  >(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: testimonials = [],
    isLoading,
    refetch,
  } = useQuery<Testimonial[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/testimonials"],
  });

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      position: "",
      company: "",
      content: "",
      image: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: TestimonialFormValues) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/admin/testimonials",
        data
      ),
    onSuccess: () => {
      toast({
        title: "Témoignage créé",
        description: "Le témoignage a été ajouté avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/testimonials"],
      });
      refetch();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la création du témoignage.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TestimonialFormValues }) =>
      apiRequest(
        "PUT",
        `https://udi-business-foji.onrender.com/api/admin/testimonials/${id}`,
        data
      ),
    onSuccess: () => {
      toast({
        title: "Témoignage mis à jour",
        description: "Le témoignage a été mis à jour avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/testimonials"],
      });
      refetch();
      form.reset();
      setIsEditing(false);
      setCurrentTestimonialId(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la mise à jour du témoignage.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(
        "DELETE",
        `https://udi-business-foji.onrender.com/api/admin/testimonials/${id}`
      ),
    onSuccess: () => {
      toast({
        title: "Témoignage supprimé",
        description: "Le témoignage a été supprimé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/testimonials"],
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la suppression du témoignage.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TestimonialFormValues) => {
    if (isEditing && currentTestimonialId) {
      updateMutation.mutate({ id: currentTestimonialId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setIsEditing(true);
    setCurrentTestimonialId(testimonial.id);
    form.reset({
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      content: testimonial.content,
      image: testimonial.image,
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTestimonialId(null);
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
            {isEditing ? "Modifier le témoignage" : "Ajouter un témoignage"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modifiez les informations du témoignage"
              : "Ajoutez un nouveau témoignage client"}
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
                          placeholder="Ex: Sophie Martin"
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/avatar.jpg"
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
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poste</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Directrice Marketing"
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
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: TechSolutions"
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Témoignage</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contenu du témoignage..."
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
          <CardTitle>Témoignages existants</CardTitle>
          <CardDescription>
            Liste des témoignages clients affichés sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <p className="text-center text-gray-400 py-4">
                Aucun témoignage disponible
              </p>
            ) : (
              testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="p-6 bg-gray-800 rounded-lg relative group"
                >
                  <div
                    className={`absolute -top-3 -left-3 text-5xl opacity-20 text-[${index % 2 === 0 ? "#0080FF" : "#FFC000"}]`}
                  >
                    "
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-300">{testimonial.content}</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                    <div className="ml-auto flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(testimonial)}
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
                              Êtes-vous sûr de vouloir supprimer ce témoignage ?
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-700 text-white border-gray-600">
                              Annuler
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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

export default TestimonialForm;
