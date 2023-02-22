export interface AdminFilmState {
  title: string;
  types: string;
  image: string;
  description: string;
  rating: string;
}

export interface AdminScreeningState {
  filmId: string;
  premiere: boolean;
  date: string;
  hours: Array<string>;
}
