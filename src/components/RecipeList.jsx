import React from 'react';

import { Search } from 'lucide-react';

import { RecipeCard } from './RecipeCard';



export function RecipeList({ recipes, loading, hasIngredients, error }) {

  return (

    <div className="space-y-6">

      <h2 className="text-2xl font-semibold flex items-center gap-2">

        <Search className="text-blue-600" />

        Recipe Suggestions

      </h2>



      {error && (

        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">

          {error}

        </div>

      )}



      {loading ? (

        <div className="text-center py-12">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

          <p className="mt-4 text-gray-600">Finding recipes...</p>

        </div>

      ) : recipes.length > 0 ? (

        <div className="grid gap-6">

          {recipes.map((recipe) => (

            <RecipeCard key={recipe.idMeal} recipe={recipe} />

          ))}

        </div>

      ) : (

        <div className="text-center py-12 bg-white rounded-xl shadow-lg">

          <p className="text-gray-600">

            {!hasIngredients

              ? "Add ingredients to see recipe suggestions!"

              : "No recipes found with these ingredients."}

          </p>

        </div>

      )}

    </div>

  );

} 
