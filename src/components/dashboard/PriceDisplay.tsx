
import { 
  Box, 
  Table, 
  Typography, 
  Sheet,
  Chip,
  AspectRatio
} from '@mui/joy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PriceItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface PriceDisplayProps {
  items: PriceItem[];
}

const PriceDisplay: React.FC<PriceDisplayProps> = (
  { items }: PriceDisplayProps) => {
  // If no items, show a message
  if (items.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography level="body-lg">No price data available for this category.</Typography>
      </Box>
    );
  }

  // Prepare data for chart
  const chartData = items.map(item => ({
    name: item.name,
    currentPrice: item.currentPrice,
    previousPrice: item.previousPrice
  }));

  return (
    <Box>
      {/* Price trend chart */}
      <AspectRatio ratio="21/9" sx={{ mt: 2, mb: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Bar dataKey="previousPrice" name="Previous Price" fill="#8884d8" />
            <Bar dataKey="currentPrice" name="Current Price" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </AspectRatio>

      {/* Price table */}
      <Sheet sx={{ height: '350px', overflow: 'auto' }}>
        <Table stickyHeader hoverRow>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Item</th>
              <th>Category</th>
              <th>Current Price</th>
              <th>Change</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{formatCurrency(item.currentPrice)}/{item.unit}</td>
                <td>
                  <Chip
                    size="sm"
                    variant="soft"
                    color={
                      item.changePercentage > 2 ? 'danger' :
                      item.changePercentage < -2 ? 'success' :
                      item.changePercentage === 0 ? 'neutral' : 'warning'
                    }
                  >
                    {item.changePercentage > 0 ? '+' : ''}
                    {item.changePercentage.toFixed(1)}%
                  </Chip>
                </td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default PriceDisplay;