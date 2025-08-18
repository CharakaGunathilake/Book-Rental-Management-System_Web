import { BookTable } from "@/components/tables/BookTable";
import type {
  AvailabilityStatus,
  BookRequestDto,
  BookResponseDto,
} from "@/types/Books";
import { BookForm } from "./BookForm";
import { useEffect, useState } from "react";
import { AuthorTable } from "@/components/tables/AuthorTable";
import { AuthorApi } from "@/api/AuthorApi";
import { GenreApi } from "@/api/GenreApi";
import type { AuthorRequestDto, AuthorResponseDto } from "@/types/Author";
import type { GenreRequestDto, GenreResponseDto } from "@/types/Genre";
import { GenreTable } from "@/components/tables/GenreTable";
import { GenreForm } from "./GenreForm";
import { AuthorForm } from "./AuthorForm";
import { BookApi } from "@/api/BookApi";
import { toast } from "sonner";

export default function BookList() {
  const [books, setBooks] = useState<BookResponseDto[]>([]);
  const [authors, setAuthors] = useState<AuthorResponseDto[]>([]);
  const [genres, setGenres] = useState<GenreResponseDto[]>([]);

  useEffect(() => {
    // Fetch authors and genres on component mount
    fetchAuthors();
    fetchGenres();
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const {data} = await BookApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const {data} = await AuthorApi.getAll();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const {data} = await GenreApi.getAll();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const createAuthor = async (author: AuthorRequestDto) => {
    try {
      const {data, status} = await AuthorApi.create(author);
      if (status === 201) {
        setAuthors([...authors, data]);
        toast.success("Author created successfully!");
      }
    } catch (error) {
      console.error("Error creating author:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const createGenre = async (genre: GenreRequestDto) => {
    try {
      const {data, status} = await GenreApi.create(genre);
      if (status === 201) {
        setGenres([...genres, data]);
        toast.success("Genre created successfully!");
      }
    } catch (error) {
      console.error("Error creating genre:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const createBook = async (book: BookRequestDto) => {
    try {
      console.log(book);
      const {data, status} = await BookApi.create(book);
      if (status === 201) {
        setBooks([...books, data]);
        toast.success("Book created successfully!");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const updateBook = async (id: number, book: BookRequestDto) => {
    try {
      const {data, status} = await BookApi.update(id, book);
      if (status === 200) {
        setBooks(books.map((b) => (b.id === id ? data : b)));
        toast.success("Book updated successfully!");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const {status} = await BookApi.delete(id);
      if (status === 200) {
        setBooks(books.filter((b) => b.id !== id));
        toast.success("Book deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const updateStatus = async (id: number, status: AvailabilityStatus) => {
    try {
      // Find the book first
      const book = books.find((b) => b.id === id);
      if (!book) {
        console.warn(`Book with id ${id} not found`);
        return;
      }

      // Exit early if status is unchanged
      if (book.availabilityStatus === status) return;

      // Optional: optimistic update (UI shows change immediately)
      setBooks((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, AvailabilityStatus: status } : b
        )
      );

      // Call backend API
      const {data} = await BookApi.updateStatus(id, status);

      // Ensure you get the updated book from API response
      const updatedBook = data; // adjust according to your API structure

      // Update state with accurate backend data
      setBooks((prev) => prev.map((b) => (b.id === id ? updatedBook : b)));

      toast.success("Book status updated successfully!");
    } catch (error) {
      console.error("Error updating book status:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const updateAuthor = async (id: number, author: AuthorRequestDto) => {
    try {
      const { data, status } = await AuthorApi.update(id, author);
      if (status === 200) {
        setAuthors(authors.map((a) => (a.id === id ? data : a)));
        toast.success("Author updated successfully!");
      }
    } catch (error) {
      console.error("Error updating author:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const deleteAuthor = async (id: number) => {
    try {
      const { data } = await AuthorApi.delete(id);
      if (data.status === 200) {
        setAuthors(authors.filter((a) => a.id !== id));
        toast.success("Author deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const updateGenre = async (id: number, genre: GenreRequestDto) => {
    try {
      const { data, status } = await GenreApi.update(id, genre);
      if (status === 200) {
        setGenres(genres.map((g) => (g.id === id ? data : g)));
        toast.success("Genre updated successfully!");
      }
    } catch (error) {
      console.error("Error updating genre:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const deleteGenre = async (id: number) => {
    try {
      const data = await GenreApi.delete(id);

      toast.success("Genre deleted successfully!");
      if (data.status === 200) {
        setGenres(genres.filter((g) => g.id !== id));
        toast.success("Genre deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting genre:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 h-96 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Book List</h1>
        <BookTable
          books={books}
          className="w-full p-4 bg-green-100 rounded-md"
          onUpdate={(id: number, data: BookRequestDto) => updateBook(id, data)}
          onDelete={(id: number) => deleteBook(id)}
          onStatusChange={(id: number, status: AvailabilityStatus) =>
            updateStatus(id, status)
          }
        />
      </div>
      <div className="block md:flex gap-4 p-4">
        <div className="w-full flex flex-col items-center h-64 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Author List</h1>
          <AuthorTable
            authors={authors}
            className="w-full p-4 bg-green-100 rounded-md"
            onUpdate={(id: number, data: AuthorRequestDto) =>
              updateAuthor(id, data)
            }
            onDelete={(id: number) => deleteAuthor(id)}
          />
        </div>
        <div className="w-full flex flex-col items-center h-64 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Genre List</h1>
          <GenreTable
            genres={genres}
            className="w-full p-4 bg-green-100 rounded-md"
            onUpdate={(id: number, data: GenreRequestDto) =>
              updateGenre(id, data)
            }
            onDelete={(id: number) => deleteGenre(id)}
          />
        </div>
      </div>
      {/* This section is stick to the bottom of the page */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <BookForm onAdd={(book: BookRequestDto) => createBook(book)} />
          <AuthorForm
            onAdd={(author: AuthorRequestDto) => createAuthor(author)}
          />
          <GenreForm onAdd={(data: GenreRequestDto) => createGenre(data)} />
        </div>
      </div>
    </>
  );
}
