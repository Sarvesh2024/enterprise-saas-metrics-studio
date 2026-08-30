import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Download as DownloadIcon, InsertDriveFile as FileIcon } from '@mui/icons-material';

export default function AnalyticsPage() {
  // Grab the real live state metrics data straight out of the Redux Store vault
  const { metrics } = useSelector((state: RootState) => state.dashboard);

  // Real client-side file builder utility
  const handleExportCSV = () => {
    // 1. Create the CSV header strings row
    const headers = ['Month', 'Revenue ($)', 'New Users', 'Conversions (Sales)'];
    
    // 2. Map data rows directly into structured lines
    const csvRows = metrics.map(item => 
      `${item.month},${item.revenue},${item.users},${item.sales}`
    );
    
    // 3. Join headers and data rows with string line endings
    const csvString = [headers.join(','), ...csvRows].join('\n');
    
    // 4. Create an ephemeral data stream blob container
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // 5. Generate a virtual invisible link anchor element, trigger click download, and delete reference
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Enterprise_Metrics_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Page Header Layout */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Analytics Engine
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Deep-dive metrics logs and granular database reporting summaries.
          </Typography>
        </div>
        
        {/* Active functional download execution target */}
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          onClick={handleExportCSV} // Triggers real file generation engine
          sx={{ bgcolor: '#38bdf8', '&:hover': { bgcolor: '#0284c7' }, borderRadius: 2, fontWeight: 600, textTransform: 'none' }}
        >
          Export CSV Report
        </Button>
      </Box>

      {/* Analytics Content Block */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 250, textAlign: 'center' }}>
              <Box sx={{ p: 2, bgcolor: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', mb: 2 }}>
                <FileIcon sx={{ fontSize: 40, color: '#38bdf8' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                System Reports Stream Ready
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
                The raw log streams are actively monitoring database interactions. Click the export button above to generate a live point-in-time calculation sheet.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
