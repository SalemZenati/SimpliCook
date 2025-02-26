"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
  FaSearch,
  FaHeart,
  FaClock,
  FaShare,
  FaPrint,
  FaRobot,
  FaTrash,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RecipeContext = createContext();

const cuisineTypes = ["Italian", "Mexican", "Asian", "Indian", "Mediterranean"];
const dietTypes = ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo"];
const difficultyLevels = ["Easy", "Medium", "Hard"];

const dummyRecipes = [
  {
    id: 1,
    title: "Creamy Mushroom Pasta",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    cookingTime: "30 mins",
    difficulty: "Easy",
    cuisine: "Italian",
    diet: "Vegetarian",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Spicy Thai Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    cookingTime: "45 mins",
    difficulty: "Medium",
    cuisine: "Asian",
    diet: "Vegan",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Mediterranean Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    cookingTime: "15 mins",
    difficulty: "Easy",
    cuisine: "Mediterranean",
    diet: "Vegan",
    isFavorite: true,
  },
];

const Header = () => (
  <header className="relative pt-20 h-80 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white dark:from-green-700 dark:via-green-600 dark:to-green-500">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        SimpliCook Recipe Library
      </h1>
      <div className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full py-3 px-4 pr-12 rounded-lg bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  </header>
);

const FilterSection = () => (
  <div className="bg-white shadow-sm p-4 rounded-lg mb-8 dark:bg-gray-800 dark:text-gray-200">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <select className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <option value="">Cuisine Type</option>
        {cuisineTypes.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
      <select className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <option value="">Diet Preference</option>
        {dietTypes.map((diet) => (
          <option key={diet} value={diet}>
            {diet}
          </option>
        ))}
      </select>
      <select className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <option value="">Difficulty</option>
        {difficultyLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <select className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <option value="">Cooking Time</option>
        <option value="quick">Quick (Less than 30 mins)</option>
        <option value="medium">Medium (30-60 mins)</option>
        <option value="long">Long (Over 60 mins)</option>
      </select>
    </div>
  </div>
);

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [cuisinePreference, setCuisinePreference] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState(() => {
    if (typeof window !== "undefined") {
      const storedRecipes = localStorage.getItem("savedRecipes");
      return storedRecipes ? JSON.parse(storedRecipes) : [];
    }
    return [];
  });
  const [expandedRecipeId, setExpandedRecipeId] = useState(null); // Track expanded recipe

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    }
  }, [savedRecipes]);

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that creates recipes based on user-provided ingredients and preferences.",
            },
            {
              role: "user",
              content: `Generate a recipe using the following ingredients: ${ingredients}. Include a ${cuisinePreference || "default"} cuisine style and ${dietaryRestrictions || "no"} dietary restrictions. Just send the recipe, no added fluff words.`,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedText = response.data.choices[0].message.content;
      const sections = generatedText.split("**");
      const title = sections[1] || "AI-Generated Recipe";
      const ingredientsIndex = sections.findIndex((s) =>
        s.toLowerCase().includes("ingredients")
      );
      const instructionsIndex = sections.findIndex((s) =>
        s.toLowerCase().includes("instructions")
      );

      const extractedIngredients =
        ingredientsIndex !== -1 && sections[ingredientsIndex + 1]
          ? sections[ingredientsIndex + 1]
              .split("\n")
              .map((line) => line.replace(/^-/, "").trim())
              .filter((line) => line.length > 0)
          : [];

      const extractedInstructions =
        instructionsIndex !== -1 && sections[instructionsIndex + 1]
          ? sections[instructionsIndex + 1]
              .split("\n")
              .map((line) => line.replace(/^\d+\./, "").trim())
              .filter((line) => line.length > 0)
          : [];

      setGeneratedRecipe({
        id: Date.now(),
        title,
        ingredients: extractedIngredients,
        instructions: extractedInstructions,
        isFavorite: false,
      });
    } catch (err) {
      setError("Failed to generate a recipe. Please try again.");
      console.error("Error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = () => {
    if (!generatedRecipe) return;
    setSavedRecipes((prev) => [...prev, { ...generatedRecipe }]);
  };

  const toggleFavorite = (id) => {
    setSavedRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const toggleExpandRecipe = (id) => {
    setExpandedRecipeId((prevId) => (prevId === id ? null : id)); // Toggle expansion
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-8 dark:bg-gray-800 dark:text-gray-200">
      <div className="flex items-center mb-4">
        <FaRobot className="text-2xl text-green-500 mr-2" />
        <h2 className="text-2xl font-bold">AI Recipe Generator</h2>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <textarea
        className="w-full p-3 mb-4 rounded-lg border bg-white dark:bg-gray-700 dark:border-gray-600"
        placeholder="Enter your ingredients..."
        rows="4"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        onClick={generateRecipe}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {generatedRecipe && (
  <div className="mt-6 bg-white p-4 rounded-lg shadow-sm dark:bg-gray-700">
    <h3 className="text-xl font-bold mb-2">{generatedRecipe.title}</h3>

    <div className="mt-4 flex gap-4">
      <button
        onClick={saveRecipe}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Save Recipe
      </button>
    </div>

    {/* Display Ingredients */}
    {generatedRecipe.ingredients.length > 0 && (
      <>
        <h4 className="font-semibold mt-4">Ingredients:</h4>
        <ul className="list-disc list-inside">
          {generatedRecipe.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </>
    )}

    {/* Display Instructions */}
    {generatedRecipe.instructions.length > 0 && (
      <>
        <h4 className="font-semibold mt-4">Instructions:</h4>
        <ol className="list-decimal list-inside">
          {generatedRecipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </>
    )}
  </div>
)}

      {/* Saved Recipes Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Saved Recipes</h3>
        {savedRecipes.length === 0 ? (
          <p>No saved recipes yet.</p>
        ) : (
          <ul>
            {savedRecipes.map((recipe) => (
              <li key={recipe.id} className="mb-2 p-2 border rounded-lg">
                <div className="flex justify-between items-center cursor-pointer">
                  <span
                    className="font-semibold text-lg"
                    onClick={() => toggleExpandRecipe(recipe.id)}
                  >
                    {recipe.title}
                  </span>
                  <div className="flex gap-2">
                    {/* <button onClick={() => toggleFavorite(recipe.id)}>
                      <FaHeart
                        className={recipe.isFavorite ? "text-red-500" : "text-gray-400"}
                      />
                    </button> */}
                    <button onClick={() => toggleExpandRecipe(recipe.id)}>
                      {expandedRecipeId === recipe.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                {/* Expanded Recipe View */}
                {expandedRecipeId === recipe.id && (
                  <div className="mt-2 p-2 border-t">
                    <h4 className="font-semibold">Ingredients:</h4>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <h4 className="font-semibold mt-2">Instructions:</h4>
                    <ol className="list-decimal list-inside">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite } = useContext(RecipeContext);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:text-gray-200">
      <div className="relative h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm dark:bg-gray-700"
        >
          <FaHeart
            className={
              recipe.isFavorite
                ? "text-red-500 dark:text-red-400"
                : "text-gray-400 dark:text-gray-300"
            }
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <FaClock className="mr-1" />
          <span>{recipe.cookingTime}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs dark:bg-gray-700">
            {recipe.cuisine}
          </span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs dark:bg-gray-700">
            {recipe.diet}
          </span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs dark:bg-gray-700">
            {recipe.difficulty}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <button className="text-gray-500 hover:text-green-500 dark:hover:text-green-400">
            <FaShare />
          </button>
          <button className="text-gray-500 hover:text-green-500 dark:hover:text-green-400">
            <FaPrint />
          </button>
          <button className="text-gray-500 hover:text-red-500 dark:hover:text-red-400">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

const RecipeLibrary = () => {
  const [recipes, setRecipes] = useState(dummyRecipes);

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  return (
    <RecipeContext.Provider value={{ toggleFavorite }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Navbar/>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <FilterSection />
          <AIRecipeGenerator />
          <h2 className="text-2xl font-bold mb-6">Your Recipe Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </main>
        <Footer/>
      </div>
    </RecipeContext.Provider>
  );
};

export default RecipeLibrary;
