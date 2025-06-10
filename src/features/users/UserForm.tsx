import { Button, Form, Input } from '@heroui/react';
import './style.scss';
import type { IUsers } from '../../types/types';
import {
    useAddPostUserMutation,
    useUpdateUserMutation,
} from '../../services/api';
import { useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import AddRoleRadioGroup from '../../components/Checkbox/AddRoleRadioGroup';
import { useDispatch } from 'react-redux';
import { clearAddRoleAfterUpdate } from './UsersSlice';

interface ModalFormProps {
    onClose: () => void;
    user: IUsers | null;
}
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function UserForm({ onClose, user }: ModalFormProps) {
    const dispatch = useDispatch();
    const [addUser] = useAddPostUserMutation();
    const [updateUserValue] = useUpdateUserMutation();
    const addRole = useAppSelector((state) => state.users.addRole);
    const [roleInputValue, setRoleInputValue] = useState(user?.role ?? '');

    const getDate = new Date();
    const currentDate = getDate.toLocaleDateString();

    useEffect(() => {
        if (addRole) {
            setRoleInputValue(addRole);
        } else if (user?.role) {
            setRoleInputValue(user?.role);
        }
    }, [addRole, user]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as Record<string, string>;

        const newUser: IUsers = {
            name: data.name,
            email: data.email,
            role: capitalize(data.role),
            createdAt: currentDate,
        };
        if (user) {
            const updatedUser: Partial<Omit<IUsers, 'createdAt'>> = {
                name: data.name,
                email: data.email,
                role: data.role,
            };
            await updateUserValue({ id: user.id!, ...updatedUser });
            dispatch(clearAddRoleAfterUpdate(''));
            console.log('update user', user);
        } else {
            await addUser(newUser);
            dispatch(clearAddRoleAfterUpdate(''));
            console.log('Created user:', newUser);
        }

        onClose();
    };
    return (
        <div className="form-user">
            <h2>{user ? 'Edit User' : 'Add User'}</h2>
            <Form onSubmit={onSubmit}>
                <Input
                    name="name"
                    defaultValue={user?.name ?? ''}
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    variant="bordered"
                    errorMessage="Please enter a valid name"
                />
                <AddRoleRadioGroup />
                <Input
                    name="role"
                    value={roleInputValue}
                    isRequired
                    label="Role"
                    placeholder="Enter your role"
                    type="text"
                    variant="bordered"
                    errorMessage="Please enter a valid role"
                />
                <Input
                    name="email"
                    defaultValue={user?.email ?? ''}
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    errorMessage="Please enter a valid email"
                />
                <div className="add-user">
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </div>
    );
}
export default UserForm;
