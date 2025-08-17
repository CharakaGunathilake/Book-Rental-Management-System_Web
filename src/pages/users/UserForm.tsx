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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { UserReqeustDto, UserRole } from "@/types/Users";

type Props = {
  onAdd?: (data: UserReqeustDto) => Promise<void>;
};

export const UserForm: React.FC<Props> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserReqeustDto>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    userRole: "MEMBER",
    address: { addressLine1: "", city: "" },
  });

  const handleSubmit = async () => {
    if (
      !user.firstname ||
      !user.lastname ||
      !user.email ||
      !user.address.addressLine1 ||
      !user.address.city
    )
      return;
    await onAdd(user);
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      userRole: "MEMBER",
      address: { addressLine1: "", city: "" },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="bg-green-500 hover:bg-green-600"
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="First Name *"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
          <Input
            placeholder="Last Name *"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
          <Input
            placeholder="Email *"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
          <Input
            placeholder="Address Line 1 *"
            value={user.address.addressLine1}
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, addressLine1: e.target.value },
              })
            }
          />
          <Input
            placeholder="City *"
            value={user.address.city}
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, city: e.target.value },
              })
            }
          />

          <Select
            onValueChange={(val: UserRole) =>
              setUser({ ...user, userRole: val })
            }
            value={user.userRole}
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
          <Input
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            hidden={user.userRole === "MEMBER" || user.userRole === "GUEST"}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
