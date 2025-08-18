import type { UserReqeustDto, UserResponseDto } from "@/types/Users";
import type React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { UserPreviewDialog } from "@/pages/users/UserPreviewDialog";

interface Props {
  className?: string;
  users: UserResponseDto[];
  onUpdate: (id: number, data: UserReqeustDto) => void;
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<Props> = ({
  className,
  users,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className={className || "w-full p-4"}>
      <Table>
        <TableCaption>All users available in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">User_Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium text-center">
                {user.id}
              </TableCell>
              <TableCell className="font-medium text-center">
                {user.firstname + " " + user.lastname}
              </TableCell>
              <TableCell className="font-medium text-center">
                {user.email}
              </TableCell>
              <TableCell className="font-medium text-center">
                {user.userStatus}
              </TableCell>
              <TableCell className="font-medium text-center">
                {user.userRole}
              </TableCell>
              <TableCell className="font-medium text-center">
                <UserPreviewDialog
                  user={user}
                  onUpdate={(id: number, data: UserReqeustDto) => {
                    onUpdate(id, data);
                  }}
                  onDelete={(id: number) => {
                    onDelete(id);
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
