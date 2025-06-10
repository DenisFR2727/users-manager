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
import { useGetUsersQuery } from '../../services/api';
import { useCallback } from 'react';
import { EyeIcon, EditIcon, DeleteIcon } from './icons/icons';
import SkeletonTable from '../../components/Skeleton/Skeleton';

import type { IUsers } from '../../types/types';
import type { ColumnKey } from '../types';
import { columns } from '.';
import SearchByNameUser from '../../components/Search/SearchInput';
import AddUser from '../../components/Buttons/AddUser';
import ModalUser from '../../components/Modal/Modal';
import UserForm from './UserForm';
import { useUserActions } from './hooks';
import { setEditUserValue, setSearch } from './UsersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import RadioSelectRole from '../../components/Checkbox/RadioGroupSelect';
import './style.scss';

function UsersList() {
    const dispatch = useAppDispatch();
    const { error, isLoading } = useGetUsersQuery();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { filteredUsers, deleteUser, editUser } = useUserActions();
    const editUserValue = useAppSelector((state) => state.users.editUserValue);

    const navigate = useNavigate();

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
                case 'createdAt':
                    return (
                        <div className="date_user_field text-center">
                            {user?.createdAt}
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
            <div>
                <div className="actions_user">
                    <SearchByNameUser
                        onSearch={(value) => dispatch(setSearch(value))}
                    />
                    <AddUser
                        onOpen={() => {
                            dispatch(setEditUserValue(null));
                            onOpen();
                        }}
                    />
                </div>
                <div className="check-role">
                    <RadioSelectRole />
                </div>
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
                                column.uid === 'email' ||
                                column.uid === 'createdAt'
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
                                        columnKey === 'createdAt'
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
