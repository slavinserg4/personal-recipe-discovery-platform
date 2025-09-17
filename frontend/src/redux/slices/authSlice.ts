// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginData, IUser } from "../../models/IUser";
import { axiosService } from "../../services/api.service";

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: ILoginData) => {
        const response = await axiosService.post('/auth/login', loginData);
        localStorage.setItem('accessToken', response.data.token);
        return response.data.user;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as IUser | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка входу';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;