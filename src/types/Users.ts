import type { AddressRequestDto, AddressResponseDto } from "./Addresses";

type UserReqeustDto = {
    firstname: string;
    lastname: string;
    password?: string;
    email: string;
    phoneNumber: string;
    address: AddressRequestDto;
    userRole: string; // e.g., "admin", "user"
}

type UserResponseDto = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: AddressResponseDto;
    userStatus: string; // e.g., "active", "inactive"
    userRole: string; // e.g., "admin", "user"
}

export type { UserReqeustDto, UserResponseDto };