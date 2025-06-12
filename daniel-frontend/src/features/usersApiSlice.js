import { USERS_URL, Login_URL, Register_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${Login_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${Register_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ keyword = '', pageNumber = 1 }) => ({
        url: `${USERS_URL}`,
        params: {
          keyword: keyword || undefined,
          pageNumber: pageNumber || 1,
        },
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    getMemberUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/members`,
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getAffiliates: builder.query({
      query: () => ({
        url: 'user/affiliates',
        method: 'GET',
      }),
      // Debug response
      transformResponse: (response) => {
     
        return response;
      },
      // Debug errors
      transformErrorResponse: (error) => {
        console.error("Affiliates API error:", error);
        return error;
      },
      providesTags: ['Users'],
    }),
    updateAffiliate: builder.mutation({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    getClients: builder.query({
      query: (affiliateId) => ({
        url: affiliateId ? `user/clients?affiliateId=${affiliateId}` : 'user/clients',
        method: 'GET',
      }),
      providesTags: ['Users'],
      // For debugging
      transformResponse: (response) => {
 
        return response;
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'user/profile',
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
 
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useGetMemberUserQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useGetAffiliatesQuery,
  useUpdateAffiliateMutation,
  useGetClientsQuery,
  useGetProfileQuery
} = usersApiSlice;