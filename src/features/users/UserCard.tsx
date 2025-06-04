import { useParams } from 'react-router';
import { useGetUsersQuery } from '../../services/api';
import { useEffect, useState } from 'react';
import type { IUsers } from '../../types/types';

function UserCard() {
    const { id } = useParams();
    const { data: users } = useGetUsersQuery();
    const [user, setUser] = useState<IUsers | undefined>(undefined);

    useEffect(() => {
        if (!users || !id) return;

        const currentVievUser = users.find((user) => user.id === id);
        setUser(currentVievUser);
    }, [users, id]);

    return <div>{user?.name}</div>;
}

export default UserCard;
