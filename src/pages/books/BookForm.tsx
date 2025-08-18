import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthorApi } from "@/api/AuthorApi";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { GenreApi } from "@/api/GenreApi";
import type { AuthorResponseDto } from "@/types/Author";
import type { GenreResponseDto } from "@/types/Genre";
import { toast } from "sonner";

type BookRequestDto = {
  title: string;
  summary: string;
  authorId: number;
  genreId: number;
  language: string;
  publishedYear: string;
  bookQuality: string;
};

interface Props {
  onAdd: (data: BookRequestDto) => Promise<void>;
}

export const BookForm: React.FC<Props> = ({ onAdd }) => {
  const [book, setBook] = useState<BookRequestDto>({
    title: "",
    summary: "",
    authorId: 0,
    genreId: 0,
    language: "",
    publishedYear: "",
    bookQuality: "",
  });

  const [authors, setAuthors] = useState<AuthorResponseDto[]>([]);
  const [genres, setGenres] = useState<GenreResponseDto[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (field: keyof BookRequestDto, value: unknown) => {
    setBook((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onAdd(book);
    setOpen(false);
  };

  useEffect(() => {
    // Fetch authors and genres on component mount
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchAuthors = async () => {
    try {
      const { data, status } = await AuthorApi.getAll();
      if (status === 200) {
        setAuthors(data);
        return;
      }
      setAuthors([]);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const { data, status } = await GenreApi.getAll();
      if (status === 200) {
        setGenres(data);
        return;
      }
      setGenres([]);
    } catch (error) {
      console.error("Error fetching genres:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600"
        >
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={book.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Input
              id="summary"
              value={book.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Select
                onValueChange={(value) =>
                  handleChange("authorId", authors.find((a) => a.name === value)?.id ?? 0)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>

                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.name}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                onValueChange={(value) => {
                  const genre = genres.find((g) => g.name === value);
                  if (genre) {
                    handleChange("genreId", genre.id);
                  }
                  
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>

                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bookQuality">Book Quality</Label>
              <Select
                onValueChange={(value) => handleChange("bookQuality", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="GOOD">Good</SelectItem>
                  <SelectItem value="POOR">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value={book.language}
              onChange={(e) => handleChange("language", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="publishedYear">Published Year</Label>
            <Input
              id="publishedYear"
              type="text"
              value={book.publishedYear}
              onChange={(e) => handleChange("publishedYear", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Add Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
