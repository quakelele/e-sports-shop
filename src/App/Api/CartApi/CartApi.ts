import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../types";

export const CartApi = createApi({
    reducerPath: "CartApi",
    tagTypes: ["Cart"],
    baseQuery: fetchBaseQuery({ baseUrl: "https://e-sports-api-ivory.vercel.app/" }),
    endpoints: (build) => ({

      getCart: build.query<ProductType[], void>({
        query: () => "cart",
        providesTags: [{ type: "Cart", id: "LIST" }],
      }),

      addToCart: build.mutation<void, ProductType>({
        query: (body) => ({
          url: "cart",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "Cart", id: "LIST" }],
      }),

      deleteProduct: build.mutation<void, string | number>({
        query: (id) => ({
          url: `cart/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Cart", id: "LIST" }],
      }),

      updateProduct: build.mutation<void, ProductType>({
        query(payload) {
          return {
            url: `cart/${payload.id}`,
            method: "PATCH",
            body: payload,
          };
        },
        invalidatesTags: [{ type: "Cart", id: "LIST" }],
      }),
      
    }),
  });
  
  export const {
    useUpdateProductMutation,
    useGetCartQuery,
    useAddToCartMutation,
    useDeleteProductMutation,

  } = CartApi;