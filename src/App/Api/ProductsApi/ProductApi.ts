import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetProductsRequest, ProductType } from '../types'
import { createQueryParams } from '../_params'
export const ProductsApi = createApi({
   reducerPath: 'ProductsApi',
   tagTypes: ['Products'],
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
   endpoints: build => ({
      getProducts: build.query<ProductType[], GetProductsRequest>({
         query: request => {
            const params = createQueryParams(request)

            return {
               url: 'products',
               params,
            }
         },

         providesTags: [{ type: 'Products', id: 'LIST' }],
      }),

      getProductById: build.query<ProductType, string | undefined>({
         query: id => `products/${id}`,
         providesTags: [{ type: 'Products', id: 'LIST' }],
      }),

      addCommentToProduct: build.mutation({
         query(payload) {
            return {
               url: `products/${payload.id}`,
               method: 'PUT',
               body: payload,
            }
         },
         invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),

      deleteComment: build.mutation({
         query(payload) {
            return {
               url: `products/${payload.id}`,
               method: 'PATCH',
               body: payload,
            }
         },
         invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),
   }),
})

export const {
   useGetProductsQuery,
   useGetProductByIdQuery,
   useAddCommentToProductMutation,
   useDeleteCommentMutation,
} = ProductsApi

