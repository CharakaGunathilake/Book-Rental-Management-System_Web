import type { UserReqeustDto } from "@/types/Users";
import { API } from "./AxiosInstance";

export const UserApi = {
    getAll: async () => {
        const response = await API.get("/user/all");
        return response.data;
    },
    getOne: async (id: number) => {
        const response = await API.get(`/user?id=${id}`);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await API.delete(`/user?id=${id}`);
        return response.data;
    },
    update: async (id: number, data: UserReqeustDto) => {
        const response = await API.put(`/user?id=${id}`, data);
        return response.data;
    },
    create: async (data: UserReqeustDto) => {
        const response = await API.post("/user", data);
        return response.data;
    },

};
