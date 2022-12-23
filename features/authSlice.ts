import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../typings';
import axios from 'axios';

interface MyKnownError {
    errorMessage: string;
}

export interface InitialState {
    user: IUser | null;
    error: string | null;
}

const initialState: InitialState = {
    user: null,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            if (action.payload) {
                // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
                state.error = action.payload.errorMessage;
            } else {
                state.error = action.error.message!;
            }
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const login = createAsyncThunk<
    IUser,
    {
        email: string;
        password: string;
    } & Partial<IUser>,
    {
        rejectValue: MyKnownError;
    }
>('auth/loginStatus', async ({ email, password }, { rejectWithValue }) => {
    const response = await axios.post('/api/signin', {
        email,
        password,
    });

    if (response.status === 400) {
        return rejectWithValue(response.data.message as MyKnownError);
    }
    return response.data as IUser;
});

export const signup = createAsyncThunk(
    'auth/signupStatus',
    async ({ email, password }: { email: string; password: string }) => {
        const res: IUser = await axios.post('/api/signup', {
            email,
            password,
        });
        return res;
    },
);

// Action creators are generated for each case reducer function

export default authSlice.reducer;
