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
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'User' as const,
                              id,
                          })),
                          { type: 'User', id: 'LIST' },
                      ]
                    : [{ type: 'User', id: 'LIST' }],
        }),
        addPostUser: builder.mutation<IUsers, Partial<IUsers>>({
            query(body) {
                return {
                    url: `users`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        deleteUser: builder.mutation<void, string | undefined>({
            query(id) {
                return {
                    url: `users/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...user }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddPostUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = usersApi;
