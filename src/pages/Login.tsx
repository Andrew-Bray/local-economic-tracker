import React, { useState } from 'react';
import { 
  Sheet, 
  Typography, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Link, 
  Alert,
  Box
} from '@mui/joy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.body'
      }}
    >
      <Sheet
        sx={{
          width: 400,
          mx: 'auto',
          p: 4,
          borderRadius: 'md',
          boxShadow: 'md',
        }}
      >
        <Typography level="h3" sx={{ mb: 2, textAlign: 'center' }}>
          Log In to EcoTrack
        </Typography>
        <Typography level="body-sm" sx={{ mb: 3, textAlign: 'center' }}>
          Track Portland\'s economic trends and plan your budget effectively.
        </Typography>

        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <Button 
            type="submit" 
            loading={loading}
            fullWidth
            sx={{ mb: 2 }}
          >
            Sign In
          </Button>

          <Typography level="body-sm" sx={{ textAlign: 'center' }}>
            Don\'t have an account?{' '}
            <Link component={RouterLink} to="/register">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Sheet>
    </Box>
  );
};

export default Login;