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
    productName: 'Instant Pancit Canton',
    price: 240.50,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_NmAdRCPIveOtpQzvRSoAIM02-MLvlfyvhQ&s'
  },
  {
    id: '3',
    productName: 'Wilkins Pure',
    price: 210.25,
    image: 'https://www.snrshopping.com/upload/product_details/5fb62444bb7ce_1605772356.jpg'
  },
  {
    id: '4',
    productName: 'Sunsilk Shampoo 11+1',
    price: 120.00,
    image: 'https://nesabel.com/cdn/shop/products/SUNSILK_PINK_11_1_27d12085-f85e-4123-aa60-a73d9caf3316_1200x1200.jpg?v=1653495518'
  },
  {
    id: '5',
    productName: 'Colgate 3  Value Pack',
    price: 165.00,
    image: 'https://i5.walmartimages.com/asr/8fd02c5d-a569-4b72-b5e2-8f5372de5fcd.de989b241a49b28e25078ce59f2a4bef.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'
  },
  {
    id: '6',
    productName: 'Surf Detergent',
    price: 480.50,
    image: 'https://media.pickaroo.com/media/thumb/variant_photos/2021/4/8/YZEUAn2JsHcEzR6LJNsXsy_watermark_400.jpg'
  },
  {
    id: '7',
    productName: 'Spam Luncheon Meat',
    price: 6352.00,
    image: 'https://images-cdn.ubuy.co.in/76XPSILK-pack-of-12-spam-25-less-sodium-canned.jpg'
  },
  {
    id: '8',
    productName: 'Piattos Supersized',
    price: 73.25,
    image: 'https://happyhour.ph/cdn/shop/products/piattos-supersized-sour-cream-onion-170g-417372.jpg?v=1708591370'
  },
  {
    id: '9',
    productName: 'Safeguard',
    price: 183.20,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXP2N5g3WBu9sElyd-COYyU0ylGDPnGqnm2S1K5-hGQp4vxIEIjXucv2jBjHn1u0wVi8&usqp=CAU'
  },
  {
    id: '10',
    productName: 'Tide Jumbo',
    price: 137.75,
    image: 'https://img.lazcdn.com/g/p/4f4fa5bb177c826cbe7212c62f3065ed.jpg_720x720q80.jpg_.webp'
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return SAMPLE_PRODUCTS.find(product => product.id === id);
};