import { API } from "./AxiosInstance";
import type { GenreRequestDto } from "@/types/Genre";

export const GenreApi = {
  getAll: async () => {
    const response = await API.get("/genre/all");
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await API.get(`/genre?id=${id}`);
    return response.data;
  },
  create: async (data: GenreRequestDto) => {
    const response = await API.post("/genre", data);
    return response.data;
  },
  update: async (id: number, data: GenreRequestDto) => {
    const response = await API.put(`/genre?id=${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await API.delete(`/genre?id=${id}`);
    return response.data;
  },
};
