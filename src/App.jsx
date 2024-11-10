import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Refrigerator, ChefHat } from 'lucide-react';
import { IngredientForm } from './components/IngredientForm';
import { IngredientList } from './components/IngredientList';
import { RecipeList } from './components/RecipeList';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient.toLowerCase())) {
      setIngredients([...ingredients, ingredient.toLowerCase()]);
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const getRecipeIngredients = (recipe) => {
    const recipeIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        recipeIngredients.push(ingredient.toLowerCase());
      }
    }
    return recipeIngredients;
  };

  const fetchRecipes = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const recipePromises = ingredients.map(ingredient =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`)
      );

      const responses = await Promise.all(recipePromises);

      const uniqueRecipeIds = new Set();
      const allRecipes = [];

      responses.forEach(response => {
        const meals = response.data.meals || [];
        meals.forEach((meal) => {
          if (!uniqueRecipeIds.has(meal.idMeal)) {
            uniqueRecipeIds.add(meal.idMeal);
            allRecipes.push(meal);
          }
        });
      });

      const detailedRecipes = await Promise.all(
        allRecipes.slice(0, 10).map(async (recipe) => {
          const details = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
          );
          const detailedRecipe = details.data.meals[0];
          const recipeIngredients = getRecipeIngredients(detailedRecipe);

          const matchingIngredients = ingredients.filter(ingredient =>
            recipeIngredients.some(recipeIng => recipeIng.includes(ingredient))
          );

          return {
            ...detailedRecipe,
            matchingIngredients
          };
        })
      );

      const sortedRecipes = detailedRecipes.sort((a, b) =>
        (b.matchingIngredients?.length || 0) - (a.matchingIngredients?.length || 0)
      );

      setRecipes(sortedRecipes);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch recipes. Please try again.');
      setRecipes([]);
    }
    setLoading(false);
  };

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const randomRecipe = response.data.meals[0];
      const recipeIngredients = getRecipeIngredients(randomRecipe);

      const matchingIngredients = ingredients.filter(ingredient =>
        recipeIngredients.some(recipeIng => recipeIng.includes(ingredient))
      );

      const detailedRecipe = {
        ...randomRecipe,
        matchingIngredients
      };

      setRecipes([detailedRecipe]);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch random recipe. Please try again.');
      setRecipes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, [ingredients]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(ingredients);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setIngredients(items);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Refrigerator className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">What's in My Fridge?</h1>
          </div>
          <p className="text-gray-600">Add your ingredients and discover delicious recipes!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="sticky top-5">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ChefHat className="text-blue-600" />
                Your Ingredients
              </h2>

              <IngredientForm onAdd={addIngredient} />
              {ingredients.length < 1 && (
                <button
                  onClick={fetchRandomRecipe}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Surprise Me!
                </button>
              )}
              <IngredientList
                ingredients={ingredients}
                onRemove={removeIngredient}
              />
            </div>
          </div>

          <RecipeList
            recipes={recipes}
            loading={loading}
            hasIngredients={ingredients.length > 0}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 