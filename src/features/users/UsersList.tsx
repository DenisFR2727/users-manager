import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import { useGetUsersQuery } from '../../services/api';
import { useCallback } from 'react';
import { EyeIcon } from './icons/EyeIcon';
import { EditIcon } from './icons/EditIcon';
import { DeleteIcon } from './icons/DeleteIcon';

import type { IUsers } from '../../types/types';
import type { ColumnKey, Columns } from '../types';

const columns: Columns[] = [
    { name: 'ID', uid: 'id' },
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'Date', uid: 'date' },
    { name: 'ACTIONS', uid: 'actions' },
];

function UsersList() {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const navigate = useNavigate();

    const renderCell = useCallback(
        (user: IUsers, columnKey: ColumnKey) => {
            const cellValue = user[columnKey as keyof IUsers];

            switch (columnKey) {
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
                    return <div className="text-start">{user.email}</div>;
                case 'actions':
                    return (
                        <div className="relative flex items-center gap-2">
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
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [navigate]
    );

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка при завантаженні</p>;

    return (
        <Table aria-label="Example table with custom cells" layout="auto">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === 'actions' ? 'start' : 'center'}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey as ColumnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
export default UsersList;
