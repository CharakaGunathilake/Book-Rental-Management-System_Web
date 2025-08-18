"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import type { UserResponseDto, UserReqeustDto, UserRole } from "@/types/Users";

type Props = {
  user: UserResponseDto;
  onUpdate: (id: number, data: UserReqeustDto) => void;
  onDelete: (id: number) => void;
};

export const UserPreviewDialog: React.FC<Props> = ({ user, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<UserReqeustDto>({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: "",
    userRole: user.userRole,
    address: { addressLine1: user.address.addressLine1, city: user.address.city },
  });

  const handleUpdate = async () => {
    onUpdate(user.id, editData);
    setOpen(false);
  };

  const handleDelete = async () => {
    onDelete(user.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Preview User</Button>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input value={user.id} disabled />
          <Input
            placeholder="First Name"
            value={editData.firstname}
            onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={editData.lastname}
            onChange={(e) => setEditData({ ...editData, lastname: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={editData.phoneNumber}
            onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
          />
          <Input
            placeholder="Address Line 1"
            value={editData.address.addressLine1}
            onChange={(e) => setEditData({ ...editData, address: { ...editData.address, addressLine1: e.target.value } })}
          />
          <Input
            placeholder="City"
            value={editData.address.city}
            onChange={(e) => setEditData({ ...editData, address: { ...editData.address, city: e.target.value } })}
          />

          <Select
            onValueChange={(val: UserRole) => setEditData({ ...editData, userRole: val })}
            value={editData.userRole}
          >
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="LIBRARIAN">Librarian</SelectItem>
              <SelectItem value="GUEST">Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDelete} className="text-red-600">Delete</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
