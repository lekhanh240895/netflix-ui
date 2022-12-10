import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Genre } from '../../typings';

export interface appState {
    user: Genre | undefined | null;
}

const initialState: appState = {
    user: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Genre>) => {
            state.user = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = appSlice.actions;

export default appSlice.reducer;
