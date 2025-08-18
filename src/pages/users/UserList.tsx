import { UserTable } from "@/components/tables/UserTable";
import { UserForm } from "./UserForm";
import type { UserReqeustDto, UserResponseDto } from "@/types/Users";
import { UserApi } from "@/api/UserApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export const UserList = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, status } = await UserApi.getAll();
      if (status === 200) {
        setUsers(data);
        return;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
    }
  };

  const createUser = async (user: UserReqeustDto) => {
    try {
      const { data, status } = await UserApi.create(user);
      if (status === 201) {
        setUsers([...users, data]);
        toast.success("User added successfully");
      }
    } catch (error) {
      console.error("Error occured while saving user", error);
      toast.error("Error occured while adding user");
    }
  };

  const updateUser = async (id: number, user: UserReqeustDto) => {
    try {
      const { data, status } = await UserApi.update(id, user);
      if (status === 200) {
        setUsers(users.map((u) => (u.id === id ? data : u)));
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.error("Error occured while updating user", error);
      toast.error("Error occured while updating user");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const { status } = await UserApi.delete(id);
      if (status === 200) {
        setUsers(users.filter((u) => u.id !== id));
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Error occured while deleting user", error);
      toast.error("Error occured while deleting user");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 h-96 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <UserTable
          users={users}
          className="w-full p-4 bg-green-100 rounded-md"
          onDelete={(id: number) => {
            deleteUser(id);
          }}
          onUpdate={(id: number, data: UserReqeustDto) => {
            updateUser(id, data);
          }}
        />
      </div>
      {/* This section is stick to the bottom of the page */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <UserForm
            onAdd={(data: UserReqeustDto) => {
              createUser(data);
            }}
          />
        </div>
      </div>
    </>
  );
};
