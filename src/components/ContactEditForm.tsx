import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "@/types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { ContactFormFields } from "./contact-edit/ContactFormFields";
import { contactSchema, ContactFormData } from "@/schemas/contactSchema";

interface ContactEditFormProps {
  contact: Contact;
}

export const ContactEditForm = ({ contact }: ContactEditFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      is_primary: contact.is_primary,
    },
  });

  const { mutate: updateContact, isPending } = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const { data: updatedContact, error } = await supabase
        .from("contacts")
        .update({
          name: data.name,
          email: data.email,
          phone: data.phone,
          is_primary: data.is_primary,
        })
        .eq('id', contact.id)
        .select()
        .single();

      if (error) throw error;
      return updatedContact as Contact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts", contact.company_id] });
      toast({
        title: "Success",
        description: "Contact has been updated successfully",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update contact. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating contact:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    updateContact(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9] hover:text-[#0EA5E9]"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ContactFormFields form={form} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Updating..." : "Update Contact"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};