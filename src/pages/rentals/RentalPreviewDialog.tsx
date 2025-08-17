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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import type { RentalResponseDto, RentalRequestDto } from "@/types/Rentals";
import type { BookResponseDto } from "@/types/Books";
import type { UserResponseDto } from "@/types/Users";

type Props = {
  rental: RentalResponseDto;
  onUpdate?: (updated: RentalRequestDto) => void;
  onDelete?: (id: number) => void;
  oncancel?: (id: number) => void;
};

export const RentalPreviewDialog: React.FC<Props> = ({
  rental,
  onUpdate,
  onDelete,
  oncancel,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RentalRequestDto>({
    bookId: rental.book.id,
    userId: rental.user.id,
    expectedReturnDays: "",
  });
  const [books, setBooks] = useState<BookResponseDto[]>([]);
  const [users, setUsers] = useState<UserResponseDto[]>([]);

  useEffect(() => {
    setBooks([rental.book]);
    setUsers([rental.user]);
  }, [rental]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      userId: rental.user.id,
      bookId: rental.book.id,
    }));
  }, [rental]);

  

  const handleUpdate = () => {
    onUpdate(data);
  };

  const handleDelete = () => {
    onDelete(rental.id);
  };

  const handleCancel = () => {
    oncancel(rental.id);
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

        {/* Rental Preview Section */}
        <div className="space-y-3 border p-3 rounded-md">
          <p>
            <span className="font-semibold">Rental ID:</span> {rental.id}
          </p>
          <p>
            <span className="font-semibold">Rental Date:</span>{" "}
            {rental.rentalDate}
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
            <span className="font-semibold">Status:</span> {rental.rentalStatus}
          </p>
          <p>
            <span className="font-semibold">Total Amount:</span> $
            {rental.totalAmount}
          </p>
        </div>

        {/* Editable Request Fields */}
        <div className="space-y-4 mt-4">
          {/* Book Select */}
          <div>
            <Label>Select Book *</Label>
            <Select
              value={String(data.bookId)}
              onValueChange={(val) => setData({ ...data, bookId: Number(val) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a book" />
              </SelectTrigger>
              <SelectContent>
                {books.map((book) => (
                  <SelectItem key={book.id} value={String(book.id)}>
                    {book.title} ({book.bookCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* User Select */}
          <div>
            <Label>Select User *</Label>
            <Select
              value={String(data.userId)}
              onValueChange={(val) => setData({ ...data, userId: Number(val) })}
            >
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
          </div>

          {/* Expected Return Days */}
          <div>
            <Label>Expected Return (days) *</Label>
            <Input
              type="number"
              value={data.expectedReturnDays}
              onChange={(e) =>
                setData({ ...data, expectedReturnDays: e.target.value })
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
