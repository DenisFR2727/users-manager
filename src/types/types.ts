// type Role = 'Admin' | 'User' | 'Guest';

export interface IUsers {
    id?: string;
    name: string;
    email: string;
    role: string;
    date?: string;
}
