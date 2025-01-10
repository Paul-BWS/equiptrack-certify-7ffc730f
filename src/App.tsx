import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import TorqueWrenches from "./pages/TorqueWrenches";
import CustomerDashboard from "./pages/CustomerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customers/:customerId" element={<CustomerDashboard />} />
          <Route
            path="/customers/:customerId/equipment"
            element={<Equipment />}
          />
          <Route
            path="/customers/:customerId/equipment/torque-wrenches"
            element={<TorqueWrenches />}
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;