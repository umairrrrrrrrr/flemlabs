export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface ServicePrices {
  basic: number;
  standard: number;
  pro: number;
}

export interface ServiceFeatures {
  basic: string[];
  standard: string[];
  pro: string[];
}

export interface Service {
  _id: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  prices: ServicePrices;
  features: ServiceFeatures;
  imageUrl: string;
  createdAt?: string;
}

export interface Order {
  _id: string;
  id?: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  tier: 'Basic' | 'Standard' | 'Pro';
  requirements: string;
  referenceImage?: string;
  price: number;
  paymentMethod: 'Card' | 'Crypto';
  paymentStatus: 'Pending' | 'Paid';
  status: 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled';
  cancellationReason?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  id?: string;
  userId: string;
  userName: string;
  rating: number;
  comments: string;
  createdAt: string;
}

export interface Payment {
  _id: string;
  orderId: string;
  customerId: string;
  amount: number;
  paymentMethod: 'Card' | 'Crypto';
  cardLast4?: string;
  txHash?: string;
  status: 'Pending' | 'Paid' | 'Failed';
  createdAt: string;
}
