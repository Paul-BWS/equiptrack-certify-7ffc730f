import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const NoCompanyMessage = () => {
  return (
    <div className="text-center space-y-4">
      <p className="text-muted-foreground">
        You are not associated with any company yet.
      </p>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Please contact your administrator to get access to a company.")
        }
      >
        Request Company Access
      </Button>
    </div>
  );
};