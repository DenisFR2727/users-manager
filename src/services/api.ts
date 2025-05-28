import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUsers } from '../types/types';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://68346b2a464b49963602beca.mockapi.io',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<IUsers[] | undefined, void>({
            query: () => `users`,
            providesTags: (users) =>
                users
                    ? [
                          ...users.map(({ id }) => ({
                              type: 'User' as const,
                              id,
                          })),
                          { type: 'User', id: 'LIST' },
                      ]
                    : [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
