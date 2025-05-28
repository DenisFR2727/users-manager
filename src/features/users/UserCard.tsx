import { useParams } from 'react-router';

function UserCard() {
    const { id } = useParams();

    return <div>Детальна сторінка користувача з id: {id}</div>;
}

export default UserCard;
