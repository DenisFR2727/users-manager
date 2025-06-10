import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUsers } from '../../types/types';

interface InitialState {
    search: string;
    editUserValue: IUsers | null;
    role: string;
    addRole: string;
    isOpenModal: boolean;
}

const initialState: InitialState = {
    search: '',
    editUserValue: null,
    role: 'All',
    addRole: '',
    isOpenModal: false,
};

const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setEditUserValue(state, action: PayloadAction<IUsers | null>) {
            state.editUserValue = action.payload;
        },
        setRoleUser(state, action: PayloadAction<string>) {
            state.role = action.payload;
        },
        setIsOpenModal(state, action: PayloadAction<boolean>) {
            state.isOpenModal = action.payload;
        },
        setAddRole(state, action: PayloadAction<string>) {
            state.addRole = action.payload;
        },
        clearAddRoleAfterUpdate(state, action: PayloadAction<string>) {
            state.addRole = action.payload;
            state.role = action.payload;
        },
    },
});

export const {
    setSearch,
    setEditUserValue,
    setRoleUser,
    setIsOpenModal,
    setAddRole,
    clearAddRoleAfterUpdate,
} = counterSlice.actions;
export default counterSlice.reducer;
