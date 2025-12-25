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
  -  phase1-laravel
  -  phase2-node
  -  phase3-frontend-react
  -  README.md

## Local Setup Instructions

### 1️⃣ Phase 1 - Backend (Laravel)

cd backend-laravel

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan serve

or 

php artisan serve --host=127.0.0.1 --port=8000


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

BeyondChats Website -> Laravel Scraper (Phase 1) -> MySQL Database -> NodeJS Pipeline (Phase 2) -> Laravel Update API -> React Frontend(Phase 3)

Frontend deployed on Netlify:

Live Demo

🔗 https://jbeyondchats.netlify.app
