"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { RentalResponseDto, RentalRequestDto } from "@/types/Rentals";
import type { BookResponseDto } from "@/types/Books";
import type { UserResponseDto } from "@/types/Users";
import { UserApi } from "@/api/UserApi";
import { toast } from "sonner";
import { BookApi } from "@/api/BookApi";

type Props = {
  rental: RentalResponseDto;
  onUpdate: (id: number, updated: RentalRequestDto) => void;
  onDelete: (id: number) => void;
  onCancel: (id: number) => void;
};

export const RentalPreviewDialog: React.FC<Props> = ({
  rental,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RentalRequestDto>({
    bookId: rental.book.id,
    userId: rental.user.id,
    expectedReturnDays: 0,
  });
  const [book, setBook] = useState<BookResponseDto>({} as BookResponseDto);
  const [user, setUser] = useState<UserResponseDto>({} as UserResponseDto);

  useEffect(() => {
    fetchUser(rental.user.id);
    fetchBook(rental.book.id);
  }, [rental]);

  const fetchUser = async (userId: number) => {
    try {
      const { data, status } = await UserApi.getOne(userId);
      if (status === 200) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user.");
    }
  };

  const fetchBook = async (bookId: number) => {
    try {
      const { data, status } = await BookApi.getOne(bookId);
      if (status === 200) {
        setBook(data);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Error fetching book.");
    }
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      userId: rental.user.id,
      bookId: rental.book.id,
    }));
  }, [rental]);

  const handleUpdate = () => {
    onUpdate(rental.id, data);
  };

  const handleDelete = () => {
    onDelete(rental.id);
  };

  const handleCancel = () => {
    onCancel(rental.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Preview Rental
      </Button>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Rental Preview</DialogTitle>
        </DialogHeader>

        {/* Scrollable Details Section */}
        <div className="max-h-72 overflow-y-auto border-b pb-2 mb-2 space-y-4">
          {/* Rental Info */}
          <div>
            <h4 className="font-semibold text-lg">Rental Details</h4>
            <p>
              <span className="font-semibold">ID:</span> {rental.id}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {rental.rentalStatus}
            </p>
            <p>
              <span className="font-semibold">Rental Date:</span>{" "}
              {rental.rentedDate}
            </p>
            <p>
              <span className="font-semibold">Expected Return:</span>{" "}
              {rental.expectedReturnDate}
            </p>
            <p>
              <span className="font-semibold">Actual Return:</span>{" "}
              {rental.actualReturnDate ?? "Not Returned"}
            </p>
            <p>
              <span className="font-semibold">Total Amount:</span> $
              {rental.totalAmount}
            </p>
          </div>

          {/* User Info */}
          <div>
            <h4 className="font-semibold text-lg">User Details</h4>
            <p>
              <span className="font-semibold">Name:</span> {user.firstname}{" "}
              {user.lastname}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.userRole}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {user.userStatus}
            </p>
          </div>

          {/* Address Info */}
          <div>
            <h4 className="font-semibold text-lg">Address</h4>
            <p>{user.address?.addressLine1 ?? ""}</p>
            <p>{user.address?.addressLine2 ?? ""}</p>
            <p>{user.address?.addressLine3 ?? ""}</p>
            <p>{user.address?.city}</p>
            {user.address?.postalCode && <p>{user.address.postalCode}</p>}
          </div>

          {/* Book Info */}
          <div>
            <h4 className="font-semibold text-lg">Book Details</h4>
            <p>
              <span className="font-semibold">Title:</span> {book.title}
            </p>
            <p>
              <span className="font-semibold">Code:</span> {book.bookCode}
            </p>
            <p>
              <span className="font-semibold">Author:</span> {book.author?.name}
            </p>
            <p>
              <span className="font-semibold">Biography:</span>{" "}
              {book.author?.biography}
            </p>
            <p>
              <span className="font-semibold">Genre:</span> {book.genre?.name}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {book.language}
            </p>
            <p>
              <span className="font-semibold">Quality:</span> {book.bookQuality}
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {book.availabilityStatus}
            </p>
          </div>
        </div>

        {/* Editable Request Fields */}
        <div className="space-y-4 mt-4">
            <h3 className="font-semibold text-lg">Extend Rental</h3>
          <div>
            <Label>Selected Book</Label>
            <Input type="text" value={book.title} readOnly />
          </div>

          <div>
            <Label>User</Label>
            <Input
              type="text"
            value={`${user.firstname} ${user.lastname} (ID: ${user.id})`}
              readOnly
            />
          </div>

          <div>
            <Label>
              Expected Return (days) - Current Value:{" "}
              {rental.expectedReturnDate} *
            </Label>
            <Input
              type="number"
              value={data.expectedReturnDays}
              onChange={(e) =>
                setData({ ...data, expectedReturnDays: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Actions */}
        <DialogFooter className="flex justify-between mt-4">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Rental
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel Rental
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
