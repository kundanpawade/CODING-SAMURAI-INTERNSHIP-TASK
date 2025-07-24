import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const total = getCartTotal();

  // Debug: Log cart items to check for product and price
  console.log('CheckoutModal cart items:', items);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would integrate with Stripe here
    setIsProcessing(false);
    setIsComplete(true);
    
    // Clear cart after successful checkout
    setTimeout(async () => {
      await clearCart();
      setIsComplete(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isComplete ? 'Order Complete!' : 'Checkout'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {isComplete ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Thank you for your order!
                </h3>
                <p className="text-gray-600">
                  Your order has been successfully placed and will be processed shortly.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product?.name} × {item.quantity}</span>
                      <span>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Integration Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Payment Integration Ready
                    </h4>
                    <p className="text-sm text-blue-700">
                      This checkout is ready for Stripe payment integration. 
                      The payment gateway will be configured in the next step.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-200"
              >
                <CreditCard className="h-5 w-5" />
                <span>
                  {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}