import type { RentalRequestDto } from "@/types/Rentals";
import { API } from "./AxiosInstance";

export const RentalApi = {
  getAll: async () => {
    const response = await API.get("/rental/all");
    return response;
  },

  getOne: async (id: number) => {
    const response = await API.get(`/rental?id=${id}`);
    return response;
  },

  create: async (data: RentalRequestDto) => {
    const response = await API.post("/rental", data);
    return response;
  },

  update: async (id: number, data: RentalRequestDto) => {
    const response = await API.put(`/rental?id=${id}`, data);
    return response;
  },

  delete: async (id: number) => {
    const response = await API.delete(`/rental?id=${id}`);
    return response;
  },

  getByUserId: async (userId: number) => {
    const response = await API.get(`/rental/user?id=${userId}`);
    return response;
  },

  getByBookId: async (bookId: number) => {
    const response = await API.get(`/rental/book?id=${bookId}`);
    return response;
  },

  returnBook: async (rentalId: number) => {
    const response = await API.patch(`/rental/return?id=${rentalId}`);
    return response;
  },

  cancelRental: async (rentalId: number) => {
    const response = await API.patch(`/rental/cancel?id=${rentalId}`);
    return response;
  },

  calculateTotalAmount: async (rentalId: number, date: string) => {
    const response = await API.get(`/rental/calculate?id=${rentalId}&date=${date}`);
    return response;
  },
};
