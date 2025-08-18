import type { UserReqeustDto } from "@/types/Users";
import { API } from "./AxiosInstance";

export const UserApi = {
    getAll: async () => {
        const response = await API.get("/user/all");
        console.log(response);
        return response;
    },
    getOne: async (id: number) => {
        const response = await API.get(`/user?id=${id}`);
        return response;
    },
    delete: async (id: number) => {
        const response = await API.delete(`/user?id=${id}`);
        return response;
    },
    update: async (id: number, data: UserReqeustDto) => {
        const response = await API.put(`/user?id=${id}`, data);
        return response;
    },
    create: async (data: UserReqeustDto) => {
        const response = await API.post("/user", data);
        return response;
    },

};
