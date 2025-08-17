import type { RentalResponseDto } from "@/types/Rentals";
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
}
export const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  className,
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
                {rental.rentalDate}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.rentalStatus}
              </TableCell>
              <TableCell className="font-medium text-center">
                {rental.totalAmount}
              </TableCell>
              <TableCell className="font-medium text-center">
                <RentalPreviewDialog rental={rental} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
