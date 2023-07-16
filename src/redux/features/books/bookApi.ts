import { api } from '@/redux/api/apiSlice';
import Cookies from 'js-cookie';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/book',
      providesTags: ['bookList'],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ['singleBook'],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/book/create-book`,
        method: 'POST',
        body: { ...data },
        headers: { authorization: Cookies.get('token') },
      }),
      invalidatesTags: ['bookList'],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: { ...data },
        headers: { authorization: Cookies.get('token') },
      }),
      invalidatesTags: ['singleBook'],
    }),
    dleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
        headers: { authorization: Cookies.get('token') },
      }),
      invalidatesTags: ['bookList'],
    }),
    getBookReview: builder.query({
      query: (id) => ({
        url: `/review/${id}`,
        headers: { authorization: Cookies.get('token') },
      }),
      providesTags: ['comments'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/review/create-review`,
        method: 'POST',
        body: { ...data },
        headers: { authorization: Cookies.get('token') },
      }),
      invalidatesTags: ['comments'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDleteBookMutation,
  useGetBookReviewQuery,
  useCreateReviewMutation,
} = bookApi;
