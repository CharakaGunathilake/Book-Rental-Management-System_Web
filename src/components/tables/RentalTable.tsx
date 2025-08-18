import type { RentalRequestDto, RentalResponseDto } from "@/types/Rentals";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RentalPreviewDialog } from "@/pages/rentals/RentalPreviewDialog";

interface RentalTableProps {
  rentals: RentalResponseDto[];
  className?: string;
  onUpdate: (id: number, updated: RentalRequestDto) => void;
  onDelete: (id: number) => void;
  onCancel: (id: number) => void;
}
export const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  className,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  return (
    <div className={className || "w-full p-4"}>
      <Table>
        <TableCaption>All rental history available in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Rental_Id</TableHead>
            <TableHead className="text-center">Book_Id</TableHead>
            <TableHead className="text-center">User_Id</TableHead>
            <TableHead className="text-center">Rental_Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell className="font-medium text-center">
                {rental.id}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.book.id}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.user.id}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.rentedDate}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.rentalStatus}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.totalAmount}
              </TableCell>
              <TableCell className="font-medium text-center">
                <RentalPreviewDialog
                  rental={rental}
                  onUpdate={(id: number, data: RentalRequestDto) => {
                    onUpdate(id, data);
                  }}
                  onDelete={(id: number) => {
                    onDelete(id);
                  }}
                  onCancel={(id: number) => {
                    onCancel(id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
