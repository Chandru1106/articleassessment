# BeyondChats Article Management System

A full-stack application to scrape, enhance (via LLM), and display blog articles.

## 📋 Project Overview

This project consists of three main components:

1. **Laravel Backend** - REST API for article CRUD operations + web scraper
2. **NodeJS Script** - Google search, web scraping, and LLM article enhancement
3. **React Frontend** - Professional UI to view original and enhanced articles

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      React Frontend (Port 3000)                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │ Article List  │  │ Article Card  │  │ Article Detail│       │
│  │ & Filters     │  │ Components    │  │ Modal + Toggle│       │
│  └───────┬───────┘  └───────────────┘  └───────────────┘       │
└──────────┼──────────────────────────────────────────────────────┘
           │ HTTP GET/PUT
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Laravel Backend (Port 8000)                    │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │  REST API     │  │  Scraper      │  │  SQLite DB    │       │
│  │  /api/articles│  │  Command      │  │  (articles)   │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
└─────────────────────────────────────────────────────────────────┘
           ▲
           │ HTTP GET/PUT
┌──────────┴──────────────────────────────────────────────────────┐
│                    NodeJS LLM Script                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │ Google Search │  │ Web Scraper   │  │ LLM Enhancer  │       │
│  │ (SerpAPI)     │  │ (Cheerio)     │  │ (Gemini/GPT)  │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- PHP 8.3+ with extensions: openssl, pdo_sqlite, curl, mbstring
- Node.js 20+ and npm
- Composer

### 1. Backend Setup

```bash
cd backend

# Install dependencies (if not done)
php ../composer.phar install

# Run migrations
php artisan migrate

# Scrape articles from BeyondChats
php artisan scrape:articles --count=5

# Start server
php artisan serve --port=8000
```

### 2. NodeJS Script Setup

```bash
cd nodejs-script

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your API keys:
# - SERPAPI_KEY (for Google search)
# - GEMINI_API_KEY or OPENAI_API_KEY (for LLM)

# Run the script (with Laravel server running)
npm start
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev -- --port 3000
```

Open http://localhost:3000 in your browser.

---

## 📁 Project Structure

```
.
├── backend/                 # Laravel 12 API
│   ├── app/
│   │   ├── Console/Commands/ScrapeArticles.php
│   │   ├── Http/Controllers/ArticleController.php
│   │   └── Models/Article.php
│   ├── database/migrations/
│   └── routes/api.php
│
├── nodejs-script/           # NodeJS LLM Enhancement
│   ├── src/
│   │   ├── index.js
│   │   ├── config.js
│   │   └── services/
│   │       ├── laravelApi.js
│   │       ├── googleSearch.js
│   │       ├── scraper.js
│   │       └── llmEnhancer.js
│   └── package.json
│
└── frontend/                # React + Vite + Tailwind
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── ArticleCard.jsx
    │   │   └── ArticleDetail.jsx
    │   └── services/api.js
    └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/articles | List all articles |
| GET | /api/articles/{id} | Get single article |
| GET | /api/articles/latest | Get latest article |
| POST | /api/articles | Create article |
| PUT | /api/articles/{id} | Update article |
| DELETE | /api/articles/{id} | Delete article |

---

## ⚙️ Environment Variables

### NodeJS Script (.env)
```
LARAVEL_API_URL=http://127.0.0.1:8000/api
SERPAPI_KEY=your_serpapi_key
GEMINI_API_KEY=your_gemini_key
LLM_PROVIDER=gemini
```

---

## 📝 How It Works

1. **Scrape Articles**: Run `php artisan scrape:articles` to fetch the 5 oldest articles from BeyondChats blog.

2. **Enhance with LLM**: Run `npm start` in nodejs-script to:
   - Fetch the latest article
   - Search Google for similar articles
   - Scrape content from top 2 results
   - Use LLM to enhance the article
   - Save enhanced version with references

3. **View in Frontend**: Open http://localhost:3000 to:
   - See all articles in a responsive grid
   - Filter by "Original" or "Enhanced"
   - Toggle between original/enhanced versions
   - View reference URLs

---

## 🎨 Features

- ✅ Responsive article grid with professional styling
- ✅ Toggle between original and LLM-enhanced versions
- ✅ Reference citations display
- ✅ Filter by article status (All/Enhanced/Original)
- ✅ Loading and error states
- ✅ Modern UI with Tailwind CSS

---

## 🔧 Trade-offs Made

| Decision | Rationale |
|----------|-----------|
| SQLite over MySQL | Simpler setup, no external DB required |
| DuckDuckGo fallback | Free alternative when SerpAPI is unavailable |
| Supports both Gemini & OpenAI | Flexibility in LLM choice |

---

## 🚧 What I'd Improve with More Time

- Add authentication and user management
- Implement article scheduling/queue for batch processing
- Add more comprehensive error handling
- Deploy to cloud (Railway/Vercel)
- Add unit and integration tests
- Implement real-time updates with WebSockets

---

## 📅 Deadline

December 25, 2025 at 11:59 PM IST
