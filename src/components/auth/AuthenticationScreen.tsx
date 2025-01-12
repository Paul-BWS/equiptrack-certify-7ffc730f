import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export const AuthenticationScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to EquipService</h1>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo={window.location.origin}
            />
          </Card>
        </div>
      </main>
    </div>
  );
};