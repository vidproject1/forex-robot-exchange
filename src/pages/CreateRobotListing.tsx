
import { NavBar } from "@/components/NavBar";
import { RobotForm } from "@/components/seller/RobotForm";
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRobotListing() {
  const { user, accountType, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || accountType !== "seller")) {
      navigate("/login");
    }
  }, [user, accountType, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Robot Listing</h1>
        <RobotForm mode="create" />
      </main>
    </div>
  );
}
