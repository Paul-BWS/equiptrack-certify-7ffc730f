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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
        <ContactForm companyId={companyId} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts?.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-[#F9F9F9]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">
                    {contact.name}
                    {contact.is_primary && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Primary Contact
                      </span>
                    )}
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {contact.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
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