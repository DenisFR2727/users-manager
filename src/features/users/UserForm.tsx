import { Button, Form, Input } from '@heroui/react';
import './style.scss';
import type { IUsers } from '../../types/types';
import {
    useAddPostUserMutation,
    useUpdateUserMutation,
} from '../../services/api';

interface ModalFormProps {
    onClose: () => void;
    user: IUsers | null;
}
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function UserForm({ onClose, user }: ModalFormProps) {
    const [addUser] = useAddPostUserMutation();
    const [updateUserValue] = useUpdateUserMutation();
    const getDate = new Date();
    const currentDate = getDate.toLocaleDateString();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData) as Record<string, string>;

        const newUser: IUsers = {
            name: data.name,
            email: data.email,
            role: capitalize(data.role),
            date: currentDate,
        };
        if (user) {
            const updatedUser: Partial<Omit<IUsers, 'date'>> = {
                name: data.name,
                email: data.email,
                role: data.role,
            };
            await updateUserValue({ id: user.id!, ...updatedUser });
            console.log('update user', user);
        } else {
            await addUser(newUser);
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
                <Input
                    name="role"
                    defaultValue={user?.role ?? ''}
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
