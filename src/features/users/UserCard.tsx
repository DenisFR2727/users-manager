import { useParams } from 'react-router';
import { useGetUsersQuery } from '../../services/api';
import { useEffect, useState } from 'react';
import type { IUsers } from '../../types/types';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Link,
} from '@heroui/react';

function UserCard() {
    const { id } = useParams();
    const { data: users } = useGetUsersQuery();
    const [user, setUser] = useState<IUsers | undefined>(undefined);

    useEffect(() => {
        if (!users || !id) return;

        const currentVievUser = users.find((user) => user.id === id);
        setUser(currentVievUser);
    }, [users, id]);

    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">HeroUI</p>
                    <p className="text-large text-default-500">
                        User ID: {user?.id}
                    </p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="text-black">NAME: {user?.name}</p>
            </CardBody>
            <Divider />
            <CardBody>
                <p className="text-black">ROLE: {user?.role}</p>
            </CardBody>
            <Divider />
            <CardBody>
                <p className="text-black">EMAIL: {user?.email}</p>
            </CardBody>
            <Divider />
            <CardBody>
                <p className="text-black">DATE CREATE: {user?.createdAt}</p>
            </CardBody>
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/DenisFR2727/users-manager"
                >
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
}

export default UserCard;
