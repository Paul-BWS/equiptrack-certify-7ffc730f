import { Company } from "@/types/company";
import { useAccessCheck } from "@/hooks/useAccessCheck";

interface AccessCheckProps {
  company: Company;
  isBWSUser: boolean;
  onAccessChange: (hasAccess: boolean) => void;
  onError: (error: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export const AccessCheck = ({ 
  company, 
  isBWSUser, 
  onAccessChange, 
  onError,
  onLoadingChange 
}: AccessCheckProps) => {
  useAccessCheck({
    company,
    isBWSUser,
    onAccessChange,
    onError,
    onLoadingChange
  });

  return null;
};