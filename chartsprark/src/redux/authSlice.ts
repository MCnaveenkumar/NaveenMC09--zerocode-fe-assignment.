import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  registeredUser: {
    username: string;
    password: string;
  } | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  registeredUser: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.registeredUser = action.payload;
      state.error = null;
    },
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      if (
        state.registeredUser &&
        state.registeredUser.username === action.payload.username &&
        state.registeredUser.password === action.payload.password
      ) {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.error = 'Invalid credentials';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer; 