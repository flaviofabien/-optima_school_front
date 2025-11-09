import { configureStore } from '@reduxjs/toolkit';
import DataStorageReducer from './Users/Users';

export const store = configureStore({
    reducer: {
      dataStorage: DataStorageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;