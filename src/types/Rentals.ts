import type { BookResponseDto } from "./Books";
import type { UserResponseDto } from "./Users";

type RentalRequestDto = {
    bookId: number;
    userId: number;
    expectedReturnDays: string;
}

type RentalResponseDto = {
    id: number;
    book: BookResponseDto;
    user: UserResponseDto;
    rentalDate: string;
    expectedReturnDate: string;
    actualReturnDate?: string; // Optional, as it may not be set until the book is returned
    rentalStatus: string; // e.g., "rented", "returned", "overdue"
    totalAmount: number; // Total amount charged for the rental
}

export type { RentalRequestDto, RentalResponseDto };