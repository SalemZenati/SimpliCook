import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { GiPlantRoots, GiCupcake, GiBowlOfRice } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import axios from "axios";

const SimpliCook = () => {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (endpoint, params = {}) => {
    setLoading(true);
    try {
      const { data } = await axios.get(endpoint, { params });
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("http://localhost:5000/discover-trending");
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      fetchRecipes("http://localhost:5000/search-recipes", { query: searchQuery });
    }
  };

  const categories = [
    { name: "Desserts", id: "desserts", icon: GiCupcake },
    { name: "Drinks", id: "drinks", icon: BiWorld },
    { name: "Breakfast & Brunch", id: "breakfast", icon: GiBowlOfRice },
    { name: "Lunch", id: "lunch", icon: IoFastFoodOutline },
    { name: "Healthy", id: "healthy", icon: GiPlantRoots },
    { name: "Appetizers & Snacks", id: "appetizers-and-snacks", icon: IoFastFoodOutline },
    { name: "Salads", id: "salads", icon: GiPlantRoots },
    { name: "Side Dishes", id: "side-dishes", icon: IoFastFoodOutline },
    { name: "Soups", id: "soups", icon: GiBowlOfRice },
    { name: "Bread", id: "bread", icon: GiBowlOfRice },
  ];
  

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/category-recipes?category=${encodeURIComponent(categoryId)}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching category recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }
    try {
      alert(`Successfully subscribed with email: ${email}`);
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-white max-w-2xl text-center">
              <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-orange-300 to-orange-100 bg-clip-text text-transparent">
                Delicious Meals, Simple Cooking
              </h1>
              <p className="text-2xl mb-8 text-orange-100">
                Discover Recipes for Every Skill Level
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full font-semibold transition duration-300 hover:scale-105 transform hover:shadow-lg">
                Explore Recipes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <FiSearch className="text-gray-500 dark:text-gray-300 text-xl" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="bg-transparent w-full ml-2 outline-none text-gray-800 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="ml-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <Icon className="text-4xl text-orange-500 mb-2" />
                <p className="font-medium">{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recipes */}
      <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Todays Recipes</h2>
        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{recipe.title}</h3>
                  <a
                    href={recipe.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="bg-orange-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Weekly Recipe Inspirations</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join our community and receive fresh recipes every week!
          </p>
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg border-2 border-orange-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-r-lg hover:bg-orange-600 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpliCook;
