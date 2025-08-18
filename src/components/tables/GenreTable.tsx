import type { GenreRequestDto, GenreResponseDto } from "@/types/Genre";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { GenrePreviewDialog } from "@/pages/books/GenrePreviewDialog";

interface Props {
  genres: GenreResponseDto[];
  className?: string;
  onUpdate: (id: number, data: GenreRequestDto) => void;
  onDelete: (id: number) => void;
}
export const GenreTable: React.FC<Props> = ({
  genres,
  className,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className={className || "w-full p-4"}>
      <Table>
        <TableCaption>All genres available in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Genre_Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {genres.map((genre) => (
            <TableRow key={genre.id}>
              <TableCell className="font-medium text-center">
                {genre.id}
              </TableCell>
              <TableCell className="font-medium text-center">
                {genre.name}
              </TableCell>
              <TableCell className="font-medium text-center">
                <GenrePreviewDialog
                  genre={genre}
                  onUpdate={(id: number, data: GenreRequestDto) =>
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
