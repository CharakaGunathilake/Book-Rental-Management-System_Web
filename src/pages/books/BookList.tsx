import { BookTable } from "@/components/tables/BookTable";
import type { BookResponseDto } from "@/types/Books";
import { BookForm } from "./BookForm";
import { useEffect, useState } from "react";
import { AuthorTable } from "@/components/tables/AuthorTable";
import { AuthorApi } from "@/api/AuthorApi";
import { GenreApi } from "@/api/GenreApi";
import type { AuthorResponseDto } from "@/types/Author";
import type { GenreResponseDto } from "@/types/Genre";
import { GenreTable } from "@/components/tables/GenreTable";
import { GenreForm } from "./GenreForm";
import { AuthorForm } from "./AuthorForm";

export default function BookList() {
  // Placeholder for book data, replace with actual data fetching logic
  // const books = useBooks(); // Example hook to fetch books
  const books: BookResponseDto[] = [
    {
      id: 1,
      title: "Sample Book",
      summary: "This is a sample book.",
      bookCode: "ABC123",
      author: { id: 1, name: "John Doe", biography: "An author." },
      genre: { id: 1, name: "Fiction" },
      AvailabilityStatus: "AVAILABLE",
      language: "English",
      publishedYear: "2022",
      bookQuality: "GOOD",
    },
    {
      id: 2,
      title: "Another Book",
      summary: "This is another sample book.",
      bookCode: "XYZ456",
      author: { id: 2, name: "Jane Smith", biography: "Another author." },
      genre: { id: 2, name: "Non-Fiction" },
      AvailabilityStatus: "RENTED",
      language: "Spanish",
      publishedYear: "2021",
      bookQuality: "POOR",
    },
    {
      id: 3,
      title: "Third Book",
      summary: "This is the third sample book.",
      bookCode: "LMN789",
      author: { id: 3, name: "Bob Johnson", biography: "A third author." },
      genre: { id: 3, name: "Mystery" },
      AvailabilityStatus: "LOST",
      language: "French",
      publishedYear: "2020",
      bookQuality: "NEW",
    },
    {
      id: 3,
      title: "Third Book",
      summary: "This is the third sample book.",
      bookCode: "LMN789",
      author: { id: 3, name: "Bob Johnson", biography: "A third author." },
      genre: { id: 3, name: "Mystery" },
      AvailabilityStatus: "LOST",
      language: "French",
      publishedYear: "2020",
      bookQuality: "NEW",
    },
  ]; // Temporary empty array for demonstration

  const [authors, setAuthors] = useState<AuthorResponseDto[]>([]);
  const [genres, setGenres] = useState<GenreResponseDto[]>([]);

  useEffect(() => {
    // Fetch authors and genres on component mount
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await AuthorApi.getAll();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const data = await GenreApi.getAll();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 h-96 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Book List</h1>
        <BookTable
          books={books}
          className="w-full p-4 bg-green-100 rounded-md"
        />
      </div>
      <div className="block md:flex gap-4 p-4">
        <div className="w-full flex flex-col items-center h-64 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Author List</h1>
          <AuthorTable
            authors={books.map((book) => book.author)}
            className="w-full p-4 bg-green-100 rounded-md"
          />
        </div>
        <div className="w-full flex flex-col items-center h-64 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Genre List</h1>
          <GenreTable
            genres={books.map((book) => book.genre)}
            className="w-full p-4 bg-green-100 rounded-md"
          />
        </div>
      </div>
      {/* This section is stick to the bottom of the page */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <BookForm />
          <AuthorForm />
          <GenreForm />
        </div>
      </div>
    </>
  );
}
