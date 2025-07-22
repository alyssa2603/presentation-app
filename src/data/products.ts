export interface Product {
  id: string;
  productName: string;
  price: number;
}
// product catalog
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    productName: 'Royal Umbrella Jasmine Rice 25kg',
    price: 1520.00
  },
  {
    id: '2',
    productName: 'Lucky Me! Instant Pancit Canton Original (30s)',
    price: 390.00
  },
  {
    id: '3',
    productName: 'Wilkins Pure Water Bottles 500ml (24s)',
    price: 210.00
  },
  {
    id: '4',
    productName: 'B-Meg Integra Layer Fresh Eggs Tray (30s)',
    price: 220.00
  },
  {
    id: '5',
    productName: 'Golden Fiesta Palm Oil 3L',
    price: 495.00
  },
  {
    id: '6',
    productName: 'Surf Detergent Powder Kalamansi 5kg',
    price: 480.00
  },
  {
    id: '7',
    productName: 'Spam Luncheon Meat Classic 340g',
    price: 175.00
  },
  {
    id: '8',
    productName: '555 Sardines in Tomato Sauce 155g (100 cans)',
    price: 2300.00
  },
  {
    id: '9',
    productName: 'Sanicare Toilet Tissue 3-ply (12 rolls)',
    price: 198.00
  },
  {
    id: '10',
    productName: 'Indoplas Disposable Face Mask (50 pcs)',
    price: 105.00
  },
  {
    id: '11',
    productName: 'Datu Puti Soy Sauce 1 Gallon',
    price: 152.00
  },
  {
    id: '12',
    productName: 'Coke Regular 1.5L (Case of 12)',
    price: 678.00
  },
  {
    id: '13',
    productName: 'Mighty White Bread Loaf 400g (10 pcs)',
    price: 350.00
  },
  {
    id: '14',
    productName: 'Bear Brand Fortified Powdered Milk Drink 1.2kg',
    price: 450.00
  },
  {
    id: '15',
    productName: 'Domex Ultra Thick Bleach 5L',
    price: 289.00
  }
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return SAMPLE_PRODUCTS.find(product => product.id === id);
};