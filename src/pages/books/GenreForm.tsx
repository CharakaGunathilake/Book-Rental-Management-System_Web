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
import type { GenreRequestDto } from "@/types/Genre";

type Props = {
  onAdd?: (data: GenreRequestDto) => Promise<void>;
};

export const GenreForm: React.FC<Props> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await onAdd({ name });
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="bg-green-500 hover:bg-green-600"
        onClick={() => setOpen(true)}
      >
        Add Genre
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Genre</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input
              placeholder="Enter genre name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
