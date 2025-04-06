
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
  Box
} from '@mui/joy';
import { Dashboard, Home, TrendingUp, PieChart, Settings } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Price Trends', path: '/trends', icon: <TrendingUp /> },
    { label: 'Budget Impact', path: '/budget', icon: <PieChart /> },
    { label: 'Settings', path: '/settings', icon: <Settings /> },
  ];

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography level="h4" sx={{ fontWeight: 'bold' }}>
          EcoTrack
        </Typography>
      </Box>

      <List size="sm" sx={{ '--List-decorator-width': '32px' }}>
        {navItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 'md',
                '&.Mui-selected': {
                  backgroundColor: 'primary.softBg',
                  color: 'primary.plainColor',
                  fontWeight: 'bold'
                }
              }}
            >
              <ListItemDecorator>{item.icon}</ListItemDecorator>
              <ListItemContent>{item.label}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}

        {user && (
          <ListItem sx={{ mt: 'auto' }}>
            <ListItemButton
              onClick={signOut}
              sx={{ borderRadius: 'md', color: 'neutral.plainColor' }}
            >
              <ListItemContent>Sign Out</ListItemContent>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </>
  );
};

export default Navigation;