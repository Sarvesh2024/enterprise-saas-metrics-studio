import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setTimeframe, setStatus, toggleTheme } from './dashboardSlice';
import { 
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, FormControl, InputLabel, 
  Select, MenuItem, IconButton 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, BarChart as ChartIcon, 
  Settings as SettingsIcon, DarkMode, LightMode 
} from '@mui/icons-material';

const SIDEBAR_WIDTH = 240;

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { timeframe, themeMode } = useSelector((state: RootState) => state.dashboard);

  const handleTimeframeChange = (event: { target: { value: string } }) => {
    dispatch(setStatus('loading'));
    setTimeout(() => {
      dispatch(setTimeframe(event.target.value));
      dispatch(setStatus('idle'));
    }, 600); 
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: themeMode === 'dark' ? '#0f172a' : '#f8f9fa', minHeight: '100vh' }}>
      
      {/* TOP APPBAR HEADER */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`, 
          ml: `${SIDEBAR_WIDTH}px`, 
          bgcolor: themeMode === 'dark' ? '#1e293b' : '#ffffff', 
          color: themeMode === 'dark' ? '#ffffff' : '#1a1a1a', 
          boxShadow: 'none', 
          borderBottom: '1px solid',
          borderColor: themeMode === 'dark' ? '#334155' : '#e0e0e0'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            Enterprise Metrics Studio
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" size="small">
              {themeMode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="redux-timeframe-label">Timeframe</InputLabel>
              <Select 
                labelId="redux-timeframe-label" 
                value={timeframe} 
                label="Timeframe" 
                onChange={handleTimeframeChange}
              >
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>

      {/* PERSISTENT NAVIGATION SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, boxSizing: 'border-box', bgcolor: themeMode === 'dark' ? '#1e293b' : '#1e293b', color: '#ffffff' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#38bdf8' }}>
            Enterprise OS
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {[
              { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#38bdf8' }} />, path: '/' },
              { text: 'Analytics', icon: <ChartIcon sx={{ color: '#94a3b8' }} />, path: '/analytics' },
              { text: 'Settings', icon: <SettingsIcon sx={{ color: '#94a3b8' }} />, path: '/settings' }
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{ '&.Mui-selected': { bgcolor: 'rgba(56, 189, 248, 0.2)' } }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* MAIN VIEWPORT LAYOUT AREA */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: `calc(100% - ${SIDEBAR_WIDTH}px)`, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
