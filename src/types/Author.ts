type AuthorRequestDto = {
  name: string;
  biography: string;
};

type AuthorResponseDto = {
  id: number;
  name: string;
  biography: string;
};

export type { AuthorRequestDto, AuthorResponseDto };
