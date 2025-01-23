import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import AdminUsers from "@/pages/AdminUsers";
import AllEquipment from "@/pages/AllEquipment";
import CustomerDashboard from "@/pages/CustomerDashboard";
import Equipment from "@/pages/Equipment";
import TorqueWrenches from "@/pages/TorqueWrenches";
import TyreGauges from "@/pages/TyreGauges";
import Beamsetter from "@/pages/Beamsetter";
import AxleStands from "@/pages/AxleStands";
import LiftingEquipment from "@/pages/LiftingEquipment";
import { AuthenticationScreen } from "@/components/auth/AuthenticationScreen";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthenticationScreen />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/all-equipment" element={<AllEquipment />} />
      <Route path="/customers/:customerId" element={<CustomerDashboard />} />
      <Route path="/customers/:customerId/equipment" element={<Equipment />} />
      <Route path="/customers/:customerId/torque-wrenches" element={<TorqueWrenches />} />
      <Route path="/customers/:customerId/tyre-gauges" element={<TyreGauges />} />
      <Route path="/customers/:customerId/beamsetter" element={<Beamsetter />} />
      <Route path="/customers/:customerId/axle-stands" element={<AxleStands />} />
      <Route path="/customers/:customerId/lifting-equipment" element={<LiftingEquipment />} />
    </RouterRoutes>
  );
};