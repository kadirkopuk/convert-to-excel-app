/* eslint-disable @typescript-eslint/ban-types */
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '../store';

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).user.token;

//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
//   const result = await baseQuery(args, api, extraOptions);

//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
// });

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
