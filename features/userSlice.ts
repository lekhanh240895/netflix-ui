import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../typings';
import { usersCol } from '../firebase/config';
import { addDoc } from 'firebase/firestore';

export interface userState {
    user: User | null;
}

const initialState: userState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addUser.fulfilled, (state, action) => {});
    },
});

export const addUser = createAsyncThunk(
    'app/addUserStatus',
    async (data: User) => {
        // Add a new document with a generated id
        await addDoc(usersCol, data);
        return data.uid;
    },
);

// Action creators are generated for each case reducer function

export default userSlice.reducer;
