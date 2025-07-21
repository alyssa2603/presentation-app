import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { Item } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ShoppingCart, Plus, User } from 'lucide-react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const { customerName } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerName) {
      navigate('/');
      return;
    }
    loadProducts();
  }, [customerName, navigate]);

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      if (querySnapshot.empty) {
        // Use sample data if no items in Firestore
        setProducts(SAMPLE_PRODUCTS);
      } else {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Item[];
        setProducts(items);
      }
    } catch (error) {
      console.log('Using sample data:', error);
      setProducts(SAMPLE_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Item) => {
    addToCart({ ...product, cartQuantity: 1 });
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
            <div className="bg-blue-100 rounded-full p-2">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{customerName}</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/cart')}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our carefully curated selection of premium items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-6xl opacity-20">🛍️</div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.itemName}</h3>
                <p className="text-sm text-gray-600 mb-4">In stock: {product.quantity} items</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
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