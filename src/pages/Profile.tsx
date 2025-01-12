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

const Profile = () => {
  const [email, setEmail] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session?.user) return;

        setEmail(session.user.email || "");

        const { data: userCompanies, error: companiesError } = await supabase
          .from("companies")
          .select("*")
          .order("name");

        if (companiesError) throw companiesError;
        setCompanies(userCompanies);

        const { data: userCompanyData, error: userCompanyError } = await supabase
          .from("user_companies")
          .select("company_id")
          .eq("user_id", session.user.id)
          .single();

        if (userCompanyError && userCompanyError.code !== "PGRST116") {
          throw userCompanyError;
        }

        if (userCompanyData) {
          setSelectedCompany(userCompanyData.company_id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session?.user) {
        toast.error("No active session found");
        return;
      }

      const { error: deleteError } = await supabase
        .from("user_companies")
        .delete()
        .eq("user_id", session.user.id);

      if (deleteError) throw deleteError;

      const { error: insertError } = await supabase
        .from("user_companies")
        .insert([
          {
            user_id: session.user.id,
            company_id: selectedCompany,
          },
        ]);

      if (insertError) throw insertError;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto relative">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <User className="h-6 w-6" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm
                email={email}
                companies={companies}
                selectedCompany={selectedCompany}
                onCompanyChange={setSelectedCompany}
                onUpdateProfile={updateProfile}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;