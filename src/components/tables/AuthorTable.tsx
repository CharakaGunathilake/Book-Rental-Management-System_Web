import type { AuthorResponseDto } from "@/types/Author";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AuthorPreviewDialog } from "@/pages/books/AuthorPreviewDialog";

interface Props {
  authors: AuthorResponseDto[];
  className?: string;
}

export const AuthorTable: React.FC<Props> = ({ authors, className }) => {
  return (
    <div className={className || "w-full p-4"}>
      <Table >
        <TableCaption>All authors available in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Author_Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="text-center">{author.id}</TableCell>
              <TableCell className="text-center">{author.name}</TableCell>
              <TableCell className="text-center"><AuthorPreviewDialog author={author} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
