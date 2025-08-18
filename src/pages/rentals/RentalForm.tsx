"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Dummy data (replace with API later)
import type { BookResponseDto } from "@/types/Books";
import type { UserResponseDto, UserReqeustDto, UserRole } from "@/types/Users";

interface Props {
  setBookId: React.Dispatch<React.SetStateAction<number | null>>;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  expectedReturnDays: number;
  setExpectedReturnDays: React.Dispatch<React.SetStateAction<number>>;
  addNewUser: boolean;
  setAddNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  newUser: UserReqeustDto;
  setNewUser: React.Dispatch<React.SetStateAction<UserReqeustDto>>;
  loading: boolean;
  handleSubmit: () => void;
  users: UserResponseDto[];
  books: BookResponseDto[];
}

export const RentalForm: React.FC<Props> = ({
  setBookId,
  setUserId,
  expectedReturnDays,
  setExpectedReturnDays,
  addNewUser,
  setAddNewUser,
  newUser,
  setNewUser,
  loading,
  handleSubmit,
  users,
  books,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600"
        >
          New Rental
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Rental</DialogTitle>
        </DialogHeader>

        {/* Book Selection */}
        <div className="space-y-2">
          <Label>Select Book *</Label>
          <Select onValueChange={(val) => setBookId(Number(val))}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a book" />
            </SelectTrigger>
            <SelectContent>
              {books
                .filter((book) => book.availabilityStatus !== "RENTED" && book.availabilityStatus !== "LOST")
                .map((book) => (
                  <SelectItem key={book.id} value={String(book.id)}>
                    {book.title} ({book.bookCode})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* User Selection */}
        {!addNewUser && (
          <div className="space-y-2">
            <Label>Select User *</Label>
            <Select onValueChange={(val) => setUserId(Number(val))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.firstname} {user.lastname} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setAddNewUser(true)}
            >
              + Add New User
            </Button>
          </div>
        )}

        {/* New User Form (Simplified) */}
        {addNewUser && (
          <div className="space-y-3 border p-3 rounded-md">
            <Label className="font-semibold">New User Details</Label>

            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="First Name *"
                value={newUser.firstname}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstname: e.target.value })
                }
              />
              <Input
                placeholder="Last Name *"
                value={newUser.lastname}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
              />
            </div>

            <Input
              placeholder="Email *"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Input
              placeholder="Phone *"
              value={newUser.phoneNumber}
              onChange={(e) =>
                setNewUser({ ...newUser, phoneNumber: e.target.value })
              }
            />

            {/* Shortened address (only line1 + city) */}
            <Input
              placeholder="Address Line 1 *"
              value={newUser.address.addressLine1}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, addressLine1: e.target.value },
                })
              }
            />
            <Input
              placeholder="Address Line 2"
              value={newUser.address.addressLine2}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, addressLine2: e.target.value },
                })
              }
            />
            <Input
              placeholder="Address Line 3"
              value={newUser.address.addressLine3}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, addressLine3: e.target.value },
                })
              }
            />
            <Input
              placeholder="City *"
              value={newUser.address.city}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  address: { ...newUser.address, city: e.target.value },
                })
              }
            />

            {/* Role Select */}
            <Select
              onValueChange={(val: UserRole) =>
                setNewUser({ ...newUser, userRole: val })
              }
              value={newUser.userRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Role *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="LIBRARIAN">Librarian</SelectItem>
                <SelectItem value="GUEST">Guest</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAddNewUser(false);
                  setNewUser({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phoneNumber: "",
                    userRole: "MEMBER",
                    address: { addressLine1: "", city: "" },
                  });
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmit}>
                {loading ? "Saving..." : "Save User & Continue"}
              </Button>
            </div>
          </div>
        )}

        {/* Expected Return Days */}
        <div className="space-y-2">
          <Label>Expected Return (days) *</Label>
          <Input
            type="number"
            value={expectedReturnDays}
            onChange={(e) => setExpectedReturnDays(Number(e.target.value))}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Rental</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
