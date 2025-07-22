export interface Product {
  id: string;
  productName: string;
  price: number;
}

// product catalog with images
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    productName: 'Jasmine Rice (25kg)',
    price: 1520.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY_GtXKBNXJFVW_7zMfoYHyn9RSPq5uQCm4A&s'
  },
  {
    id: '2',
    productName: 'Instant Pancit Canton (12 pcs)',
    price: 240.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_NmAdRCPIveOtpQzvRSoAIM02-MLvlfyvhQ&s'
  },
  {
    id: '3',
    productName: 'Wilkins Pure Water Bottles 500ml (24s)',
    price: 210.00,
    image: 'https://cdn.shopify.com/s/files/1/0680/4150/7113/products/WilkinsPureDrinkingWater500ml_480x480.jpg'
  },
  {
    id: '4',
    productName: 'B-Meg Integra Layer Fresh Eggs Tray (30s)',
    price: 220.00,
    image: 'https://www.bmeg.com.ph/wp-content/uploads/2020/06/bmeg-layer-eggs.jpg'
  },
  {
    id: '5',
    productName: 'Golden Fiesta Palm Oil 3L',
    price: 495.00,
    image: 'https://cdn.shopify.com/s/files/1/0604/6539/1604/products/goldenfiesta3l_1024x1024.jpg'
  },
  {
    id: '6',
    productName: 'Surf Detergent Powder Kalamansi 5kg',
    price: 480.00,
    image: 'https://down-ph.img.susercontent.com/file/869a297a0c287fb97366d38dfbb8a2c3'
  },
  {
    id: '7',
    productName: 'Spam Luncheon Meat Classic 340g',
    price: 175.00,
    image: 'https://www.spam.com/cdn/shop/products/SPAMClassic12oz_Front_720x.jpg'
  },
  {
    id: '8',
    productName: '555 Sardines in Tomato Sauce 155g (100 cans)',
    price: 2300.00,
    image: 'https://cdn.shopify.com/s/files/1/0680/4150/7113/products/555Sardines155g_480x480.jpg'
  },
  {
    id: '9',
    productName: 'Sanicare Toilet Tissue 3-ply (12 rolls)',
    price: 198.00,
    image: 'https://cdn.shopify.com/s/files/1/0680/4150/7113/products/Sanicare3ply12rolls_480x480.jpg'
  },
  {
    id: '10',
    productName: 'Indoplas Disposable Face Mask (50 pcs)',
    price: 105.00,
    image: 'https://indoplasphil.com/wp-content/uploads/2020/09/Face-Mask.jpg'
  },
  {
    id: '11',
    productName: 'Datu Puti Soy Sauce 1 Gallon',
    price: 152.00,
    image: 'https://cdn.greatdeals.com.ph/wp-content/uploads/2021/04/Datu-Puti-Soy-Sauce-1-Gallon.jpg'
  },
  {
    id: '12',
    productName: 'Coke Regular 1.5L (Case of 12)',
    price: 678.00,
    image: 'https://cdn.shopify.com/s/files/1/0551/9250/8437/products/coke-1.5l_480x480.jpg'
  },
  {
    id: '13',
    productName: 'Mighty White Bread Loaf 400g (10 pcs)',
    price: 350.00,
    image: 'https://www.mightywhite.com.my/images/mighty-white-sandwich-loaf.jpg'
  },
  {
    id: '14',
    productName: 'Bear Brand Fortified Powdered Milk Drink 1.2kg',
    price: 450.00,
    image: 'https://down-ph.img.susercontent.com/file/9aa73c7b7e12ef0433ed7c4d8d9b4f6a'
  },
  {
    id: '15',
    productName: 'Domex Ultra Thick Bleach 5L',
    price: 289.00,
    image: 'https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/general/domex-ultra-thick-bleach-5l/main-header.jpg'
  }
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return SAMPLE_PRODUCTS.find(product => product.id === id);
};