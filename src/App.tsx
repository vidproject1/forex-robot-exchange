
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/AuthContext";

// Pages
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import RobotDetail from "./pages/RobotDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SellerDashboard from "./pages/SellerDashboard";
import CreateRobotListing from "./pages/CreateRobotListing";
import EditRobotListing from "./pages/EditRobotListing";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/robot/:id" element={<RobotDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="/about" element={<About />} />
    <Route path="/seller-dashboard" element={<SellerDashboard />} />
    <Route path="/seller-dashboard/create" element={<CreateRobotListing />} />
    <Route path="/seller-dashboard/edit/:id" element={<EditRobotListing />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
