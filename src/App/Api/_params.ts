import { GetProductsRequest } from '../Api/types'
export const createQueryParams = ({
   inputValue,
   pagination,
   updateFilters,
   sortPrice,
}: GetProductsRequest) => {
   const params = new URLSearchParams()

   if (inputValue) {
      params.append('title_like', inputValue)
   }

   if (pagination) {
      params.append('_page', pagination.toString())
      params.append('_limit', '10')
   }

   if (sortPrice) {
      params.append('_sort', 'price')
      params.append('_order', sortPrice)
   }

   if (updateFilters?.category) {
      updateFilters.category.forEach(category => {
         params.append('category', category)
      })
   }

   if (updateFilters?.searchPrice) {
      params.append('price_gte', updateFilters.searchPrice[0].toString())
      params.append('price_lte', updateFilters.searchPrice[1].toString())
   }

   return params
}

// export const ProductsApi = createApi({
//   reducerPath: "ProductsApi",
//   tagTypes: ["Products"],
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
//   endpoints: (build) => ({
//     getProducts: build.query<ProductType[], GetProductsRequest>({
//       query: ({ applyFilters, inputValue, asc }) => {
//         const ascDesc = asc ? `&_sort=price&_order=${asc}` : "";
//         const search = inputValue ? `&title_like=${inputValue}` : "";
//         const filtered =
//           applyFilters?.category?.length && applyFilters?.category?.length >= 1
//             ? applyFilters.category
//                 ?.map((category) => `category=${category}`)
//                 .join("&")
//             : "";
//         const priceSort = applyFilters.searchPrice
//           ? `&price_gte=${applyFilters.searchPrice.from}&price_lte=${applyFilters.searchPrice.to}`
//           : "";

//         return `products?${filtered}${priceSort}${search}${ascDesc}`;
//       },
//       providesTags: [{ type: "Products", id: "LIST" }],
//     }),
