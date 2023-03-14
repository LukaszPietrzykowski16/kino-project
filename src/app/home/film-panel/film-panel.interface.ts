export interface FilmData {
  title: string;
  hour: string;
}

export interface Screening {
  filmId: number;
  premiere: boolean;
  date: string;
  hours: Array<string>;
}

export interface Film {
  id: number;
  title: string;
  types: string;
  image: string;
  description: string;
  rating: number;
  length: number;
}

export interface Ratings {
  id: number;
  userId: number;
  filmId: number;
  rating: number;
}

export interface UserMovies {
  movies: Array<Number>;
  ratings: Array<Ratings>;
}

export interface User {
  email: string;
  password: string;
  type: string;
  id: number;
  movies: Array<String>;
}

export interface Repertoire {
  filmId: number;
  premiere: boolean;
  rating: number;
  date: string;
  hours: Array<string>;
  film: Film;
}

export interface WantToWatchFilms {
  id: number;
  userId: number;
  filmId: number;
  rating: number;
}
