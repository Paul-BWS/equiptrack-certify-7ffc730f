import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          setEmail(user.email || "");
          // Get profile data from user metadata if it exists
          const metadata = user.user_metadata;
          setFullName(metadata?.full_name || "");
        }
      } catch (error) {
        console.error("Error loading user:", error);
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {fullName ? fullName.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <Button onClick={updateProfile} className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;