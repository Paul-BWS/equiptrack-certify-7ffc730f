import { User } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export const ProfileHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-4">
        <User className="h-6 w-6" />
        Profile Settings
      </CardTitle>
    </CardHeader>
  );
};