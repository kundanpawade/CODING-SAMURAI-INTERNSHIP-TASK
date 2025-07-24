import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Reset quantity to 1 whenever a new product is selected or modal is opened
  React.useEffect(() => {
    setQuantity(1);
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    if (user) {
      await addToCart(product.id, quantity);
      onClose();
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.image_url || 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg'}
                alt={product.name}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {product.is_featured && (
                  <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                    Featured Product
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(4.5 out of 5)</span>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-sm text-gray-500">
                    {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
                  </span>
                </div>

                {user && product.stock_quantity > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= product.stock_quantity}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-200"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                )}

                {!user && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600 text-center">
                      Please sign in to add items to your cart
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}