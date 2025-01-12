import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import AllEquipment from "./pages/AllEquipment";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/all-equipment" element={<AllEquipment />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;