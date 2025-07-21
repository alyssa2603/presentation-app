import React from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
        {/* Header with celebration icon */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <PartyPopper className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you!</h1>
          <p className="text-gray-600">Your order has been processed successfully</p>
        </div>

        {/* Dotted separator */}
        <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

        {/* Order details */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">ORDER ID</span>
            <span className="font-bold text-gray-900">{currentOrder.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Amount</span>
            <span className="font-bold text-gray-900">${currentOrder.total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Amount Paid</span>
            <span className="font-bold text-gray-900">${currentOrder.amountPaid.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">DATE & TIME</span>
            <span className="font-bold text-gray-900">
              {formatDate(currentOrder.createdAt)}
            </span>
          </div>

          {/* Customer info with card-like design */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <div className="w-8 h-6 bg-gradient-to-r from-red-400 to-yellow-400 rounded-sm"></div>
              </div>
              <div>
                <p className="font-semibold text-lg">{currentOrder.customer}</p>
                <p className="text-blue-100 text-sm">•••• {Math.floor(Math.random() * 9000) + 1000}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-black p-4 rounded">
            <div className="flex space-x-px">
              {Array.from({ length: 45 }, (_, i) => (
                <div
                  key={i}
                  className="bg-white"
                  style={{
                    width: Math.random() > 0.5 ? '2px' : '1px',
                    height: '40px'
                  }}
                ></div>
              ))}
            </div>
            <p className="text-white text-xs mt-2 font-mono">
              {Math.random().toString().substring(2, 15)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;