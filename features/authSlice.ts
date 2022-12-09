import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../typings';

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
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
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
    const response = await fetch('/api/auth/signin', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
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
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 400) {
        return rejectWithValue(data as MyKnownError);
    }
    return data as IUser;
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
