import React, { useState } from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AvailabilityStatus,
  BookQuality,
  BookRequestDto,
  BookResponseDto,
} from "@/types/Books";

type Props = {
  book: BookResponseDto;
  onSave: (updated: BookRequestDto) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: AvailabilityStatus) => void;
};

export const BookPreviewDialog: React.FC<Props> = ({
  book,
  onSave,
  onDelete,
  onStatusChange,
}) => {
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState<BookRequestDto>({
    title: book.title,
    summary: book.summary,
    language: book.language,
    publishedYear: book.publishedYear,
    bookQuality: book.bookQuality,
    authorId: book.author?.id??0,
    genreId: book.genre?.id??0,
  });

  const handleChange = (field: keyof BookRequestDto, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(data);
    setEditable(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Preview Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Preview - {book.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Left column: Basic info */}
          <div className="space-y-2">
            <Label>ID</Label>
            <Input value={book.id} disabled />

            <Label>Book Code</Label>
            <Input value={book.bookCode} disabled />

            <Label>Author</Label>
            <Input value={book.author?.name ?? ""} disabled />

            <Label>Genre</Label>
            <Input value={book.genre?.name ?? ""} disabled />
          </div>

          {/* Right column: Editable info */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={data.title || book.title}
              disabled={!editable}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <Label>Summary</Label>
            <Input
              value={data.summary || book.summary}
              disabled={!editable}
              onChange={(e) => handleChange("summary", e.target.value)}
            />

            <Label>Language</Label>
            <Input
              value={data.language || book.language}
              disabled={!editable}
              onChange={(e) => handleChange("language", e.target.value)}
            />

            <Label>Published Year</Label>
            <Input
              value={data.publishedYear || book.publishedYear}
              disabled={!editable}
              onChange={(e) => handleChange("publishedYear", e.target.value)}
            />

            <Label>Book Quality</Label>
            <Select
              value={data.bookQuality}
              onValueChange={(value) =>
                handleChange("bookQuality", value as BookQuality)
              }
              disabled={!editable}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="GOOD">Good</SelectItem>
                <SelectItem value="POOR">Poor</SelectItem>
              </SelectContent>
            </Select>

            <Label>Availability Status</Label>
            <Select
              value={book.AvailabilityStatus}
              onValueChange={(value) =>
                onStatusChange(book.id, value as AvailabilityStatus)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="RENTED">Rented</SelectItem> 
                <SelectItem value="LOST">Lost</SelectItem> 
                <SelectItem value="DELETED">Deleted</SelectItem> 
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          {editable ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={() => setEditable(true)}>Edit</Button>
          )}
          <Button variant="destructive" onClick={() => onDelete(book.id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
