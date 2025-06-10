import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../services/api';
import usersSlice from '../features/users/UsersSlice';

const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        users: usersSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
