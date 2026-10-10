# Home Services Booking

A MERN stack website for booking home services such as plumbing, electrical work, cleaning, and more.

## Features
- Service listings and categories
- Provider profiles and specialties
- Customer booking management
- Date, time, and location scheduling
- Authentication with JWT
- Role-based access for customer, provider, and admin
- Responsive frontend UI in React
- REST API backend in Node.js + Express

## Tech stack
- MongoDB + Mongoose
- Express.js
- React + Vite
- Node.js
- JWT Auth

## Project structure
- `backend/` - Express REST API and MongoDB models
- `frontend/` - React application

## Quick start

### 1) Install backend dependencies
```bash
cd backend
npm install
```

### 2) Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 3) Start MongoDB locally
Make sure MongoDB is running on:
```bash
mongodb://127.0.0.1:27017/home-services-booking
```

### 4) Run backend
```bash
cd backend
cp .env.example .env
npm run dev
```

### 5) Run frontend
```bash
cd frontend
npm run dev
```

### 6) Open the app
Visit `http://localhost:5173`

## Default admin account
The app can be used by creating a user with the `admin` role through the registration form or by seeding data from the API.

## Notes
The backend is designed to be ready for MongoDB-backed CRUD and booking workflows, while the frontend demonstrates the service booking experience in a production-style interface.
