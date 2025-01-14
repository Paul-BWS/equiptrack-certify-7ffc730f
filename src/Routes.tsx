import { Routes as RouterRoutes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import AllEquipment from "@/pages/AllEquipment";
import AdminUsers from "@/pages/AdminUsers";
import TorqueWrenches from "@/pages/TorqueWrenches";
import TyreGauges from "@/pages/TyreGauges";
import CustomerDashboard from "@/pages/CustomerDashboard";
import Equipment from "@/pages/Equipment";
import LiftingEquipment from "@/pages/LiftingEquipment";
import AxleStands from "@/pages/AxleStands";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/all-equipment" element={<AllEquipment />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/torque-wrenches" element={<TorqueWrenches />} />
      <Route path="/tyre-gauges" element={<TyreGauges />} />
      <Route path="/customers/:id" element={<CustomerDashboard />} />
      <Route path="/customers/:customerId/equipment" element={<Equipment />} />
      <Route path="/customers/:customerId/equipment/torque-wrenches" element={<TorqueWrenches />} />
      <Route path="/customers/:customerId/equipment/tyre-gauges" element={<TyreGauges />} />
      <Route path="/customers/:customerId/equipment/lifting-equipment" element={<LiftingEquipment />} />
      <Route path="/customers/:customerId/equipment/axle-stands" element={<AxleStands />} />
    </RouterRoutes>
  );
};