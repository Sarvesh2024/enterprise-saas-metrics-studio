import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import DashboardPage from './features/dashboard/DashboardPage';
import AnalyticsPage from './features/dashboard/AnalyticsPage';
import SettingsPage from './features/dashboard/SettingsPage';

// Inner view dependencies
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { AttachMoney, People, ShoppingCart, TrendingUp } from '@mui/icons-material';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';

function DashboardOverview() {
  const { metrics, status, themeMode } = useSelector((state: RootState) => state.dashboard);

  const totalRevenue = useMemo(() => metrics.reduce((sum, item) => sum + item.revenue, 0), [metrics]);
  const totalUsers = useMemo(() => metrics.reduce((sum, item) => sum + item.users, 0), [metrics]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress size={60} sx={{ color: '#38bdf8' }} />
      </Box>
    );
  }

  // Dynamic colors for charts based on active theme mode
  const mainChartColor = themeMode === 'dark' ? '#f43f5e' : '#38bdf8';
  const areaGradient = themeMode === 'dark' ? '#f43f5e' : '#38bdf8';

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {[
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <AttachMoney sx={{ color: '#10b981' }} />, percentage: '+12.4%' },
        { title: 'Active Users', value: totalUsers.toLocaleString(), icon: <People sx={{ color: '#3b82f6' }} />, percentage: '+8.2%' },
        { title: 'Total Sales', value: '1,245', icon: <ShoppingCart sx={{ color: '#f59e0b' }} />, percentage: '-3.1%' },
        { title: 'Conversion Rate', value: '2.4%', icon: <TrendingUp sx={{ color: '#8b5cf6' }} />, percentage: '+1.5%' }
      ].map((card, idx) => (
        <Box key={idx} sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '250px' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: '16px !important' }}>
              <div>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{card.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>{card.value}</Typography>
                <Typography variant="caption" sx={{ color: card.percentage.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>{card.percentage} vs last month</Typography>
              </div>
              <Box sx={{ p: 1, bgcolor: themeMode === 'dark' ? '#334155' : '#f1f5f9', borderRadius: 2 }}>{card.icon}</Box>
            </CardContent>
          </Card>
        </Box>
      ))}

      <Box sx={{ flex: '2 1 calc(66.67% - 24px)', minWidth: '300px' }}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Revenue Generation Trend</Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorReduxRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={areaGradient} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={areaGradient} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={themeMode === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="month" stroke={themeMode === 'dark' ? '#94a3b8' : '#64748b'} />
                <YAxis tickLine={false} axisLine={false} stroke={themeMode === 'dark' ? '#94a3b8' : '#64748b'} />
                <Tooltip contentStyle={{ backgroundColor: themeMode === 'dark' ? '#1e293b' : '#fff', borderColor: '#334155' }} />
                <Area type="monotone" dataKey="revenue" stroke={mainChartColor} strokeWidth={2} fillOpacity={1} fill="url(#colorReduxRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>

      <Box sx={{ flex: '1 1 calc(33.33% - 24px)', minWidth: '300px' }}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Acquisition Metrics</Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={themeMode === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="month" stroke={themeMode === 'dark' ? '#94a3b8' : '#64748b'} />
                <Tooltip contentStyle={{ backgroundColor: themeMode === 'dark' ? '#1e293b' : '#fff', borderColor: '#334155' }} />
                <Legend verticalAlign="top" height={36}/>
                <Bar dataKey="users" name="New Users" fill="#3b82f6" />
                <Bar dataKey="sales" name="Conversions" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

function LayoutWrapper() {
  const themeMode = useSelector((state: RootState) => state.dashboard.themeMode);

  // Memoize creation of the MUI custom theme layout system setup
  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === 'dark' ? '#0f172a' : '#f8f9fa',
        paper: themeMode === 'dark' ? '#1e293b' : '#ffffff',
      },
    },
  }), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Injects proper background resets automatically */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            <Route index element={<DashboardOverview />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return <LayoutWrapper />;
}
