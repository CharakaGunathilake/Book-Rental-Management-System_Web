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
import type { AuthorRequestDto, AuthorResponseDto } from "@/types/Author";

type Props = {
  author: AuthorResponseDto;
  onUpdate: (id: number, data: AuthorRequestDto) => void;
  onDelete: (id: number) => void;
};

export const AuthorPreviewDialog: React.FC<Props> = ({
  author,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<AuthorRequestDto>({
    name: author.name,
    biography: author.biography,
  });

  const handleUpdate = async () => {
    onUpdate(author.id, editData);
    setOpen(false);
  };

  const handleDelete = async () => {
    onDelete(author.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Preview Author
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Author Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* ID (read-only) */}
          <div>
            <Label>ID</Label>
            <Input value={author.id} disabled />
          </div>

          {/* Editable fields */}
          <div>
            <Label>Name</Label>
            <Input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Biography</Label>
            <Input
              value={editData.biography}
              onChange={(e) =>
                setEditData({ ...editData, biography: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="text-red-600"
          >
            Delete
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
