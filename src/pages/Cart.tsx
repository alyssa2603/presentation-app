import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { customerName } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!customerName) {
      navigate('/');
    }
  }, [customerName, navigate]);

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Products</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Shopping Cart</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Items</h2>
          </div>

          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.productName}</h3>
                    <p className="text-gray-600">₱{item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      ₱{(item.price * item.cartQuantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">₱{getCartTotal().toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 sm:py-4 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-200 font-semibold text-base sm:text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;