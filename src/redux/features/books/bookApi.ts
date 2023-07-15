import { api } from '@/redux/api/apiSlice';
import Cookies from 'js-cookie';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/book',
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    getBookReview: builder.query({
      // query: (id) => `/review/${id}`,
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
  useGetBookReviewQuery,
  useCreateReviewMutation,
} = bookApi;
