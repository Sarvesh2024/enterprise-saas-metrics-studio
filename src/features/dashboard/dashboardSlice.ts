import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MetricData {
  month: string;
  revenue: number;
  users: number;
  sales: number;
}

interface DashboardState {
  metrics: MetricData[];
  timeframe: string;
  status: 'idle' | 'loading' | 'failed';
  themeMode: 'light' | 'dark'; // Track the theme mode
}

const initialMetrics: MetricData[] = [
  { month: 'Jan', revenue: 4000, users: 2400, sales: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398, sales: 2210 },
  { month: 'Mar', revenue: 9800, users: 9800, sales: 2290 },
  { month: 'Apr', revenue: 3908, users: 3928, sales: 2000 },
  { month: 'May', revenue: 4800, users: 4800, sales: 2181 },
  { month: 'Jun', revenue: 3800, users: 3800, sales: 2500 },
];

const initialState: DashboardState = {
  metrics: initialMetrics,
  timeframe: '6months',
  status: 'idle',
  themeMode: 'light', // Initialized to light mode
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeframe: (state, action: PayloadAction<string>) => {
      state.timeframe = action.payload;
      if (action.payload === '3months') {
        state.metrics = initialMetrics.slice(3);
      } else {
        state.metrics = initialMetrics;
      }
    },
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload;
    },
    // Action to toggle the theme mode globally
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    }
  },
});

export const { setTimeframe, setStatus, toggleTheme } = dashboardSlice.actions;
export default dashboardSlice.reducer;
