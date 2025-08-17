import type { AuthorResponseDto } from "./Author";
import type { BookResponseDto } from "./Books";
import type { GenreResponseDto } from "./Genre";
import type { RentalResponseDto } from "./Rentals";
import type { UserResponseDto } from "./Users";

// Dummy Authors
const dummyAuthors: AuthorResponseDto[] = [
  { id: 1, name: "John Smith", biography: "Expert in React and frontend tech" },
  { id: 2, name: "Jane Doe", biography: "TypeScript and Node.js enthusiast" },
  { id: 3, name: "Mary Brown", biography: "CSS and design specialist" },
];

// Dummy Genres
const dummyGenres: GenreResponseDto[] = [
  { id: 1, name: "Programming" },
  { id: 2, name: "Design" },
  { id: 3, name: "Fiction" },
];

// Dummy Books
const dummyBooks: BookResponseDto[] = [
  {
    id: 101,
    title: "React in Depth",
    summary: "Comprehensive guide to React development",
    bookCode: "R-101",
    author: dummyAuthors[0],
    genre: dummyGenres[0],
    AvailabilityStatus: "RENTED",
    language: "English",
    publishedYear: "2022",
    bookQuality: "NEW",
  },
  {
    id: 102,
    title: "TypeScript Guide",
    summary: "Learn TypeScript from scratch",
    bookCode: "TS-102",
    author: dummyAuthors[1],
    genre: dummyGenres[0],
    AvailabilityStatus: "AVAILABLE",
    language: "English",
    publishedYear: "2021",
    bookQuality: "GOOD",
  },
  {
    id: 103,
    title: "Advanced CSS",
    summary: "Deep dive into CSS techniques",
    bookCode: "CSS-103",
    author: dummyAuthors[2],
    genre: dummyGenres[1],
    AvailabilityStatus: "RENTED",
    language: "English",
    publishedYear: "2020",
    bookQuality: "POOR",
  },
];

// Dummy Users
const dummyUsers: UserResponseDto[] = [
  {
    id: 201,
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice@example.com",
    phoneNumber: "123-456-7890",
    address: {
      id: 1,
      addressLine1: "123 Main St",
      city: "Colombo",
      postalCode: "10000",
    },
    userStatus: "ACTIVE",
    userRole: "MEMBER",
  },
  {
    id: 202,
    firstname: "Bob",
    lastname: "Williams",
    email: "bob@example.com",
    phoneNumber: "987-654-3210",
    address: {
      id: 2,
      addressLine1: "456 Elm St",
      city: "Kandy",
      postalCode: "20000",
    },
    userStatus: "ACTIVE",
    userRole: "MEMBER",
  },
  {
    id: 203,
    firstname: "Charlie",
    lastname: "Davis",
    email: "charlie@example.com",
    phoneNumber: "555-111-2222",
    address: {
      id: 3,
      addressLine1: "789 Pine St",
      city: "Galle",
    },
    userStatus: "BANNED",
    userRole: "GUEST",
  },
];

// Dummy Rentals
const dummyRentals: RentalResponseDto[] = [
  {
    id: 1,
    book: dummyBooks[0],
    user: dummyUsers[0],
    rentalDate: "2025-08-01",
    expectedReturnDate: "2025-08-15",
    rentalStatus: "RENTED",
    totalAmount: 20.0,
  },
  {
    id: 2,
    book: dummyBooks[1],
    user: dummyUsers[1],
    rentalDate: "2025-07-20",
    expectedReturnDate: "2025-08-05",
    actualReturnDate: "2025-08-03",
    rentalStatus: "RETURNED",
    totalAmount: 15.5,
  },
  {
    id: 3,
    book: dummyBooks[2],
    user: dummyUsers[2],
    rentalDate: "2025-07-25",
    expectedReturnDate: "2025-08-10",
    rentalStatus: "OVERDUE",
    totalAmount: 18.0,
  },
];

export default dummyRentals;
