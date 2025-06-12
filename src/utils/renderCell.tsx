import type { NavigateFunction } from 'react-router';
import type { ColumnKey } from '../features/types';
import { EditIcon } from '../features/users/icons/EditIcon';
import type { IUsers } from '../types/types';
import { Tooltip } from '@heroui/react';
import { EyeIcon } from '../features/users/icons/EyeIcon';
import { DeleteIcon } from '../features/users/icons/DeleteIcon';

interface RenderCellProps {
    user: IUsers;
    columnKey: ColumnKey;
    navigate: NavigateFunction;
    editUser: (user: IUsers) => void;
    deleteUser: (id: string | undefined) => void;
    onOpen: () => void;
    filteredUsers: IUsers[];
}

export const renderUserCell = ({
    user,
    columnKey,
    navigate,
    editUser,
    deleteUser,
    onOpen,
    filteredUsers,
}: RenderCellProps) => {
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
                    <p className="text-bold text-sm capitalize ">{cellValue}</p>
                </div>
            );
        case 'email':
            return (
                <div className="email_user_field text-center">{user.email}</div>
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
                                    navigate(`/users/${user.id}/${user.name}`)
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
                            <DeleteIcon onClick={() => deleteUser(user.id)} />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
};
