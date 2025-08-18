import type { BookRequestDto } from "@/types/Books";
import { API } from "./AxiosInstance";

export const BookApi = {
  getAll: async () => {
    const response = await API.get("/book/all");
    return response;
  },
  getOne: async (id: number) => {
    const response = await API.get(`/book?id=${id}`);
    return response;
  },
  create: async (data: BookRequestDto) => {
    const response = await API.post("/book", data);
    return response;
  },
  update: async (id: number, data: BookRequestDto) => {
    const response = await API.put(`/book?id=${id}`, data);
    return response;
  },
  updateStatus: async (id: number, status: string) => {
    const response = await API.patch(`/book/availability?id=${id}&status=${status}`);
    return response;
  },
  updateQuality: async (id: number, quality: string) => {
    const response = await API.patch(`/book/quality?id=${id}&quality=${quality}`);
    return response;
  },
  delete: async (id: number) => {
    const response = await API.delete(`/book?id=${id}`);
    return response;
  },
  getByAuthorId: async (authorId: number) => {
    const response = await API.get(`/books/author?id=${authorId}`);
    return response;
  },
};
