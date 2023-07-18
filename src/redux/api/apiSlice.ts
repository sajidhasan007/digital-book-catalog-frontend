import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://degital-book-catalog.vercel.app/api/v1',
  }),
  tagTypes: ['comments', 'bookList', 'singleBook'],
  endpoints: () => ({}),
});
