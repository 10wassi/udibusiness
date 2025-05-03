import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { useToast } from "../../hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEnvelope,
  faUser,
  faTag,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { type Contact } from "../../../../shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const ContactList = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: contacts = [],
    isLoading,
    refetch,
  } = useQuery<Contact[]>({
    queryKey: ["https://udi-business-foji.onrender.com/api/admin/contacts"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(
        "DELETE",
        `https://udi-business-foji.onrender.com/api/admin/contacts/${id}`
      ),
    onSuccess: () => {
      toast({
        title: "Message supprimé",
        description: "Le message a été supprimé avec succès.",
        variant: "default",
      });
      queryClient.invalidateQueries({
        queryKey: ["https://udi-business-foji.onrender.com/api/admin/contacts"],
      });
      refetch();
      setSelectedContact(null);
      setIsViewOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la suppression du message.",
        variant: "destructive",
      });
    },
  });

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd MMMM yyyy à HH:mm", { locale: fr });
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
          <CardTitle>Messages de contact</CardTitle>
          <CardDescription>
            Liste des messages reçus via le formulaire de contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-6 w-6 text-gray-400"
                />
              </div>
              <h3 className="text-lg font-medium">Aucun message</h3>
              <p className="text-gray-400 mt-2">
                Vous n'avez pas encore reçu de messages de contact.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors flex items-center cursor-pointer group"
                  onClick={() => handleView(contact)}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full mr-4">
                    <FontAwesomeIcon icon={faUser} className="text-gray-300" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{contact.name}</h3>
                      <span className="text-sm text-gray-400">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">{contact.email}</span>
                      <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs">
                        {contact.subject}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-300 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                        onClick={(e) => e.stopPropagation()}
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
                          Êtes-vous sûr de vouloir supprimer ce message ? Cette
                          action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-700 text-white border-gray-600">
                          Annuler
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      {selectedContact && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message de {selectedContact.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Reçu le {formatDate(selectedContact.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[#0080FF] mr-2"
                />
                <span className="font-semibold mr-2">Nom:</span>
                <span>{selectedContact.name}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-[#0080FF] mr-2"
                />
                <span className="font-semibold mr-2">Email:</span>
                <span>{selectedContact.email}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTag} className="text-[#0080FF] mr-2" />
                <span className="font-semibold mr-2">Sujet:</span>
                <span>{selectedContact.subject}</span>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold">Message:</span>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirmation de suppression
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        Êtes-vous sûr de vouloir supprimer ce message ? Cette
                        action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-700 text-white border-gray-600">
                        Annuler
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(selectedContact.id)}
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Fermer
                </Button>
                <Button
                  className="bg-[#0080FF] hover:bg-[#0080FF]/80"
                  onClick={() =>
                    window.open(
                      `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`
                    )
                  }
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Répondre
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContactList;
