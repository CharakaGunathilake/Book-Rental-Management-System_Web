import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookPreviewDialog } from "@/pages/books/BookPreviewDialog";
import type { BookResponseDto } from "@/types/Books";
import { useState } from "react";

interface BookTableProps {
  className?: string;
  books: BookResponseDto[];
}
export const BookTable: React.FC<BookTableProps> = ({ books, className }) => {
  const [selectedBook, setSelectedBook] = useState<BookResponseDto>(
    {} as BookResponseDto
  );

  const handleRowClick = (book: BookResponseDto) => {
    setSelectedBook(book);
  };

  return (
    <>
      <div className={className || "w-full p-4"}>
        <Table>
          <TableCaption>All books available in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Book_Id</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Author</TableHead>
              <TableHead className="text-center">Genre</TableHead>
              <TableHead className="text-center">Published_Year</TableHead>
              <TableHead className="text-center">Availablity</TableHead>
              <TableHead className="text-center">Quality</TableHead>
              <TableHead className="text-center">Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} onClick={() => handleRowClick(book)}>
                <TableCell className="font-medium text-center">
                  {book.id}
                </TableCell>
                <TableCell className="text-center">{book.title}</TableCell>
                <TableCell className="text-center">{book.author.name}</TableCell>
                <TableCell className="text-center">{book.genre.name}</TableCell>
                <TableCell className="text-center">{book.publishedYear}</TableCell>
                <TableCell className="text-center">{book.AvailabilityStatus}</TableCell>
                <TableCell className="text-center">{book.bookQuality}</TableCell>
                <TableCell className="text-center">
                  <BookPreviewDialog
                    book={selectedBook}
                    onSave={() => {}}
                    onDelete={() => {}}
                    onStatusChange={() => {}}
                    // key={selectedBook.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
