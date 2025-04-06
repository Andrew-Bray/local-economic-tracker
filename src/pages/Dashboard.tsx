import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Card,
  Box,
  Chip,
  Divider,
  AspectRatio,
  CircularProgress,
  Select,
  Option,
  Sheet
} from '@mui/joy';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';
import { fetchEconomicData } from '../services/api/economicData';
import { EconomicIndicator, PriceItem } from '../types';
import PriceDisplay from '../components/dashboard/PriceDisplay';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicator[]>([]);
  const [priceItems, setPriceItems] = useState<PriceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const { indicators, prices } = await fetchEconomicData();
        setEconomicIndicators(indicators);
        setPriceItems(prices);
      } catch (error) {
        console.error("Failed to fetch economic data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const categories = ['all', ...new Set(priceItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'all' 
    ? priceItems 
    : priceItems.filter(item => item.category === selectedCategory);
  
  const getChangeIcon = (change: number) => {
    if (change > 1) return <TrendingUp color="error" />;
    if (change < -1) return <TrendingDown color="success" />;
    return <TrendingFlat color="warning" />;
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography level="h2">Portland Economic Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography level="body-sm">Last updated: {new Date().toLocaleDateString()}</Typography>
        </Box>
      </Box>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {economicIndicators.slice(0, 4).map((indicator) => (
          <Grid key={indicator.id} xs={12} sm={6} md={3}>
            <Card>
              <Typography level="title-md">{indicator.name}</Typography>
              <Typography level="h3">
                {indicator.currentValue}{indicator.unit}
                {getChangeIcon(indicator.changePercentage)}
              </Typography>
              <Typography level="body-sm" sx={{ 
                color: indicator.changePercentage > 0 ? 'danger.500' : 
                       indicator.changePercentage < 0 ? 'success.500' : 'warning.500'
              }}>
                {indicator.changePercentage > 0 ? '+' : ''}
                {indicator.changePercentage.toFixed(1)}% from last month
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Card sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography level="h4">Essential Items Price Tracker</Typography>
          <Select 
            size="sm"
            value={selectedCategory}
            onChange={(_, value) => setSelectedCategory(value as string)}
            sx={{ minWidth: 150 }}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Option>
            ))}
          </Select>
        </Box>
        
        <Divider />
        
        <PriceDisplay items={filteredItems} />
      </Card>
    </Box>
  );
};

export default Dashboard;