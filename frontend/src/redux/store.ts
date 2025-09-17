// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;