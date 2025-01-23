import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { LoginCard } from "./login/LoginCard";
import { RobotImage } from "./login/RobotImage";

export const AuthenticationScreen = () => {
  useAuthRedirect();

  return (
    <div className="min-h-screen bg-[#4c6fbf] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <RobotImage />
          </div>
          <div className="w-full md:w-1/2">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};