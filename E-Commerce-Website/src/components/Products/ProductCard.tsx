import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      await addToCart(product.id);
    }
  };

  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image_url || 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">(4.5)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
              {product.is_featured && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </span>
          
          {user && product.stock_quantity > 0 && (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200 group-hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}