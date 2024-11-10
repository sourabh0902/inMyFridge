import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { RecipeModal } from './RecipeModal';

export function RecipeCard({ recipe }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer group"
      >
        <div className="md:flex h-full">
          <div className="relative md:w-48 flex-shrink-0">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="h-48 w-full md:h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {recipe.strMeal}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {recipe.strInstructions}
            </p>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {recipe.matchingIngredients?.map((ingredient) => (
                  <span key={ingredient} className="ingredient-tag text-sm">
                    <Check className="w-4 h-4" />
                    {ingredient}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-3 text-gray-600">
                  {recipe.strCategory && <span>{recipe.strCategory}</span>}
                  {recipe.strArea && (
                    <>
                      <span>•</span>
                      <span>{recipe.strArea}</span>
                    </>
                  )}
                </div>
                <span className="text-blue-600 flex items-center gap-1">
                  View Recipe
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RecipeModal recipe={recipe} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
} 