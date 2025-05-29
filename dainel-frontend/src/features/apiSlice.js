import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { getAuthToken } from '../utils/authUtils';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      // Only add auth for protected endpoints
      if (endpoint !== 'login') {
        const token = getAuthToken();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
          console.log(`Auth header set for ${endpoint}`);
        } else {
          console.warn(`No auth token for ${endpoint}`);
        }
      }
      
      // Add content-type header
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({}),
});