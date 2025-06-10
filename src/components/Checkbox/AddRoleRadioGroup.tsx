import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAddRole } from '../../features/users/UsersSlice';
import { Radio, RadioGroup } from '@heroui/react';
import './RadioSelectRole.scss';

export default function AddRoleRadioGroup() {
    const dispatch = useAppDispatch();

    const addRole = useAppSelector((state) => state.users.addRole);
    const isOpenModal = useAppSelector((state) => state.users.isOpenModal);

    const handleChange = (value: string) => {
        if (isOpenModal) {
            dispatch(setAddRole(value));
        }
    };

    return (
        <RadioGroup
            label="Select Role"
            orientation="horizontal"
            value={addRole}
            onValueChange={handleChange}
        >
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
