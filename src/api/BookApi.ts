import type { BookRequestDto } from "@/types/Books";
import { API } from "./AxiosInstance";

export const BookApi = {
  getAll: async () => {
    const response = await API.get("/book/all");
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await API.get(`/book?id=${id}`);
    return response.data;
  },
  create: async (data: BookRequestDto) => {
    const response = await API.post("/book", data);
    return response.data;
  },
  update: async (id: number, data: BookRequestDto) => {
    const response = await API.put(`/book?id=${id}`, data);
    return response.data;
  },
  updateStatus: async (id: number, status: string) => {
    const response = await API.patch(`/book?id=${id}&avalailability_status=${status}`);
    return response.data;
  },
  updateQuality: async (id: number, quality: string) => {
    const response = await API.patch(`/book?id=${id}&quality=${quality}`);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await API.delete(`/book?id=${id}`);
    return response.data;
  },
  getByAuthorId: async (authorId: number) => {
    const response = await API.get(`/books/author?id=${authorId}`);
    return response.data;
  },
};
