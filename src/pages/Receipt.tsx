import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Home } from 'lucide-react';

const Receipt: React.FC = () => {
  const { currentOrder, customerName } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentOrder || !customerName) {
      navigate('/');
    }
  }, [currentOrder, customerName, navigate]);

  if (!currentOrder) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNewOrder = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Receipt Container */}
        <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-1">Order Confirmed!</h1>
            <p className="text-primary-light/80">Thank you for your purchase</p>
          </div>

          {/* Store Info */}
          <div className="text-center py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Warehouse ni Juan</h2>
            <p className="text-sm text-gray-600">Premium Quality Products</p>
            <p className="text-xs text-gray-500 mt-1">Order #{currentOrder.id?.slice(-8) || 'N/A'}</p>
          </div>

          {/* Customer & Date Info */}
          <div className="p-6 space-y-3 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Customer:</span>
              <span className="font-semibold text-gray-900">{currentOrder.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Date & Time:</span>
              <span className="font-semibold text-gray-900 text-sm">
                {formatDate(currentOrder.createdAt)}
              </span>
            </div>
          </div>

          {/* Items List */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Items Purchased:</h3>
            <div className="space-y-3">
              {currentOrder.items?.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.productName}</p>
                    <p className="text-xs text-gray-600">
                      {item.cartQuantity} × ₱{item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₱{(item.price * item.cartQuantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-6 space-y-3 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Subtotal:</span>
              <span className="font-semibold text-gray-900">₱{currentOrder.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Amount Paid:</span>
              <span className="font-semibold text-gray-900">₱{currentOrder.amountPaid.toFixed(2)}</span>
            </div>
            {currentOrder.amountPaid > currentOrder.total && (
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Change:</span>
                <span className="font-semibold text-green-600">
                  ₱{(currentOrder.amountPaid - currentOrder.total).toFixed(2)}
                </span>
              </div>
            )}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-primary">₱{currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Print Status */}
          <div className="p-6 text-center bg-yellow-50 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-yellow-700 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Processing Order</span>
            </div>
            <p className="text-sm text-yellow-600">Your order will be printed soon</p>
          </div>

          {/* Barcode */}
          <div className="p-6 text-center border-b border-gray-200">
            <div className="inline-block bg-black p-3 rounded">
              <div className="flex space-x-px">
                {Array.from({ length: 40 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-white"
                    style={{
                      width: Math.random() > 0.5 ? '2px' : '1px',
                      height: '30px'
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-white text-xs mt-2 font-mono">
                {Math.random().toString().substring(2, 15)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 text-center text-gray-500">
            <p className="text-xs mb-4">Thank you for shopping with us!</p>
            <p className="text-xs">Keep this receipt for your records</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-b-3xl shadow-2xl p-6 -mt-1">
          <button
            onClick={handleNewOrder}
            className="w-full bg-primary text-white py-4 px-6 rounded-xl hover:bg-primary-dark transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Start New Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;