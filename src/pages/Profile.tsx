import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LoadingSpinner } from "@/components/profile/LoadingSpinner";
import { NoCompanyMessage } from "@/components/profile/NoCompanyMessage";
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const {
    email,
    name,
    setName,
    companyName,
    isBWSUser,
    isLoading,
    updateProfile,
  } = useProfileData();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto relative space-y-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Card>
              <ProfileHeader />
              <CardContent>
                {!companyName ? (
                  <NoCompanyMessage />
                ) : (
                  <ProfileForm
                    email={email}
                    name={name}
                    onNameChange={setName}
                    onUpdateProfile={updateProfile}
                    isBWSUser={isBWSUser}
                    companyName={companyName}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;