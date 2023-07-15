import { api } from '@/redux/api/apiSlice';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: { ...data },
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `users/register`,
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
