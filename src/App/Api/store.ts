import { configureStore } from "@reduxjs/toolkit";
import { ProductsApi } from "./ProductsApi/ProductApi";
import { CartApi } from "./CartApi/CartApi";
import { AuthApi } from "./AuthApi/AuthApi";
import { FavoritesApi } from "./FavoritesApi/FavoritesApi";
import { ProductCountApi } from "./ProductsCountApi/ProductsCountApi";

export const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [FavoritesApi.reducerPath]: FavoritesApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ProductCountApi.reducerPath]: ProductCountApi.reducer,
 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProductsApi.middleware)
      .concat(CartApi.middleware)
      .concat(FavoritesApi.middleware)
      .concat(AuthApi.middleware)
      .concat(ProductCountApi.middleware)
     
});
