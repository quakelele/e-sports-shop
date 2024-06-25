import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ProductType } from "../types"

export const FavoritesApi = createApi({
  reducerPath: "FavoritesApi",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: (build) => ({
    getFavoriteProducts: build.query<ProductType[], void>({
      query: () => "favorites",
      providesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    addToFavorites: build.mutation<void, ProductType>({
      query: (body) => ({
        url: "favorites",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    deleteFavoriteProduct: build.mutation<void, string | number>({
      query: (id) => ({
        url: `favorites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
})

export const {
  useAddToFavoritesMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} = FavoritesApi
