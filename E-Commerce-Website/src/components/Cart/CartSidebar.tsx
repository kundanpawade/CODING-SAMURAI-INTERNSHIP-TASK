import React from 'react';
import { X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();
  const { user } = useAuth();

  const total = getCartTotal();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex space-x-3 animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">Your cart is empty</div>
                <div className="text-sm text-gray-400">Add some products to get started!</div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-3 group">
                    <img
                      src={item.product?.image_url || 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg'}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {item.product?.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        ₹{item.product?.price}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 py-1 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              
              {user ? (
                <button
                  onClick={onCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Proceed to Checkout</span>
                </button>
              ) : (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 text-center">
                    Please sign in to proceed to checkout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}