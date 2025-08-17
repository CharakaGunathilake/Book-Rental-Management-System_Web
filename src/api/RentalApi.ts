import type { RentalRequestDto } from "@/types/Rentals";
import { API } from "./AxiosInstance";

export const RentalApi = {
  getAll: async () => {
    const response = await API.get("/rental/all");
    return response.data;
  },

  getOne: async (id: number) => {
    const response = await API.get(`/rental?id=${id}`);
    return response.data;
  },

  create: async (data: RentalRequestDto) => {
    const response = await API.post("/rental", data);
    return response.data;
  },

  update: async (id: number, data: RentalRequestDto) => {
    const response = await API.put(`/rental?id=${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await API.delete(`/rental?id=${id}`);
    return response.data;
  },

  getByUserId: async (userId: number) => {
    const response = await API.get(`/rental/user?id=${userId}`);
    return response.data;
  },

  getByBookId: async (bookId: number) => {
    const response = await API.get(`/rental/book?id=${bookId}`);
    return response.data;
  },

  returnBook: async (rentalId: number) => {
    const response = await API.patch(`/rental/return?id=${rentalId}`);
    return response.data;
  },

  cancelRental: async (rentalId: number) => {
    const response = await API.patch(`/rental/cancel?id=${rentalId}`);
    return response.data;
  },

  calculateTotalAmount: async (rentalId: number, date: string) => {
    const response = await API.get(`/rental/calculate?id=${rentalId}&date=${date}`);
    return response.data;
  },
};
