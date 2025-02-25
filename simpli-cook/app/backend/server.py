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

def get_trending_urls():
    """Scrape trending recipe URLs from AllRecipes homepage"""
    url = "https://www.allrecipes.com/"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.content, "html.parser")

        recipe_links = []
        for link in soup.select("a[href*='/recipe/']"):
            href = link["href"]
            if href not in recipe_links and len(recipe_links) < 6:  # Limit to 6 recipes
                recipe_links.append(href)

        return recipe_links
    except Exception as e:
        print(f"Error fetching trending recipes: {e}")
        return []

def scrape_recipes(urls):
    """Scrape details of recipes from given URLs"""
    scraped_recipes = []
    for url in urls:
        try:
            # Fetch HTML manually
            html = requests.get(url).text
            scraper = scrape_html(html, org_url=url)  # FIXED: Use scrape_html

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
            print(f"Error scraping {url}: {e}")
    return scraped_recipes

def scrape_trending_recipes():
    """Scrape and store trending recipes"""
    global trending_recipes
    urls = get_trending_urls()
    trending_recipes = scrape_recipes(urls)
    print("Updated trending recipes.")

# Run the scraper initially
scrape_trending_recipes()

# Schedule the scraper to run every 24 hours
schedule.every(24).hours.do(scrape_trending_recipes)

def schedule_runner():
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

# Start the scheduler in a background thread
threading.Thread(target=schedule_runner, daemon=True).start()

@app.route("/discover-trending", methods=["GET"])
def get_trending_recipes():
    """API Endpoint to return trending recipes"""
    return jsonify(trending_recipes)

@app.route("/category-recipes", methods=["GET"])
def get_category_recipes():
    """API Endpoint to fetch recipes for a specific category"""
    category = request.args.get("category", "").lower()
    url = f"https://www.allrecipes.com/recipes/"
    
    if not category:
        return jsonify({"error": "Category is required"}), 400
    
    try:
        response = requests.get(f"{url}{category}/", headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(response.content, "html.parser")
        recipe_links = [a["href"] for a in soup.select("a[href*='/recipe/']")[:6]]  # Limit to 6
        recipes = scrape_recipes(recipe_links)
        return jsonify(recipes)
    except Exception as e:
        print(f"Error fetching category recipes: {e}")
        return jsonify({"error": "Failed to fetch category recipes"}), 500

@app.route("/search-recipes", methods=["GET"])
def search_recipes():
    """API Endpoint to search recipes by a query"""
    query = request.args.get("query", "").replace(" ", "+")
    url = f"https://www.allrecipes.com/search/results/?wt={query}"
    
    if not query:
        return jsonify({"error": "Search query is required"}), 400
    
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(response.content, "html.parser")
        recipe_links = [a["href"] for a in soup.select("a[href*='/recipe/']")[:6]]  # Limit to 6
        recipes = scrape_recipes(recipe_links)
        return jsonify(recipes)
    except Exception as e:
        print(f"Error searching recipes: {e}")
        return jsonify({"error": "Failed to fetch search results"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
