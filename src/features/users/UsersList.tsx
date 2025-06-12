import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    useDisclosure,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import { useGetUsersQuery } from '../../services/api';
import { useCallback } from 'react';
import SkeletonTable from '../../components/Skeleton/Skeleton';
import { columns } from '.';
import SearchByNameUser from '../../components/Search/SearchInput';
import AddUser from '../../components/Buttons/AddUser';
import ModalUser from '../../components/Modal/Modal';
import UserForm from './UserForm';
import { useUserActions } from './hooks';
import { setEditUserValue, setSearch } from './UsersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import RadioSelectRole from '../../components/Checkbox/RadioGroupSelect';
import { renderUserCell } from '../../utils/renderCell';
// Types
import type { IUsers } from '../../types/types';
import type { ColumnKey } from '../types';

import './style.scss';

function UsersList() {
    const dispatch = useAppDispatch();
    const { error, isLoading } = useGetUsersQuery();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { filteredUsers, deleteUser, editUser } = useUserActions();
    const editUserValue = useAppSelector((state) => state.users.editUserValue);

    const navigate = useNavigate();

    const renderCell = useCallback(
        (user: IUsers, columnKey: ColumnKey) =>
            renderUserCell({
                user,
                columnKey,
                navigate,
                editUser,
                deleteUser,
                onOpen,
                filteredUsers,
            }),
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
