import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../typings';

export interface appState {
    videoModalShow: boolean;
    selectedMovie: Movie | null;
}

const initialState: appState = {
    videoModalShow: false,
    selectedMovie: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
            state.selectedMovie = action.payload;
        },
        showVideoModal: (state) => {
            state.videoModalShow = true;
        },
        hideVideoModal: (state) => {
            state.videoModalShow = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedMovie, showVideoModal, hideVideoModal } =
    appSlice.actions;

export default appSlice.reducer;
