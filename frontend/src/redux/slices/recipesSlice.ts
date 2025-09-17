// src/redux/slices/recipesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRecipe } from "../../models/IRecipe";
import { axiosService } from "../../services/api.service";

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async () => {
        const response = await axiosService.get('/recipes');
        return response.data;
    }
);

export const createRecipe = createAsyncThunk(
    'recipes/createRecipe',
    async (recipeData: Partial<IRecipe>) => {
        const response = await axiosService.post('/recipes', recipeData);
        return response.data;
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [] as IRecipe[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Помилка завантаження';
            })
            .addCase(createRecipe.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default recipesSlice.reducer;