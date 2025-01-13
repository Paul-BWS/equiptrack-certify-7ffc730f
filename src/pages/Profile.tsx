import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Company } from "@/types/company";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isBWSUser, setIsBWSUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Query to check if user is BWS user
  const { data: bwsStatus } = useQuery({
    queryKey: ['bws-status'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_bws_user');
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    setIsBWSUser(bwsStatus || false);
  }, [bwsStatus]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session error:", sessionError);
          toast.error("Authentication error");
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.log("No active session found");
          toast.error("Please sign in to access settings");
          setIsLoading(false);
          return;
        }

        setEmail(session.user.email || "");
        setName(session.user.user_metadata?.name || "");

        // Fetch companies based on user's access
        const { data: userCompanies, error: companiesError } = await supabase
          .from("companies")
          .select("*")
          .order("name");

        if (companiesError) {
          console.error("Error fetching companies:", companiesError);
          toast.error("Error fetching companies");
          setIsLoading(false);
          return;
        }

        if (userCompanies) {
          console.log("Fetched companies:", userCompanies);
          setCompanies(userCompanies);
        }

        // Fetch user's current company association
        const { data: userCompanyData, error: userCompanyError } = await supabase
          .from("user_companies")
          .select("company_id")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (userCompanyError) {
          console.error("Error fetching user company:", userCompanyError);
          toast.error("Error fetching user company");
          setIsLoading(false);
          return;
        }

        if (userCompanyData?.company_id) {
          setSelectedCompany(userCompanyData.company_id);
        } else {
          toast.error("You are not associated with any company");
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        toast.error("Authentication error");
        return;
      }
      if (!session?.user) {
        toast.error("No active session found");
        return;
      }

      if (!selectedCompany) {
        toast.error("Please select a company");
        return;
      }

      // Update user metadata with name
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name }
      });

      if (updateError) {
        toast.error("Failed to update profile");
        return;
      }

      // Delete existing company association
      const { error: deleteError } = await supabase
        .from("user_companies")
        .delete()
        .eq("user_id", session.user.id);

      if (deleteError) {
        toast.error("Failed to update company association");
        return;
      }

      // Insert new company association
      const { error: insertError } = await supabase
        .from("user_companies")
        .insert([
          {
            user_id: session.user.id,
            company_id: selectedCompany,
          },
        ]);

      if (insertError) {
        toast.error("Failed to update company association");
        return;
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Loading state with spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto relative space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <User className="h-6 w-6" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {companies.length === 0 ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    You are not associated with any company yet.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => toast.info("Please contact your administrator to get access to a company.")}
                  >
                    Request Company Access
                  </Button>
                </div>
              ) : (
                <ProfileForm
                  email={email}
                  name={name}
                  onNameChange={setName}
                  companies={companies}
                  selectedCompany={selectedCompany}
                  onCompanyChange={setSelectedCompany}
                  onUpdateProfile={updateProfile}
                  isBWSUser={isBWSUser}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;