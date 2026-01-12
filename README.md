# Libri - Personal Library Manager

A full-stack web application that allows users to search for books using the Google Books API. (MERN stack, RESTful API design, authentication, and state management)

**Live Website**: [https://libri.miyuru.dev](https://libri.miyuru.dev)

## Features
- **Public Search**: Search books via Google Books API (Title, Author, Keyword).
- **Authentication**: Secure Signup/Login with JWT (stored in localStorage).
- **Personal Library**: Save books, track status (Reading, Completed, Want to Read), and add personal reviews.
- **Advanced Architecture**: 
  - Centralized Axios instance with **Request/Response Interceptors**.
  - Automatic token attachment.
  - Global 401 error handling (auto-logout).

## Tech Stack
- **Frontend**: React (Hooks, Context API), Tailwind CSS, Axios.
- **Backend**: Node.js, Express.js, MongoDB Atles.
- **Auth**: JWT, bcryptjs.
- **Testing**: Jest, Supertest.

## Environment Variables

Create a `.env` file in the `/server` directory with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/libri
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_BOOKS_API_KEY=your_google_books_api_key 
NODE_ENV=development
```

## Installation & Running

This project uses a split structure (separate `client` and `server` folders).

### 1. Setup Backend
```bash
cd server
npm install
npm run dev
# Server will start on http://localhost:5000
```

### 2. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
npm start
# Client will start on http://localhost:3000
```

## Running Tests
Unit tests for the backend (Auth, Public Books Search, Health Check):
```bash
cd server
npm test
```

## Architecture & Choices
- **Folder Structure**: Modular separation (`controllers`, `routes`, `services`, `middleware`).
- **Axios Interceptors**: Located in `client/src/api/axiosInstance.js`. This ensures all API calls are authenticated and errors are handled globally, preventing code duplication in components.
- **State Management**: React `Context API` (`AuthContext`, `ToastContext`) is used for global state like user sessions and notifications, avoiding prop drilling.

## UI Preview

### Home Page
The landing page with search functionality and popular books.
![Home Page](UI%20preview/home.png)

### Search Results
Browse and discover books from Google Books API with filtering options.
![Search Results](UI%20preview/home-books.png)

### Login
Secure authentication with JWT tokens.
![Login](UI%20preview/login.png)

### Sign Up
Create a new account to start managing your library.
![Sign Up](UI%20preview/signup.png)

### My Library
View and manage your saved books collection.
![My Library](UI%20preview/my-library.png)

### Profile
Update your profile information and manage account settings.
![Profile](UI%20preview/profile.png)
