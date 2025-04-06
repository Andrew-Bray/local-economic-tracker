import { Outlet } from 'react-router-dom';
import { Box, Sheet } from '@mui/joy';
import Navigation from './Navigation';

const AppLayout: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.body'
    }}>
      <Sheet
        sx={{
          width: 240,
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Navigation />
      </Sheet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;