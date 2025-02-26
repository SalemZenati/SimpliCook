
### **SimpliCook - AI-Powered Recipe Finder & Scraper**
#### 🍳 **Discover Recipes, Generate AI Dishes, and Scrape from AllRecipes**

SimpliCook is a **full-stack recipe discovery** app that allows users to:
- **Search for recipes** using AI-generated content.
- **Scrape trending & category recipes** from AllRecipes.
- **Save and favorite recipes** for later.

---

## **🚀 Features**
✅ **AI Recipe Generator** - Uses OpenAI's API to generate recipes based on user input.  
✅ **Web Scraping from AllRecipes** - Fetches **trending & category recipes** using BeautifulSoup.  
✅ **Category-Based Browsing** - Users can filter recipes by category (Desserts, Drinks, etc.).  
✅ **Fast Recipe Search** - Users can search for recipes with real-time results.  
✅ **Favorite & Save Recipes** - Users can save AI-generated recipes for later.  

---

## **🛠️ Tech Stack**
**Frontend:**
- React.js (Next.js)
- TailwindCSS
- Framer Motion (Animations)
- Axios (API calls)

**Backend:**
- Flask (Python)
- BeautifulSoup (Web Scraping)
- Recipe-Scrapers (Extracting Recipe Data)
- OpenAI API (AI Recipe Generator)
- Flask-CORS (Cross-Origin Requests)

---

## **📌 Setup & Installation**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/SimpliCook.git
cd SimpliCook
```

### **2️⃣ Install Dependencies**
#### **Frontend (React)**
```bash
cd frontend
npm install
```

#### **Backend (Flask)**
```bash
cd backend
pip install -r requirements.txt
```

### **3️⃣ Run the Application**
#### **Start Flask API**
```bash
cd backend
python server.py
```

#### **Start React App**
```bash
cd frontend
npm run dev
```

Now, open **`http://localhost:3000`** in your browser! 🚀  

---

## **🔌 API Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/discover-trending` | Fetches trending recipes from AllRecipes |
| **GET** | `/category-recipes?category=desserts` | Fetches recipes from a specific category |
| **GET** | `/search-recipes?query=pasta` | Searches for recipes on AllRecipes |
| **POST** | `/generate-recipe` | Generates an AI-powered recipe |

---

## **📌 Category Mapping**
| Category | API Query |
|----------|----------|
| Desserts | `category=desserts` |
| Drinks | `category=drinks` |
| Breakfast | `category=breakfast` |
| Lunch | `category=lunch` |
| Healthy | `category=healthy` |

---

## **👨‍💻 Contributing**
Want to contribute? Feel free to submit a pull request! 🔥  

1. Fork the repo  
2. Create a feature branch (`git checkout -b new-feature`)  
3. Commit changes (`git commit -m "Added new feature"`)  
4. Push to the branch (`git push origin new-feature`)  
5. Open a pull request  

---

## **📜 License**
MIT License. Feel free to use and modify! 🚀  

---

Let me know if you need any changes! 🔥🔥
