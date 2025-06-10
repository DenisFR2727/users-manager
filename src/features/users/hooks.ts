import { useCallback, useMemo } from 'react';
import type { IUsers } from '../../types/types';
import { useDeleteUserMutation, useGetUsersQuery } from '../../services/api';
import { setEditUserValue } from './UsersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const useUserActions = () => {
    const dispatch = useAppDispatch();
    const { data: users } = useGetUsersQuery();
    const [setDeleteUser] = useDeleteUserMutation();
    const search = useAppSelector((state) => state.users.search);
    const filteredRole = useAppSelector((state) => state.users.role);
    const isOpenModal = useAppSelector((state) => state.users.isOpenModal);

    const filteredUsers = useMemo(() => {
        if (!users) return [];

        let res = users;

        if (!isOpenModal && filteredRole && filteredRole !== 'All') {
            res = users.filter((user) => user.role === filteredRole);
        }

        return res.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users, filteredRole, isOpenModal]);

    const deleteUser = useCallback(
        async (userId: string | undefined) => {
            try {
                await setDeleteUser(userId).unwrap();
            } catch (error) {
                console.error('Failed to delete user', error);
            }
        },
        [setDeleteUser]
    );

    const editUser = useCallback(
        async (user: IUsers) => {
            dispatch(setEditUserValue(user));
        },
        [dispatch]
    );

    return { filteredUsers, deleteUser, editUser };
};
