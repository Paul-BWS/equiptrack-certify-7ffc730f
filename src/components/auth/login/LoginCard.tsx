import { Card } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

export const LoginCard = () => {
  return (
    <Card className="p-8 w-full max-w-md mx-auto bg-white/95 backdrop-blur">
      <h1 className="text-3xl font-bold text-center mb-2 text-[#4c6fbf]">EquipTrack</h1>
      <p className="text-center mb-6 text-gray-600">
        Welcome back! Please log in to continue.
      </p>
      <LoginForm />
    </Card>
  );
};