import React from 'react';
import { X } from 'lucide-react';

export function IngredientList({ ingredients, onRemove }) {
  return (
    <div className="space-y-2">
      {ingredients.map((ingredient, index) => (
        <div
          key={ingredient}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
        >
          <span>{ingredient}</span>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
} 