import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

// Strictly typing our store hooks for full TypeScript compliance
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
