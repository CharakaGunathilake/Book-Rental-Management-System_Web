import React, { useEffect, useState } from "react";
import { RentalTable } from "@/components/tables/RentalTable";
import type { RentalResponseDto } from "@/types/Rentals";
import dummyRentals from "@/types/DummData";
import { RentalForm } from "./RentalForm";
import { RentalReturnDialog } from "./RentalReturnDialog";

// Dummy API simulation
const fetchRentals = async (): Promise<RentalResponseDto[]> => {
  // Replace with real API call
  return dummyRentals;
};

export const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<RentalResponseDto[]>([]);
  const [selectedRental, setSelectedRental] =
    useState<RentalResponseDto | null>(null);

  useEffect(() => {
    fetchRentals().then(setRentals);
  }, []);

  // Delete rental
  const handleDelete = (id: number) => {
    setRentals((prev) => prev.filter((r) => r.id !== id));
    setSelectedRental(null);
  };

  // Update rental
  const handleSave = (updated: Partial<RentalResponseDto>) => {
    setRentals((prev) =>
      prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
    );
    setSelectedRental(null);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Rental History</h1>
        <RentalTable
          rentals={rentals}
          className="w-full p-4 bg-green-100 rounded-md"
        />
        <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <RentalForm />
            <RentalReturnDialog />
          </div>
        </div>
      </div>
    </>
  );
};
