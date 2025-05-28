type Role = 'Admin' | 'User' | 'Guest';

export interface IUsers {
    id: string;
    name: string;
    email: string;
    role: Role;
    date: string;
}

export type ColumnKey = keyof IUsers | 'actions';

export interface Columns {
    name: string;
    uid: string;
}
