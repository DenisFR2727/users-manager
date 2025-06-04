type Role = 'Admin' | 'User' | 'Guest';

export interface IUsers {
    index?: number;
    id?: string;
    name: string;
    email: string;
    role: Role | string;
    date?: string;
}
