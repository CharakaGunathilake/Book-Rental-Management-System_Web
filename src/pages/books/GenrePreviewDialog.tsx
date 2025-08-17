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
import type { GenreRequestDto, GenreResponseDto } from "@/types/Genre";

type Props = {
  genre: GenreResponseDto;
  onUpdate?: (id: number, data: GenreRequestDto) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
};

export const GenrePreviewDialog: React.FC<Props> = ({
  genre,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<GenreRequestDto>({
    name: genre.name,
  });

  const handleUpdate = async () => {
    await onUpdate(genre.id, editData);
    setOpen(false);
  };

  const handleDelete = async () => {
    await onDelete(genre.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Preview Genre
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Genre Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ID (read-only) */}
          <div>
            <Label>ID</Label>
            <Input value={genre.id} disabled />
          </div>

          {/* Editable Name */}
          <div>
            <Label>Name</Label>
            <Input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDelete} className="text-red-600">
            Delete
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
