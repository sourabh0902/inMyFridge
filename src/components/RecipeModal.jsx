import React, { useState } from "react";

import { X, Youtube, Globe2, UtensilsCrossed, MapPin } from "lucide-react";

export function RecipeModal({ recipe, onClose }) {
  const [imageError, setImageError] = useState(false);

  const getIngredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];

      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure: measure || "To taste" });
      }
    }

    return ingredients;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg text-white bg-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="relative h-64 bg-gray-100">
            {!imageError ? (
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Image not available
              </div>
            )}
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>

            <div className="flex flex-wrap gap-4 mb-6">
              {recipe.strCategory && (
                <div className="flex items-center gap-2 text-gray-600">
                  <UtensilsCrossed className="w-5 h-5" />

                  <span>{recipe.strCategory}</span>
                </div>
              )}

              {recipe.strArea && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />

                  <span>{recipe.strArea}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getIngredients().map(({ ingredient, measure }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                  >
                    <span className="font-medium">{ingredient}</span>

                    <span className="text-gray-500">- {measure}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>

              <p className="text-gray-600 whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  Watch Video
                </a>
              )}

              {recipe.strSource && (
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Globe2 className="w-5 h-5" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
