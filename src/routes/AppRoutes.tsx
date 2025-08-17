import BookList from "@/pages/books/BookList";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardLayout } from "@/components/layout/DashBoardLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoardLayout />}>
        <Route index element={<Navigate to="books" replace />} />
        <Route path="books" element={<BookList />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
