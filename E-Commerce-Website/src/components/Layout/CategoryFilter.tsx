import React from 'react';
import { Category } from '../../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  loading: boolean;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange, loading }: CategoryFilterProps) {
  if (loading) {
    return (
      <div className="flex space-x-2 overflow-x-auto py-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex space-x-2 overflow-x-auto py-4">
      <button
        onClick={() => onCategoryChange(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          selectedCategory === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}