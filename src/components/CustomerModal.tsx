import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const CustomerModal = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-popover">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Company name" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" placeholder="Status" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactFirstName">Contact First Name</Label>
              <Input id="contactFirstName" placeholder="First name" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactLastName">Contact Last Name</Label>
              <Input id="contactLastName" placeholder="Last name" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Phone number" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Phone</Label>
              <Input id="mobile" type="tel" placeholder="Mobile number" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email address" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountsEmail">Accounts Email</Label>
              <Input id="accountsEmail" type="email" placeholder="Accounts email" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Site Address</Label>
              <Input id="street" placeholder="Street address" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street2">Site Address 2</Label>
              <Input id="street2" placeholder="Street address 2" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Input id="county" placeholder="County" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input id="postcode" placeholder="Postal code" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Country" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountsPhone">Accounts Phone</Label>
              <Input id="accountsPhone" type="tel" placeholder="Accounts phone" className="bg-field" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approvals">Approvals</Label>
              <Input id="approvals" placeholder="Manufacturer approvals" className="bg-field" />
            </div>
          </div>
          <div className="space-y-2 col-span-full">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Additional notes" className="bg-field" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Customer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};