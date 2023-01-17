import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../typings';
import { fetchPostJSON } from '../utils/api-helpers';

interface MyKnownError {
    errorMessage: string;
}

export interface InitialState {
    user: IUser | null;
    error: string | null;
    loading: boolean;
}

const initialState: InitialState = {
    user: null,
    error: null,
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
            } else {
                state.error = action.error.message as string;
            }
            state.loading = false;
        });
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(signup.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload.errorMessage;
            } else {
                state.error = action.error.message as string;
            }
            state.loading = false;
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
    const response = await fetchPostJSON('/api/auth/signin', {
        email,
        password,
    });

    const data = await response.json();

    if (response.status === 400) {
        return rejectWithValue(data as MyKnownError);
    }
    return data as IUser;
});

export const signup = createAsyncThunk<
    IUser,
    {
        email: string;
        password: string;
    } & Partial<IUser>,
    {
        rejectValue: MyKnownError;
    }
>('auth/signupStatus', async ({ email, password }, { rejectWithValue }) => {
    const response = await fetchPostJSON('/api/auth/signup', {
        email,
        password,
    });

    const data = await response.json();

    if (response.status === 400) {
        return rejectWithValue(data as MyKnownError);
    }
    return data as IUser;
});

export default authSlice.reducer;
