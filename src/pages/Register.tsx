import { useState } from 'react';
import { 
  Sheet, 
  Typography, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Link, 
  Alert,
  Box,
  Select,
  Option
} from '@mui/joy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase/config';

const neighborhoods = [
  'Downtown', 
  'Pearl District', 
  'Northwest', 
  'Northeast', 
  'Southeast', 
  'Southwest',
  'St. Johns',
  'Alberta Arts',
  'Hawthorne',
  'Sellwood'
];

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);

    try {
     //  @ts-expect-error: signUp function does not have proper TypeScript typings
      const { user } = await signUp(email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        email,
        neighborhood,
        preferences: {
          categoryWeights: {
            housing: 1,
            food: 1,
            transportation: 1,
            utilities: 1,
            healthcare: 1,
            entertainment: 1
          },
          notificationThreshold: 5 // 5% change will trigger notification
        },
        createdAt: new Date()
      });
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
        minHeight: '100vh',
        bgcolor: 'background.body',
        py: 4
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
          Create Your Account
        </Typography>
        <Typography level="body-sm" sx={{ mb: 3, textAlign: 'center' }}>
          Join EcoTrack to monitor Portland\'s economic trends.
        </Typography>

        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Display Name</FormLabel>
            <Input
              placeholder="Your Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </FormControl>

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

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Your Neighborhood</FormLabel>
            <Select 
              value={neighborhood} 
              onChange={(_, value) => setNeighborhood(value as string)}
              placeholder="Select neighborhood"
              required
            >
              {neighborhoods.map((n) => (
                <Option key={n} value={n}>{n}</Option>
              ))}
            </Select>
          </FormControl>

          <Button 
            type="submit" 
            loading={loading}
            fullWidth
            sx={{ mb: 2 }}
          >
            Create Account
          </Button>

          <Typography level="body-sm" sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Sign In
            </Link>
          </Typography>
        </form>
      </Sheet>
    </Box>
  );
};

export default Register;