export interface EconomicIndicator {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  previousValue: number;
  unit: string;
  changePercentage: number;
  lastUpdated: Date;
}

export interface PriceItem {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  changePercentage: number;
  lastUpdated: Date;
}

export interface Neighborhood {
  id: string;
  name: string;
  priceModifiers: Record<string, number>;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  neighborhood: string;
  preferences: {
    categoryWeights: Record<string, number>;
    notificationThreshold: number;
  };
}