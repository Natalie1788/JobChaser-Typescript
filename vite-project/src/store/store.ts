import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../slice/jobSlice';

export const store: any = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;