import { UserTable } from "@/components/tables/UserTable";
import dummyRentals from "@/types/DummData";
import { UserForm } from "./UserForm";
export const UserList = () => {
  return (
    <>
      <div className="flex flex-col items-center p-4 h-96 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <UserTable
          users={dummyRentals.map((r) => r.user)}
          className="w-full p-4 bg-green-100 rounded-md"
        />
      </div>
      {/* This section is stick to the bottom of the page */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
        <div className="flex flex-wrap gap-4 justify-center mt-4">
            <UserForm />
        </div>
      </div>
    </>
  );
};
