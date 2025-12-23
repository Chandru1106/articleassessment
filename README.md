# BeyondChats Article Management System

A full-stack application that scrapes articles from BeyondChats, enhances them using AI (Gemini/OpenAI), and displays them in a modern React UI.

## 🌐 Live Demo

- **Frontend:** [https://articleassessment-bhvra1tex-chandrus-projects-a396139f.vercel.app](https://articleassessment-xxx.vercel.app)
- **Backend API:** [https://abundant-balance-production.up.railway.app/api/articles](https://abundant-balance-production.up.railway.app/api/articles)

---

## 📋 Project Structure

```
├── backend/           # Laravel 12 REST API
├── frontend/          # React + Vite + Tailwind CSS
├── nodejs-script/     # LLM Article Enhancement Script
└── README.md
```

---

## 🚀 Local Setup Instructions

### Prerequisites

- **PHP 8.2+** with extensions: `pdo_sqlite`, `curl`, `mbstring`, `openssl`
- **Composer** (PHP package manager)
- **Node.js 20+** and npm
- **Git**

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Chandru1106/articleassessment.git
cd articleassessment
```

---

### Step 2: Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed sample articles (optional)
php artisan db:seed

# Start Laravel development server
php artisan serve --port=8000
```

**Backend will run at:** `http://127.0.0.1:8000`

#### Scrape Real Articles (Optional)
```bash
php artisan scrape:articles --count=5
```

---

### Step 3: Frontend Setup (React)

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev -- --port=3000
```

**Frontend will run at:** `http://localhost:3000`

---

### Step 4: NodeJS LLM Script Setup (Optional)

This script enhances articles using Google Gemini or OpenAI.

```bash
cd nodejs-script

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file:**
```env
LARAVEL_API_URL=http://127.0.0.1:8000/api
GEMINI_API_KEY=your_gemini_api_key_here
LLM_PROVIDER=gemini
```

**Get a free Gemini API key:** https://aistudio.google.com/app/apikey

**Run the enhancement script:**
```bash
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List all articles |
| GET | `/api/articles/{id}` | Get single article |
| GET | `/api/articles/latest` | Get latest article |
| POST | `/api/articles` | Create article |
| PUT | `/api/articles/{id}` | Update article |
| DELETE | `/api/articles/{id}` | Delete article |

---

## 🎨 Features

- ✅ **Web Scraping** - Fetch articles from BeyondChats blog
- ✅ **AI Enhancement** - Improve articles using Gemini/OpenAI
- ✅ **Reference Citations** - Track sources used for enhancement
- ✅ **Original/Enhanced Toggle** - Compare versions side-by-side
- ✅ **Modern UI** - Clean, responsive React interface
- ✅ **Filter by Status** - View All, Enhanced, or Original articles

---

## 🚢 Deployment Guide

### Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select this repository
4. Set **Root Directory:** `backend`
5. Add environment variables:
   ```
   APP_KEY=base64:YOUR_APP_KEY
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=sqlite
   ```

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import repository from GitHub
3. Set **Root Directory:** `frontend`
4. Set **Framework Preset:** Vite
5. Add environment variable:
   ```
   VITE_API_URL=https://your-railway-url.railway.app/api
   ```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 12, PHP 8.3, SQLite |
| Frontend | React 18, Vite, Tailwind CSS |
| LLM Script | Node.js, Axios, Cheerio |
| AI | Google Gemini / OpenAI GPT |
| Deployment | Railway (backend), Vercel (frontend) |

---

## 📁 Key Files

| File | Description |
|------|-------------|
| `backend/app/Http/Controllers/ArticleController.php` | REST API logic |
| `backend/app/Console/Commands/ScrapeArticles.php` | Web scraper |
| `frontend/src/App.jsx` | Main React component |
| `frontend/src/components/ArticleCard.jsx` | Article card component |
| `frontend/src/components/ArticleDetail.jsx` | Article modal |
| `nodejs-script/src/index.js` | LLM enhancement orchestrator |
| `nodejs-script/src/services/llmEnhancer.js` | Gemini/OpenAI integration |

---

## 📝 How It Works

```
1. SCRAPE → php artisan scrape:articles
   ↓
   Fetches 5 oldest articles from BeyondChats blog
   ↓
   Stores in SQLite database as "original"

2. ENHANCE → npm start (in nodejs-script/)
   ↓
   Searches Google for related articles
   ↓
   Scrapes top 2 reference articles
   ↓
   Uses LLM to improve content
   ↓
   Updates article as "enhanced" with references

3. VIEW → React Frontend
   ↓
   Displays all articles with Original/Enhanced toggle
   ↓
   Shows reference citations
```

---

## 👨‍💻 Author

**Chandru** - [GitHub](https://github.com/Chandru1106)

---

## 📅 Assignment

BeyondChats Technical Product Manager Assignment  
**Deadline:** December 25, 2025
