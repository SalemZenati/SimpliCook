from flask import Flask, jsonify, request
from flask_cors import CORS
import schedule
import time
import threading
from recipe_scrapers import scrape_html
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Store scraped recipes
trending_recipes = []

# Persistent session for faster requests
session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0"})


def get_trending_urls():
    """Scrape trending recipe URLs from AllRecipes homepage"""
    url = "https://www.allrecipes.com/"
    
    try:
        response = session.get(url)
        soup = BeautifulSoup(response.content, "html.parser")

        recipe_links = []
        for link in soup.select("a[href*='/recipe/']"):
            href = link["href"]
            if href not in recipe_links and len(recipe_links) < 12:  # 🔥 Increased to 12
                recipe_links.append(href)

        print(f"✅ Fetched Trending URLs: {recipe_links}")
        return recipe_links
    except Exception as e:
        print(f"❌ Error fetching trending recipes: {e}")
        return []


def scrape_recipes(urls):
    """Scrape details of recipes from given URLs"""
    scraped_recipes = []
    
    for url in urls:
        try:
            html = session.get(url).text
            scraper = scrape_html(html, org_url=url)

            recipe_data = {
                "title": scraper.title(),
                "image": scraper.image() or "https://via.placeholder.com/150",
                "time": scraper.total_time(),
                "yields": scraper.yields(),
                "ingredients": scraper.ingredients(),
                "instructions": scraper.instructions(),
                "link": url,
            }
            scraped_recipes.append(recipe_data)
        except Exception as e:
            print(f"❌ Error scraping {url}: {e}")
    
    return scraped_recipes


def scrape_trending_recipes():
    """Scrape and store trending recipes"""
    global trending_recipes
    urls = get_trending_urls()
    
    if not urls:
        print("⚠️ No trending recipes found.")
        return

    trending_recipes = scrape_recipes(urls)
    print(f"✅ Updated Trending Recipes: {len(trending_recipes)} items")


# 🔄 Run the scraper initially
scrape_trending_recipes()

# 🕒 Schedule the scraper to run every 12 hours
schedule.every(12).hours.do(scrape_trending_recipes)


def schedule_runner():
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute


# 🔥 Start the scheduler in a background thread
threading.Thread(target=schedule_runner, daemon=True).start()


@app.route("/discover-trending", methods=["GET"])
def get_trending_recipes():
    """API Endpoint to return trending recipes"""
    return jsonify(trending_recipes)


@app.route("/force-refresh-trending", methods=["POST"])
def force_refresh_trending():
    """Manually refresh trending recipes"""
    scrape_trending_recipes()
    return jsonify({"message": "Trending recipes refreshed!"})


@app.route("/category-recipes", methods=["GET"])
def get_category_recipes():
    """Fetch recipes for a specific category"""
    category_mapping = {
        "desserts": "79/desserts",
        "drinks": "77/drinks",
        "breakfast": "78/breakfast-and-brunch",
        "lunch": "17561/lunch",
        "healthy": "84/healthy-recipes",
        "appetizers": "76/appetizers-and-snacks",
        "salads": "96/salads",
        "side dishes": "81/side-dish",
        "soups": "94/soups-stews-and-chili",
        "bread": "78/bread",
    }

    category = request.args.get("category", "").lower()
    mapped_category = category_mapping.get(category)

    if not mapped_category:
        return jsonify({"error": "Invalid category"}), 400

    url = f"https://www.allrecipes.com/recipes/{mapped_category}/"

    try:
        response = session.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        recipe_links = [a["href"] for a in soup.select("a[href*='/recipe/']")[:12]]  # 🔥 Increased to 12
        recipes = scrape_recipes(recipe_links)
        return jsonify(recipes)
    except Exception as e:
        print(f"❌ Error fetching category recipes: {e}")
        return jsonify({"error": "Failed to fetch category recipes"}), 500


@app.route("/search-recipes", methods=["GET"])
def search_recipes():
    """Search recipes by query"""
    query = request.args.get("query", "").replace(" ", "+")
    url = f"https://www.allrecipes.com/search/results/?wt={query}"

    if not query:
        return jsonify({"error": "Search query is required"}), 400

    try:
        response = session.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        recipe_links = [a["href"] for a in soup.select("a[href*='/recipe/']")[:12]]  # 🔥 Increased to 12
        recipes = scrape_recipes(recipe_links)
        return jsonify(recipes)
    except Exception as e:
        print(f"❌ Error searching recipes: {e}")
        return jsonify({"error": "Failed to fetch search results"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
