import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BookResponseDto } from "@/types/Books";
import { Delete, Pencil } from "lucide-react";
import { Button } from "../ui/button";

interface BookTableProps {
  className?: string;
  books: BookResponseDto[];
}
export const BookTable: React.FC<BookTableProps> = ({ books, className }) => {
  const handleDelete = (id: number) => {
    // Placeholder for delete functionality
    console.log(`Delete book with ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    // Placeholder for edit functionality
    console.log(`Edit book with ID: ${id}`);
  };

  return (
    <>
      <div className={className || "w-full p-4"}>
        <Table>
          <TableCaption>All books available in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Book_Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Book_Code</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Published_Year</TableHead>
              <TableHead>Availablity</TableHead>
              <TableHead className="text-right">Quality</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium text-right">
                  {book.id}
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.summary}</TableCell>
                <TableCell>{book.bookCode}</TableCell>
                <TableCell>{book.author.name}</TableCell>
                <TableCell>{book.genre.name}</TableCell>
                <TableCell>{book.language}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>{book.AvailabilityStatus}</TableCell>
                <TableCell>{book.bookQuality}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    onClick={() => handleEdit(book.id)}
                  >
                    <Pencil width={20} height={20} />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-red-500 hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(book.id)}
                  >
                    <Delete width={20} height={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
