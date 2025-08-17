import type { AuthorResponseDto } from "./Author";
import type { GenreResponseDto } from "./Genre";

type BookRequestDto = {
    title: string;
    summary: string;
    authorId: number;
    genreId: number;
    language: string;
    publishedYear: string;
    bookQuality: string;
}

type BookResponseDto = {
    id: number;
    title: string;
    summary: string;
    bookCode: string;
    author: AuthorResponseDto;
    genre: GenreResponseDto;
    AvailabilityStatus: string;
    language: string;
    publishedYear: string;
    bookQuality: string;
}

export type { BookRequestDto, BookResponseDto };
