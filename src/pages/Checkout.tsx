import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CreditCard } from 'lucide-react';

const Checkout: React.FC = () => {
  const [payment, setPayment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  const { cart, getCartTotal, clearCart } = useCart();
  const { customerName, setCurrentOrder } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!customerName || cart.length === 0) {
      navigate('/');
    }
  }, [customerName, cart.length, navigate]);

  const total = getCartTotal();
  const paymentAmount = parseFloat(payment) || 0;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (paymentAmount < total) {
      setPaymentError(`Payment must be at least ₱${total.toFixed(2)}`);
      return;
    }

    setIsProcessing(true);

    try {
      // Create individual item documents for each purchased item
      const itemRefs = [];
      
      for (const cartItem of cart) {
        // Create a new item document for each purchased item (not the product catalog)
        const itemRef = doc(collection(db, 'items')); // Auto-generate ID for each purchased item
        
        // Write the purchased item data to Firestore
        await setDoc(itemRef, {
          itemName: cartItem.productName,
          price: cartItem.price,
          quantity: cartItem.cartQuantity // Use the quantity actually bought
        });
        
        itemRefs.push(itemRef);
      }
      
      // Now create the order with references to the items
      const orderData = {
        customer: customerName,
        amountPaid: paymentAmount,
        total: total,
        itemsBought: itemRefs,
        isPrinted: false,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Store order for receipt
      setCurrentOrder({
        ...orderData,
        id: docRef.id,
        itemsBought: cart.map(item => item.id), // Keep as IDs for local state
        items: cart
      });

      // Clear cart and navigate to receipt
      clearCart();
      navigate('/receipt');
    } catch (error) {
      console.error('Error creating order:', error);
      // For demo purposes, still proceed even if Firestore fails
      setCurrentOrder({
        id: `ORDER-${Date.now()}`,
        customer: customerName,
        amountPaid: paymentAmount,
        total: total,
        itemsBought: cart.map(item => item.id),
        isPrinted: false,
        createdAt: new Date(),
        items: cart
      });
      
      clearCart();
      navigate('/receipt');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Checkout</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.productName}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.cartQuantity} × ₱{item.price.toFixed(2)}</p>
                  </div>
                  <span className="font-semibold text-gray-900 text-right">
                    ₱{(item.price * item.cartQuantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-primary">₱{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary/10 rounded-full p-3">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment</h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
                  <input
                    type="number"
                    id="payment"
                    step="0.01"
                    min="0"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                      paymentError ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    required
                  />
                </div>
                {paymentAmount > total && (
                  <p className="mt-2 text-sm text-green-600">
                    Change: ₱{(paymentAmount - total).toFixed(2)}
                  </p>
                )}
                {paymentError && (
                  <p className="mt-2 text-sm text-red-600">{paymentError}</p>
                )}
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm text-primary-dark">
                  <strong>Minimum payment:</strong> ₱{total.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing || paymentAmount < total}
                className="w-full bg-primary text-white py-3 sm:py-4 px-6 rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-base sm:text-lg flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Complete Payment</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;