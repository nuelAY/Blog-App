import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import blogReducer from './features/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
