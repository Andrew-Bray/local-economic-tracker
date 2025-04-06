// To be used after mock data is removed
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
// import { db } from '../firebase/config';
import { EconomicIndicator, PriceItem } from '../../types';

// For development, we'll use mock data until the Firebase collections are populated
const mockEconomicIndicators: EconomicIndicator[] = [
  {
    id: '1',
    name: 'Unemployment Rate',
    category: 'employment',
    currentValue: 5.2,
    previousValue: 5.4,
    unit: '%',
    changePercentage: -3.7,
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Median Home Price',
    category: 'housing',
    currentValue: 549,
    previousValue: 545,
    unit: 'K',
    changePercentage: 0.7,
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Avg. Rent (1BR)',
    category: 'housing',
    currentValue: 1650,
    previousValue: 1620,
    unit: '',
    changePercentage: 1.9,
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Gas Price',
    category: 'transportation',
    currentValue: 3.89,
    previousValue: 3.75,
    unit: '',
    changePercentage: 3.7,
    lastUpdated: new Date()
  }
];

const mockPriceItems: PriceItem[] = [
  {
    id: '1',
    name: 'Eggs (dozen)',
    category: 'groceries',
    currentPrice: 4.29,
    previousPrice: 3.99,
    unit: 'dozen',
    changePercentage: 7.5,
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Milk (gallon)',
    category: 'groceries',
    currentPrice: 3.89,
    previousPrice: 3.79,
    unit: 'gallon',
    changePercentage: 2.6,
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Bread',
    category: 'groceries',
    currentPrice: 4.50,
    previousPrice: 4.25,
    unit: 'loaf',
    changePercentage: 5.9,
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Ground Beef',
    category: 'groceries',
    currentPrice: 5.99,
    previousPrice: 5.89,
    unit: 'lb',
    changePercentage: 1.7,
    lastUpdated: new Date()
  },
  {
    id: '5',
    name: 'Monthly Bus Pass',
    category: 'transportation',
    currentPrice: 100,
    previousPrice: 100,
    unit: 'pass',
    changePercentage: 0,
    lastUpdated: new Date()
  },
  {
    id: '6',
    name: 'Uber Ride (5mi)',
    category: 'transportation',
    currentPrice: 18.50,
    previousPrice: 17.25,
    unit: 'ride',
    changePercentage: 7.2,
    lastUpdated: new Date()
  },
  {
    id: '7',
    name: 'Electric Bill',
    category: 'utilities',
    currentPrice: 120,
    previousPrice: 115,
    unit: 'mo',
    changePercentage: 4.3,
    lastUpdated: new Date()
  },
  {
    id: '8',
    name: 'Internet Service',
    category: 'utilities',
    currentPrice: 65,
    previousPrice: 65,
    unit: 'mo',
    changePercentage: 0,
    lastUpdated: new Date()
  },
  {
    id: '9',
    name: 'Coffee Shop Latte',
    category: 'dining',
    currentPrice: 5.75,
    previousPrice: 5.25,
    unit: 'each',
    changePercentage: 9.5,
    lastUpdated: new Date()
  },
  {
    id: '10',
    name: 'Restaurant Meal',
    category: 'dining',
    currentPrice: 22.50,
    previousPrice: 21.00,
    unit: 'meal',
    changePercentage: 7.1,
    lastUpdated: new Date()
  }
];

// Function to fetch economic data (from Firebase or mock)
export const fetchEconomicData = async () => {
  try {
    // In a production app, we would fetch from Firebase:
    /*
    const indicatorsSnapshot = await getDocs(
      query(collection(db, 'economic-indicators'), orderBy('lastUpdated', 'desc'))
    );
    const indicators = indicatorsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EconomicIndicator[];
    
    const pricesSnapshot = await getDocs(
      query(collection(db, 'price-items'), orderBy('name'))
    );
    const prices = pricesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PriceItem[];
    */

    // For development, return mock data
    return {
      indicators: mockEconomicIndicators,
      prices: mockPriceItems
    };
  } catch (error) {
    console.error("Error fetching economic data:", error);
    throw error;
  }
};

// Function to fetch data for a specific category
export const fetchCategoryData = async (category: string) => {
  try {
    // In production, we would use:
    /*
    const pricesSnapshot = await getDocs(
      query(
        collection(db, 'price-items'), 
        where('category', '==', category),
        orderBy('name')
      )
    );
    return pricesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PriceItem[];
    */

    // For development, filter mock data
    return mockPriceItems.filter(item => item.category === category);
  } catch (error) {
    console.error(`Error fetching ${category} data:`, error);
    throw error;
  }
};