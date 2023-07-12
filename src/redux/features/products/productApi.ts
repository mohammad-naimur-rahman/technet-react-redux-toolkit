import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/products',
    }),
    getProduct: build.query({
      query: (id) => `/product/${id}`,
    }),
    postComment: build.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: build.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostCommentMutation,
  useGetCommentQuery,
} = productApi;
