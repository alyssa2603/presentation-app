export interface Product {
  id: string;
  productName: string;
  price: number;
}

// Hardcoded product catalog - simple products with name and price
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    productName: 'Premium Coffee Beans',
    price: 1249.50
  },
  {
    id: '2',
    productName: 'Artisan Chocolate Bar',
    price: 625.00
  },
  {
    id: '3',
    productName: 'Organic Honey',
    price: 900.00
  },
  {
    id: '4',
    productName: 'Handcrafted Mug',
    price: 1600.00
  },
  {
    id: '5',
    productName: 'Gourmet Tea Set',
    price: 2299.50
  },
  {
    id: '6',
    productName: 'Vanilla Extract',
    price: 837.50
  }
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return SAMPLE_PRODUCTS.find(product => product.id === id);
};