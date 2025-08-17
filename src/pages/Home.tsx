import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to the Book Rental Management System
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Manage your books efficiently with our application.
        </p>
        <Button
          onClick={() => navigate("/books")}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Get Started
        </Button>
      </div>
    </>
  );
};
