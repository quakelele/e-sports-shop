import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersType } from "../types";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  tagTypes: ["Users"],

  baseQuery: fetchBaseQuery({ baseUrl: "https://e-sports-api-ivory.vercel.app/" }),
  endpoints: (build) => ({
    addUser: build.mutation<UsersType, unknown>({
      query(body) {
        return {
          url: "users",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    // GET USERS
    checkUserAuth: build.query<UsersType[], unknown>({
      query: () => "users",
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useAddUserMutation, useCheckUserAuthQuery } = AuthApi;
