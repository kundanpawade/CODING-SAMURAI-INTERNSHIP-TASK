import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Layout/Header';
import { CategoryFilter } from './components/Layout/CategoryFilter';
import { ProductGrid } from './components/Products/ProductGrid';
import { ProductModal } from './components/Products/ProductModal';
import { CartSidebar } from './components/Cart/CartSidebar';
import { AuthModal } from './components/Auth/AuthModal';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { useProducts, useCategories } from './hooks/useProducts';
import { Product } from './types';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { products, loading: productsLoading } = useProducts(selectedCategory || undefined, searchQuery);
  const { categories, loading: categoriesLoading } = useCategories();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600">
            Find everything you need with our curated selection of high-quality products
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          loading={categoriesLoading}
        />

        <ProductGrid
          products={products}
          loading={productsLoading}
          onProductClick={handleProductClick}
        />
      </main>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;