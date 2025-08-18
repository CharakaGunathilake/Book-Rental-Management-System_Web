import type { AuthorRequestDto } from "@/types/Author";
import { API } from "./AxiosInstance";

export const AuthorApi = {
  getAll: async () => {
    const response = await API.get("/author/all");
    return response;
  },
  getOne: async (id: number) => {
    const response = await API.get(`/author?id=${id}`);
    return response;
  },
  create: async (data: AuthorRequestDto) => {
    const response = await API.post("/author", data);
    console.log(response);
    return response;
  },
  update: async (id: number, data: AuthorRequestDto) => {
    const response = await API.put(`/author?id=${id}`, data);
    return response;
  },
  delete: async (id: number) => {
    const response = await API.delete(`/author?id=${id}`);
    return response;
  },
};
