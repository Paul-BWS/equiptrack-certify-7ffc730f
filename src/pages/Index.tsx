import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CustomerSearch } from "@/components/CustomerSearch";
import { CustomerList } from "@/components/CustomerList";
import { CustomerForm } from "@/components/CustomerForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, User, Users } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<"bws" | "steer">("bws");

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', session?.user?.user_metadata?.company_id);
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    enabled: !!session,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching companies:', error);
      }
    }
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          data: {
            role: loginType,
            company_id: loginType === 'steer' ? 'steer-automotive-group' : undefined
          }
        }
      });

      if (error) {
        toast.error(error.message);
      } else if (data.session) {
        toast.success(`Successfully signed in as ${loginType === 'bws' ? 'BWS Staff' : 'Steer Automotive Group'} user!`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSessionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto py-8 px-4">
          <div className="max-w-md mx-auto">
            <Card className="p-6">
              <Tabs defaultValue="bws" onValueChange={(value) => setLoginType(value as "bws" | "steer")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="bws" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    BWS Staff
                  </TabsTrigger>
                  <TabsTrigger value="steer" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Steer Group
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bws">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <h2 className="text-xl font-semibold text-center mb-4">BWS Staff Login</h2>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Signing in..."
                      ) : (
                        <span className="flex items-center gap-2">
                          <LogIn className="h-4 w-4" />
                          Sign In
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="steer">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="flex justify-center mb-6">
                      <img 
                        src="/steer-logo.png" 
                        alt="Steer Automotive Group" 
                        className="h-12 object-contain"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Steer Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Signing in..."
                      ) : (
                        <span className="flex items-center gap-2">
                          <LogIn className="h-4 w-4" />
                          Sign In to Steer Portal
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Filter companies based on user role
  const filteredCompanies = companies.filter((company) => {
    if (session.user.user_metadata.role === 'steer') {
      return company.id === 'steer-automotive-group';
    }
    return company.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {session.user.user_metadata.role === 'steer' ? 'Steer Automotive Group Portal' : 'Companies'}
              </h1>
              <p className="text-gray-500">
                {session.user.user_metadata.role === 'steer' 
                  ? 'View and manage your certificates' 
                  : 'Manage your company relationships'}
              </p>
            </div>
            {session.user.user_metadata.role !== 'steer' && <CustomerForm />}
          </div>

          {session.user.user_metadata.role !== 'steer' && (
            <div className="mb-8">
              <CustomerSearch onSearch={setSearchQuery} />
            </div>
          )}

          {isLoadingCompanies ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CustomerList customers={filteredCompanies} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;