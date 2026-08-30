import { Box, Typography } from '@mui/material';

export default function SettingsPage() {
  return (
    <Box sx={{ p: 4, mt: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>System Settings</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>Manage global dashboard configurations and user access roles.</Typography>
    </Box>
  );
}
