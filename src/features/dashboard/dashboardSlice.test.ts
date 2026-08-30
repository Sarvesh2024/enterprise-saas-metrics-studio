import dashboardReducer, { setTimeframe, setStatus } from './dashboardSlice';

describe('Dashboard Redux Slice', () => {
  // Added themeMode: 'light' here to match our real updated Redux state structure
  const initialState = {
    metrics: [
      { month: 'Jan', revenue: 4000, users: 2400, sales: 2400 },
      { month: 'Feb', revenue: 3000, users: 1398, sales: 2210 },
      { month: 'Mar', revenue: 9800, users: 9800, sales: 2290 },
      { month: 'Apr', revenue: 3908, users: 3928, sales: 2000 },
      { month: 'May', revenue: 4800, users: 4800, sales: 2181 },
      { month: 'Jun', revenue: 3800, users: 3800, sales: 2500 },
    ],
    timeframe: '6months',
    status: 'idle' as const,
    themeMode: 'light' as const, // Added this field to resolve TS2345 compiler blocker
  };

  it('should return the initial state when passed an empty action', () => {
    expect(dashboardReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setStatus changing the loading state', () => {
    const actual = dashboardReducer(initialState, setStatus('loading'));
    expect(actual.status).toEqual('loading');
  });

  it('should filter metrics to 3 months when timeframe is set to 3months', () => {
    const actual = dashboardReducer(initialState, setTimeframe('3months'));
    expect(actual.timeframe).toEqual('3months');
    expect(actual.metrics.length).toEqual(3); 
    expect(actual.metrics[0].month).toEqual('Apr');
  });
});
