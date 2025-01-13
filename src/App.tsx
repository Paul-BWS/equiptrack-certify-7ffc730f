import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </Router>
  );
}

export default App;