import { Link } from "react-router-dom";
import { ClipboardList, Users, LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

export const MobileNav = ({ isOpen, onClose, onSignOut }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 right-0 left-0 bg-[#266bec] p-4 flex flex-col gap-4 z-50">
      <Link
        to="/"
        className="text-white hover:text-accent flex items-center gap-2 border border-white rounded-full p-2"
        onClick={onClose}
      >
        <Users size={20} />
        <span>Companies</span>
      </Link>
      <Link
        to="/all-equipment"
        className="text-white hover:text-accent flex items-center gap-2 border border-white rounded-full p-2"
        onClick={onClose}
      >
        <ClipboardList size={20} />
        <span>Equipment</span>
      </Link>
      <Button
        variant="ghost"
        className="text-white hover:text-accent flex items-center gap-2 justify-start p-2 border border-white rounded-full"
        onClick={onSignOut}
      >
        <LogOut size={20} />
        <span>Log out</span>
      </Button>
    </div>
  );
};