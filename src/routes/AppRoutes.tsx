import BookList from "@/pages/books/BookList";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardLayout } from "@/components/layout/DashBoardLayout";
import { RentalList } from "@/pages/rentals/RentalList";
import { UserList } from "@/pages/users/UserList";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoardLayout />}>
        <Route index element={<Navigate to="books" replace />} />
        <Route path="books" element={<BookList />} />
        <Route path="rentals" element={<RentalList />} />
        <Route path="users" element={<UserList />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
