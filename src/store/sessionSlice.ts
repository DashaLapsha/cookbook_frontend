import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  user: any | null;
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
