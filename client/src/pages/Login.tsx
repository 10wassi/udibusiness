import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import Logo from "../components/logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Nom d'utilisateur requis" }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/auth/login",
        data
      ),
    onSuccess: async (res) => {
      setIsLoading(false);
      const data = await res.json();
      if (data.isAdmin) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'espace administrateur",
          variant: "default",
        });
        setLocation("/admin");
      } else {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions nécessaires",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Échec de la connexion",
        description:
          error.message || "Nom d'utilisateur ou mot de passe incorrect",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4">
            <Logo size={60} />
          </div>
          <CardTitle className="text-2xl font-bold">
            Espace Administrateur
          </CardTitle>
          <CardDescription>
            Connectez-vous pour gérer le contenu du site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0080FF] to-[#FFC000]"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setLocation("/")}
          >
            Retour à l'accueil
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
