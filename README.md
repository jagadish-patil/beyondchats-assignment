# BeyondChats Assignment – Full Stack Project

## Overview
This is a full-stack monorepo containing:
- Laravel backend (Article scraping & APIs)
- NodeJS pipeline (Google search, scraping, LLM rewrite)
- React frontend (article viewer)

## Tech Stack
- Backend: Laravel 10, MySQL
- Phase 2: NodeJS, Axios, Cheerio
- Frontend: React (Create React App)
- Database: MySQL
- Hosting: Netlify (Frontend)

## Project Structure
beyondchats-assignment/
├── phase1-laravel                  # Phase 1 (Laravel)
├── phase2-node                     # Phase 2 (NodeJS + LLM)
├── phase3-frontend-react           # Phase 3 (React)
└── README.md                       # Main documentation

## Local Setup Instructions

### 1️⃣ Phase 1 - Backend (Laravel)

cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

### 2️⃣ Phase 2 – NodeJS Pipeline

cd phase2-node
npm install
node src/index.js

### 2️⃣ Phase 3 – Frontend (React)

cd frontend-react
npm install
npm start

Frontend runs on:

http://localhost:3000

Data Flow / Architecture Diagram

BeyondChats Website
        ↓
Laravel Scraper (Phase 1)
        ↓
MySQL Database
        ↓
NodeJS Pipeline (Phase 2)
- Google Search
- Article Scraping
- LLM Rewrite (Mock)
        ↓
Laravel Update API
        ↓
React Frontend (Phase 3)

Frontend deployed on Netlify:

Live Demo

🔗 https://YOUR-NETLIFY-LINK.netlify.app

