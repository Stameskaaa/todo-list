import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  auth: boolean;
}

const initialState: InitialState = {
  auth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
