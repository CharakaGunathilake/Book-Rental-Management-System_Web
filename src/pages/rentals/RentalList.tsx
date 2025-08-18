import React, { useEffect, useState } from "react";
import { RentalTable } from "@/components/tables/RentalTable";
import type { RentalRequestDto, RentalResponseDto } from "@/types/Rentals";
import { RentalForm } from "./RentalForm";
import { RentalReturnDialog } from "./RentalReturnDialog";
import { RentalApi } from "@/api/RentalApi";
import { toast } from "sonner";
import { UserApi } from "@/api/UserApi";
import type { UserReqeustDto, UserResponseDto } from "@/types/Users";
import type { BookResponseDto } from "@/types/Books";
import { BookApi } from "@/api/BookApi";

export const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<RentalResponseDto[]>([]);

  const [bookId, setBookId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [expectedReturnDays, setExpectedReturnDays] = useState(0);

  // State for new user
  const [addNewUser, setAddNewUser] = useState(false);
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [books, setBooks] = useState<BookResponseDto[]>([]);
  const [newUser, setNewUser] = useState<UserReqeustDto>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    userRole: "MEMBER",
    address: {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
    },
  });

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, status } = await UserApi.getAll();
      if (status === 200) {
        setUsers(data);
        return;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
    }
  };

  const fetchBooks = async () => {
    try {
      const { data, status } = await BookApi.getAll();
      if (status === 200) {
        setBooks(data);
        return;
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Error fetching books.");
    }
  };

  const handleSubmit = async () => {
    let saveduser;
    if (addNewUser) {
      try {
        setLoading(true);
        console.log("Creating new user:", newUser);
        const { data, status } = await UserApi.create(newUser);
        if (status === 201) {
          setUsers([...users, data]);
          saveduser = data;
          toast.success("User created successfully!");
        }
      } catch (error) {
        console.log("Error adding user", error);
        toast.error("Error adding user");
      } finally {
        setLoading(false);
        setAddNewUser(false);
      }
    }

    if (bookId && (userId || addNewUser)) {
      const rental: RentalRequestDto = {
        bookId,
        userId: addNewUser ? saveduser.id : userId, // replace with new user id from API
        expectedReturnDays,
      };
      try {
        const { data, status } = await RentalApi.create(rental);
        if (status === 201) {
          setRentals([...rentals, data]);
          toast.success("Rental created successfully!");
        }
      } catch (error) {
        console.log("Error creating rental", error);
        toast.error("Error creating rental");
      }
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  // Delete rental
  const handleDelete = async (id: number) => {
    try {
      const { status } = await RentalApi.delete(id);
      if (status === 204) {
        setRentals((prev) => prev.filter((r) => r.id !== id));
        toast.success("Rental deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting rental:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const fetchRentals = async () => {
    try {
      const { data, status } = await RentalApi.getAll();
      if (status === 200) {
        setRentals(data);
        return;
      }
      setRentals([]);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleUpdate = async (id: number, updated: RentalRequestDto) => {
    try {
      const { data, status } = await RentalApi.update(id, updated);
      if (status === 200) {
        setRentals((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...data } : r))
        );
        toast.success("Rental updated successfully!");
      }
    } catch (error) {
      console.error("Error updating rental:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const { status } = await RentalApi.cancelRental(id);
      if (status === 204) {
        // Update the list of rentals after successful cancellation with cancelled status
        setRentals((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r))
        );
        toast.success("Rental canceled successfully!");
      }
    } catch (error) {
      console.error("Error canceling rental:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Rental History</h1>
        <RentalTable
          onDelete={(id: number) => handleDelete(id)}
          onUpdate={(id: number, updated: RentalRequestDto) =>
            handleUpdate(id, updated)
          }
          onCancel={(id: number) => handleCancel(id)}
          rentals={rentals}
          className="w-full p-4 bg-green-100 rounded-md"
        />
        <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <RentalForm
              setBookId={setBookId}
              setUserId={setUserId}
              expectedReturnDays={expectedReturnDays}
              setExpectedReturnDays={setExpectedReturnDays}
              addNewUser={addNewUser}
              setAddNewUser={setAddNewUser}
              newUser={newUser}
              setNewUser={setNewUser}
              loading={loading}
              handleSubmit={handleSubmit}
              users={users}
              books={books}
            />
            <RentalReturnDialog />
          </div>
        </div>
      </div>
    </>
  );
};
