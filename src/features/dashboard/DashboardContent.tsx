import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { 
  Box, Card, CardContent, Typography, CircularProgress 
} from '@mui/material';
import { 
  AttachMoney, People, ShoppingCart, TrendingUp 
} from '@mui/icons-material';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, Legend 
} from 'recharts';

export default function DashboardContent() {
  const { metrics, status } = useSelector((state: RootState) => state.dashboard);

  const totalRevenue = useMemo(() => {
    return metrics.reduce((sum, item) => sum + item.revenue, 0);
  }, [metrics]);

  const totalUsers = useMemo(() => {
    return metrics.reduce((sum, item) => sum + item.users, 0);
  }, [metrics]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress size={60} sx={{ color: '#38bdf8' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      
      {/* AGGREGATED METRICS ROW */}
      {[
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <AttachMoney sx={{ color: '#10b981' }} />, percentage: '+12.4% vs last month' },
        { title: 'Active Users', value: totalUsers.toLocaleString(), icon: <People sx={{ color: '#3b82f6' }} />, percentage: '+8.2% vs last month' },
        { title: 'Total Sales', value: '1,245', icon: <ShoppingCart sx={{ color: '#f59e0b' }} />, percentage: '-3.1% vs last month' },
        { title: 'Conversion Rate', value: '2.4%', icon: <TrendingUp sx={{ color: '#8b5cf6' }} />, percentage: '+1.5% vs last month' }
      ].map((card, idx) => (
        <Box key={idx} sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '250px' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: '16px !important' }}>
              <div>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{card.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>{card.value}</Typography>
                <Typography variant="caption" sx={{ color: card.percentage.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                  {card.percentage}
                </Typography>
              </div>
              <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2 }}>{card.icon}</Box>
            </CardContent>
          </Card>
        </Box>
      ))}

      {/* RECHARTS DATA VISUALIZATIONS */}
      {/* Area Chart Container */}
      <Box sx={{ flex: '2 1 calc(66.67% - 24px)', minWidth: '300px' }}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Revenue Generation Trend</Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorReduxRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorReduxRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>

      {/* Bar Chart Container */}
      <Box sx={{ flex: '1 1 calc(33.33% - 24px)', minWidth: '300px' }}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Acquisition Metrics</Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} />
                <Tooltip />
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
