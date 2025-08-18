import type { AuthorRequestDto, AuthorResponseDto } from "@/types/Author";
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
  onUpdate: (id: number, data: AuthorRequestDto) => void;
  onDelete: (id: number) => void;
}

export const AuthorTable: React.FC<Props> = ({
  authors,
  className,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className={className || "w-full p-4"}>
      <Table>
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
              <TableCell className="text-center">
                <AuthorPreviewDialog
                  author={author}
                  onUpdate={(id: number, data: AuthorRequestDto) =>
                    onUpdate(id, data)
                  }
                  onDelete={(id: number) => onDelete(id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
