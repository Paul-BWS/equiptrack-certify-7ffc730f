import { Navigation } from "@/components/Navigation";
import { ReactNode } from "react";

interface BeamsetterLayoutProps {
  children: ReactNode;
}

export const BeamsetterLayout = ({ children }: BeamsetterLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
};