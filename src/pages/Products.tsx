import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ShoppingCart, Plus, User } from 'lucide-react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const { customerName } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerName) {
      navigate('/');
      return;
    }
    // Use hardcoded products directly
    setProducts(SAMPLE_PRODUCTS);
    setLoading(false);
  }, [customerName, navigate]);

  const handleAddToCart = (product: Product) => {
    addToCart({ 
      id: product.id,
      productName: product.productName,
      price: product.price,
      cartQuantity: 1 
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 rounded-full p-2">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{customerName}</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/cart')}
            className="relative bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our premium selection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{product.productName}</h3>
                <p className="text-sm text-gray-600 mb-4">Premium quality product</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    ₱{product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;