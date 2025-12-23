# BeyondChats - Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Frontend Only - Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/beyondchats.git
   git push -u origin main
   ```

2. **Deploy Frontend to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```

---

### Option 2: Railway (Full Stack)

Deploy both backend and frontend to Railway:

1. **Create Railway Account** at [railway.app](https://railway.app)

2. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select `backend` folder
   - Railway auto-detects PHP/Laravel
   - Add environment variables:
     ```
     APP_KEY=base64:... (generate with: php artisan key:generate --show)
     APP_ENV=production
     APP_DEBUG=false
     ```

3. **Deploy Frontend**
   - Add new service → `frontend` folder
   - Build command: `npm run build`
   - Start command: `npx serve dist`

---

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)

#### Backend Setup
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/beyondchats.git
cd beyondchats/backend

# Install dependencies
composer install --no-dev --optimize-autoloader

# Set permissions
chmod -R 775 storage bootstrap/cache

# Configure environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate --force

# Optimize
php artisan config:cache
php artisan route:cache
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/beyondchats/backend/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

#### Frontend Setup
```bash
cd beyondchats/frontend
npm install
npm run build

# Serve with nginx or copy dist to web root
cp -r dist/* /var/www/html/
```

---

## Environment Variables Summary

### Backend (.env)
| Variable | Description |
|----------|-------------|
| APP_KEY | Laravel app key (auto-generated) |
| APP_ENV | production |
| APP_DEBUG | false |
| APP_URL | https://api.yourdomain.com |
| DB_CONNECTION | sqlite (or mysql for production) |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| VITE_API_URL | https://api.yourdomain.com/api |

### NodeJS Script (.env)
| Variable | Description |
|----------|-------------|
| LARAVEL_API_URL | https://api.yourdomain.com/api |
| GEMINI_API_KEY | Your Gemini API key |

---

## Production Checklist

- [ ] Generate production APP_KEY
- [ ] Set APP_DEBUG=false
- [ ] Configure proper database (MySQL/PostgreSQL)
- [ ] Set up SSL certificates
- [ ] Configure CORS for frontend domain
- [ ] Set up cron for scheduled tasks
- [ ] Enable caching
- [ ] Set up monitoring/logging

---

## Build Outputs

```
frontend/dist/
├── index.html (0.46 KB)
├── assets/
│   ├── index-*.css (24.88 KB)
│   └── index-*.js (243.25 KB)
```

Total bundle size: ~268 KB (78 KB gzipped)
