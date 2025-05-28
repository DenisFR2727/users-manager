import type { IUsers } from '../types/types';

export type ColumnKey = keyof IUsers | 'actions';

export interface Columns {
    name: string;
    uid: string;
}
