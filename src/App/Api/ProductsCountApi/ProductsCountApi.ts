import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ProductType } from "../types"
export const ProductCountApi = createApi({
  reducerPath: "ProductCountApi",
  tagTypes: ["Count"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: build => ({
    getTotalProducts: build.query<ProductType[], void>({
      query: () => "products",
      providesTags: [{ type: "Count", id: "LIST" }],
    }),
  }),
})

export const { useGetTotalProductsQuery } = ProductCountApi
