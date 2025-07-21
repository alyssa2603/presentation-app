import { Item } from '../types';

// Hardcoded product catalog - all products are defined here
// These should match the items in your Firestore 'items' collection
export const SAMPLE_PRODUCTS: Item[] = [
  {
    id: '1',
    itemName: 'Premium Coffee Beans',
    price: 24.99,
    quantity: 50
  },
  {
    id: '2',
    itemName: 'Artisan Chocolate Bar',
    price: 12.50,
    quantity: 30
  },
  {
    id: '3',
    itemName: 'Organic Honey',
    price: 18.00,
    quantity: 25
  },
  {
    id: '4',
    itemName: 'Handcrafted Mug',
    price: 32.00,
    quantity: 15
  },
  {
    id: '5',
    itemName: 'Gourmet Tea Set',
    price: 45.99,
    quantity: 12
  },
  {
    id: '6',
    itemName: 'Vanilla Extract',
    price: 16.75,
    quantity: 40
  }
];

// Helper function to get product by ID
export const getProductById = (id: string): Item | undefined => {
  return SAMPLE_PRODUCTS.find(product => product.id === id);
};