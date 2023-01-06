import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../typings';

export interface appState {
    videoModalShow: boolean;
    selectedMovie: Movie | null;
    myList: Movie[];
}

const initialState: appState = {
    videoModalShow: false,
    selectedMovie: null,
    myList: [],
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
        addMovie: (state, action) => {
            state.myList.push(action.payload);
        },
        removeMovie: (state, action) => {
            const newList = state.myList.filter(
                (movie) => movie.id !== action.payload,
            );
            state.myList = newList;
            console.log(action.payload, newList);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSelectedMovie,
    showVideoModal,
    hideVideoModal,
    addMovie,
    removeMovie,
} = appSlice.actions;

export default appSlice.reducer;
