import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/lib/supabase";

export const LoginForm = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ 
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#4c6fbf',
              brandAccent: '#3d5ba6',
              inputBackground: 'white',
              inputText: '#1f2937',
              inputBorder: '#e5e7eb',
              inputBorderHover: '#4c6fbf',
              inputBorderFocus: '#4c6fbf',
            },
            space: {
              inputPadding: '0.75rem',
              buttonPadding: '0.75rem',
            },
            borderWidths: {
              buttonBorderWidth: '1px',
              inputBorderWidth: '1px',
            },
            radii: {
              borderRadiusButton: '0.5rem',
              buttonBorderRadius: '0.5rem',
              inputBorderRadius: '0.5rem',
            },
          },
        },
        className: {
          container: 'w-full',
          button: 'w-full bg-[#4c6fbf] hover:bg-[#3d5ba6] text-white font-medium py-2 px-4 rounded-lg transition-colors',
          input: 'w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c6fbf] focus:border-transparent',
          label: 'block text-sm font-medium text-gray-700 mb-1',
        },
      }}
      providers={[]}
      redirectTo={window.location.origin}
    />
  );
};