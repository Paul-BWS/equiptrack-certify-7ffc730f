import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact } from "@/types/contact";
import { Mail, Phone, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";

interface ContactsListProps {
  contacts: Contact[];
  companyId: string;
}

export const ContactsList = ({ contacts, companyId }: ContactsListProps) => {
  return (
    <Card className="bg-white border border-[#0EA5E9]/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-900">Contacts</CardTitle>
        <ContactForm companyId={companyId} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts?.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 rounded-lg border border-[#0EA5E9]/20 bg-white"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">
                    {contact.name}
                    {contact.is_primary && (
                      <span className="ml-2 text-xs bg-[#0EA5E9]/10 text-[#0EA5E9] px-2 py-1 rounded-full">
                        Primary Contact
                      </span>
                    )}
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#0EA5E9]" />
                    {contact.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#0EA5E9]" />
                    {contact.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9]"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};