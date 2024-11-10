import React, { useState } from "react";

import { Plus } from "lucide-react";

export function IngredientForm({ onAdd }) {
  const [newIngredient, setNewIngredient] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const trimmedIngredient = newIngredient.trim();

    if (!trimmedIngredient) {
      setError("Please enter an ingredient");

      return;
    }

    if (trimmedIngredient.length < 2) {
      setError("Ingredient name must be at least 2 characters");

      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedIngredient)) {
      setError("Ingredient name should only contain letters and spaces");

      return;
    }

    onAdd(trimmedIngredient);

    setNewIngredient("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Add an ingredient..."
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form>
  );
}
