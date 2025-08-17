import type { AddressRequestDto, AddressResponseDto } from "./Addresses";

type UserReqeustDto = {
    firstname: string;
    lastname: string;
    password?: string;
    email: string;
    phoneNumber: string;
    address: AddressRequestDto;
    userRole: UserRole; // e.g., "admin", "user"
}

type UserResponseDto = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: AddressResponseDto;
    userStatus: UserStatus; // e.g., "active", "inactive"
    userRole: UserRole; // e.g., "admin", "member"
}

type UserRole = "ADMIN" | "MEMBER" | "LIBRARIAN" | "GUEST";

type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED" | "DELETED"; 

export type { UserReqeustDto, UserResponseDto, UserRole, UserStatus };