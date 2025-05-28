import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../services/api';
// import usersSlice from "../redux/usersSlice";

const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        // user: null,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
