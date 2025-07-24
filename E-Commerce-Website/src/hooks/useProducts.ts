import { useEffect, useState } from 'react';
import { Product, Category } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);
  return { products, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/categories')
      .then(res => res.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);
  return { categories, loading };
}