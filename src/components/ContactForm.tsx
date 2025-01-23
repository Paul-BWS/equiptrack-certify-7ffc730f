import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ContactFormFields } from "./contact-edit/ContactFormFields";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ContactFormData } from "@/schemas/contactSchema";

interface ContactFormProps {
  companyId: string;
}

export const ContactForm = ({ companyId }: ContactFormProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.from('contacts').insert({
        company_id: companyId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        is_primary: data.is_primary
      });

      if (error) throw error;

      toast.success("Contact added successfully");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error("Failed to add contact");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Contact
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <ContactFormFields onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};