import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setRoleUser } from '../../features/users/UsersSlice';
import { Radio, RadioGroup } from '@heroui/react';
import './RadioSelectRole.scss';

export default function RadioSelectRole() {
    const dispatch = useAppDispatch();
    const selectedRole = useAppSelector((state) => state.users.role);

    const handleChange = (value: string) => {
        dispatch(setRoleUser(value));
    };

    return (
        <RadioGroup
            label="Select Role"
            orientation="horizontal"
            value={selectedRole}
            onValueChange={handleChange}
        >
            <Radio name="All" value="All">
                <span className="item-radio">All</span>
            </Radio>
            <Radio name="Admin" value="Admin">
                <span className="item-radio">Admin</span>
            </Radio>
            <Radio name="User" value="User">
                <span className="item-radio">User</span>
            </Radio>
            <Radio name="Guest" value="Guest">
                <span className="item-radio">Guest</span>
            </Radio>
        </RadioGroup>
    );
}
