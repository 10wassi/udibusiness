import  React,{ useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { insertContactSchema } from "../../../shared/schema";

gsap.registerPlugin(ScrollTrigger);

// Extend the contact schema with validation rules
const contactFormSchema = insertContactSchema.extend({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^(\+\d{1,3}\s?)?(\(\d{1,4}\)\s?)?[\d\s-]{7,}$/.test(val),
      {
        message: "Format de téléphone invalide",
      }
    ),
  subject: z.string().min(1, { message: "Veuillez sélectionner un sujet" }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) =>
      apiRequest(
        "POST",
        "https://udi-business-foji.onrender.com/api/contact",
        data
      ),
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Nous vous contacterons bientôt.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de l'envoi du message.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    gsap.fromTo(
      "#contact-heading *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      "#contact-form",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 80%",
        },
      }
    );

    gsap.utils.toArray<HTMLElement>(".contact-info-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="contact" className="py-24 bg-gray-900 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div id="contact-heading" className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Contactez-<span className="text-gradient">nous</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment nous pouvons vous aider
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0080FF] to-[#FFC000] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            id="contact-form"
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition duration-300 ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Votre nom"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition duration-300 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Téléphone{" "}
                  <span className="text-gray-500 text-xs">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition duration-300 ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="+229 01 96 12 34 78"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Sujet
                </label>
                <select
                  id="subject"
                  {...register("subject")}
                  className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition duration-300 ${errors.subject ? "border-red-500" : ""}`}
                >
                  <option value="" disabled>
                    Sélectionnez un sujet
                  </option>
                  <option value="Développement Logiciel">
                    Développement Logiciel
                  </option>
                  <option value="Intelligence Artificielle">
                    Intelligence Artificielle
                  </option>
                  <option value="Automatisation des processus">
                    Automatisation des processus
                  </option>
                  <option value="Conseil Digital">Conseil Digital</option>
                  <option value="Autre">Autre sujet</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition duration-300 ${errors.message ? "border-red-500" : ""}`}
                  placeholder="Décrivez votre projet ou votre demande..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-semibold hover:shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending
                    ? "Envoi en cours..."
                    : "Envoyer votre message"}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="contact-info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex items-start">
              <div className="p-3 bg-[#0080FF]/10 rounded-full mr-4">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="h-6 w-6 text-[#0080FF]"
                />
              </div>
              <div>
                <h3 className="font-bold mb-1">Téléphone</h3>
                <p className="text-gray-300">+229 (01) 48 00 64 88</p>
              </div>
            </div>

            <div className="contact-info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex items-start">
              <div className="p-3 bg-[#FFC000]/10 rounded-full mr-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-6 w-6 text-[#FFC000]"
                />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-gray-300">business@udi-africa.com</p>
              </div>
            </div>

            <div className="contact-info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex items-start">
              <div className="p-3 bg-[#0080FF]/10 rounded-full mr-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="h-6 w-6 text-[#0080FF]"
                />
              </div>
              <div>
                <h3 className="font-bold mb-1">Adresse</h3>
                <p className="text-gray-300">
                  Attlantique, Bénin
                  <br />
                  Abomey-Calavi, Petit Portail Zogbadjè
                </p>
              </div>
            </div>

            <div className="contact-info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-5">
                <a
                  href="https://www.facebook.com/unityofdigitalinnovation"
                  className="p-3 bg-gray-700 hover:bg-[#0080FF]/20 rounded-full transition duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/unityofdigitalinnovation"
                  className="p-3 bg-gray-700 hover:bg-[#FFC000]/20 rounded-full transition duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/unityofdigitalinnovation"
                  className="p-3 bg-gray-700 hover:bg-[#0080FF]/20 rounded-full transition duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/unityofdigitalinnovation/"
                  className="p-3 bg-gray-700 hover:bg-[#FFC000]/20 rounded-full transition duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
