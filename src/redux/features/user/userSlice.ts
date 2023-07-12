import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '@/lib/firebase';

interface IInitialState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredentials {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredentials): Promise<string | null> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return response.user.email;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredentials): Promise<string | null> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response.user.email;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload!;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.email = null;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
