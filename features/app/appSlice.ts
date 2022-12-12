import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie, User } from '../../typings';

export interface appState {
    user: User | undefined | null;
    videoModalShow: boolean;
    selectedMovie: Movie | null;
}

const initialState: appState = {
    user: null,
    videoModalShow: false,
    selectedMovie: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
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
export const { setUser, setSelectedMovie, showVideoModal, hideVideoModal } =
    appSlice.actions;

export default appSlice.reducer;
