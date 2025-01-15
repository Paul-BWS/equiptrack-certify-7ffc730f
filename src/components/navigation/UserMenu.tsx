import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface UserMenuProps {
  onSignOut: () => void;
}

export const UserMenu = ({ onSignOut }: UserMenuProps) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    initials: string;
  }>({
    name: "",
    email: "",
    initials: "U",
  });

  useEffect(() => {
    const getUserDetails = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error fetching user session:", error);
        return;
      }

      if (session?.user) {
        const email = session.user.email || "";
        const name = session.user.user_metadata?.full_name || email.split('@')[0];
        const initials = name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();

        setUserDetails({
          name,
          email,
          initials,
        });
      }
    };

    getUserDetails();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-white hover:bg-white/90">
          <Avatar className="h-10 w-10 bg-white">
            <AvatarFallback className="bg-white text-primary text-lg">
              {userDetails.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userDetails.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userDetails.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};