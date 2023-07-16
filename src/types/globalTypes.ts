export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export interface option {
  value: string | number | null;
  label: string | number;
}

export const genreOptions: option[] = [
  { value: null, label: 'All' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Motivation', label: 'Motivation' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Fiction', label: 'Fiction' },
  { value: 'Romantic', label: 'Romantic' },
];
