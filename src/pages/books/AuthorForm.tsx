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
import { Label } from "@/components/ui/label";
import type { AuthorRequestDto } from "@/types/Author";

type Props = {
  onAdd: (data: AuthorRequestDto) => Promise<void>;
};

export const AuthorForm: React.FC<Props> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AuthorRequestDto>({
    name: "",
    biography: "",
  });

  const handleSubmit = async () => {
    if (!data.name.trim()) return;
    await onAdd(data);
    setData({ name: "", biography: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="bg-green-500 hover:bg-green-600" onClick={() => setOpen(true)}>
        Add Author
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Author</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input
              placeholder="Enter author name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Biography</Label>
            <Input
              placeholder="Enter biography"
              value={data.biography}
              onChange={(e) => setData({ ...data, biography: e.target.value })}
            />
          </div>
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
