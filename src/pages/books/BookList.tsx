import { BookTable } from "@/components/tables/BookTable";
import { Button } from "@/components/ui/button";
import type { BookResponseDto } from "@/types/Books";

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
      AvailabilityStatus: "Available",
      language: "English",
      publishedYear: "2022",
      bookQuality: "Good",
    },
    {
      id: 2,
      title: "Another Book",
      summary: "This is another sample book.",
      bookCode: "XYZ456",
      author: { id: 2, name: "Jane Smith", biography: "Another author." },
      genre: { id: 2, name: "Non-Fiction" },
      AvailabilityStatus: "Unavailable",
      language: "Spanish",
      publishedYear: "2021",
      bookQuality: "Fair",
    },
    {
      id: 3,
      title: "Third Book",
      summary: "This is the third sample book.",
      bookCode: "LMN789",
      author: { id: 3, name: "Bob Johnson", biography: "A third author." },
      genre: { id: 3, name: "Mystery" },
      AvailabilityStatus: "Available",
      language: "French",
      publishedYear: "2020",
      bookQuality: "Excellent",
    },
  ]; // Temporary empty array for demonstration
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Book List</h1>
        <BookTable
          books={books}
          className="w-full p-4 bg-green-100 rounded-md"
        />
      </div>
      {/* This section is stick to the bottom of the page */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 pb-5 shadow-md">
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button className="bg-green-500 hover:bg-green-600">Add Book</Button>
        </div>
      </div>
    </>
  );
}
