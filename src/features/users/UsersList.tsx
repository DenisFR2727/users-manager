import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Spinner,
    useDisclosure,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import { useDeleteUserMutation, useGetUsersQuery } from '../../services/api';
import { useCallback, useMemo, useState } from 'react';
import { EyeIcon } from './icons/EyeIcon';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';
import SkeletonTable from '../../components/Skeleton/Skeleton';

import type { IUsers } from '../../types/types';
import type { ColumnKey } from '../types';
import { columns } from '.';
import './style.scss';
import SearchByNameUser from '../../components/Search/SearchInput';
import AddUser from '../../components/Buttons/AddUser';
import ModalUser from '../../components/Modal/Modal';
import UserForm from './UserForm';

function UsersList() {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [setDeleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [editUserValue, setEditUserValue] = useState<IUsers | null>(null);

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users]);

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

    const editUser = useCallback(async (user: IUsers) => {
        setEditUserValue(user);
    }, []);

    const renderCell = useCallback(
        (user: IUsers, columnKey: ColumnKey) => {
            const cellValue = user[columnKey as keyof IUsers];

            switch (columnKey) {
                case 'index':
                    return (
                        <div className="text-center">
                            {filteredUsers.indexOf(user) + 1}
                        </div>
                    );
                case 'name':
                    return <div className="text-center">{user.name}</div>;
                case 'role':
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize ">
                                {cellValue}
                            </p>
                        </div>
                    );
                case 'email':
                    return (
                        <div className="email_user_field text-center">
                            {user.email}
                        </div>
                    );
                case 'date':
                    return (
                        <div className="date_user_field text-center">
                            {user.date}
                        </div>
                    );
                case 'actions':
                    return (
                        <div className="relative flex items-center gap-2 ">
                            <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon
                                        onClick={() =>
                                            navigate(
                                                `/users/${user.id}/${user.name}`
                                            )
                                        }
                                    />
                                </span>
                            </Tooltip>
                            <Tooltip content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <Tooltip content="Edit user">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <div
                                                onClick={() => {
                                                    editUser(user);
                                                    onOpen();
                                                }}
                                            >
                                                <EditIcon />
                                            </div>
                                        </span>
                                    </Tooltip>
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon
                                        onClick={() => deleteUser(user.id)}
                                    />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [navigate, deleteUser, editUser, onOpen, filteredUsers]
    );

    return (
        <div>
            <div className="actions_user">
                <SearchByNameUser onSearch={setSearch} />
                <AddUser onOpen={onOpen} />
            </div>
            <Table aria-label="Example table with custom cells" layout="auto">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === 'actions' ? 'start' : 'center'
                            }
                            className={
                                column.uid === 'email' || column.uid === 'date'
                                    ? 'hide-on-mobile'
                                    : ''
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={filteredUsers ?? []}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading..." />}
                    emptyContent={error && <SkeletonTable />}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell
                                    className={
                                        columnKey === 'email' ||
                                        columnKey === 'date'
                                            ? 'hide-on-mobile'
                                            : ''
                                    }
                                >
                                    {renderCell(item, columnKey as ColumnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ModalUser isOpen={isOpen} onOpenChange={onOpenChange}>
                <UserForm onClose={onClose} user={editUserValue} />
            </ModalUser>
        </div>
    );
}
export default UsersList;
