/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/redux/api/apiSlice';
import Cookies from 'js-cookie';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params: any) => ({
        url: '/book',
        params,
        queryParamSerializers: {
          // Exclude null values from being serialized
          default: (paramValue: any) => {
            if (paramValue === null) {
              return undefined;
            }
            return paramValue;
          },
        },
      }),
      providesTags: ['bookList'],
    }),
    singleBook: builder.query({
      query: (id) => ({
        url: `/book/${id}`,
        headers: { authorization: Cookies.get('token') },
      }),
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
    getFavoriteList: builder.query({
      query: (id) => ({
        url: `/favourite-list/${id}`,
        headers: { authorization: Cookies.get('token') },
      }),
    }),
    createFavoriteList: builder.mutation({
      query: (data) => ({
        url: `/favourite-list/create-favourite`,
        method: 'POST',
        body: { ...data },
        headers: { authorization: Cookies.get('token') },
      }),
      invalidatesTags: ['comments'],
    }),
    dleteFavoriteList: builder.mutation({
      query: (id) => ({
        url: `/favourite-list/` + id,
        method: 'DELETE',
        body: { book: id },
        headers: { authorization: Cookies.get('token') },
      }),
      invalidatesTags: ['bookList'],
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
  useCreateFavoriteListMutation,
  useDleteFavoriteListMutation,
  useGetFavoriteListQuery,
} = bookApi;
