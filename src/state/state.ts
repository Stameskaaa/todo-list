import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../slices/taskSlice';
import authSlice from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    taskSlice,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
