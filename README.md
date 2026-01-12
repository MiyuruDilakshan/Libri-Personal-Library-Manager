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

## Bonus Features Implemented 
- ✅ **Pagination**: Page numbers for search results with smooth navigation.
- ✅ **Search Filters**: Filter by "Free E-books" and "Print Type" (books/magazines).
- ✅ **Dark Mode**: Toggle to switch between light and dark themes.
- ✅ **Unit Testing**: Comprehensive backend tests using Jest and Supertest.
- ✅ **Demo**: Deployed version (Vercel) - [https://libri.miyuru.dev](https://libri.miyuru.dev)

## Tech Stack
- **Frontend**: React , Tailwind CSS, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atles.
- **Auth**: JWT, bcryptjs.
- **Testing**: Jest, Supertest.
- **Deploy**: Vercel


## Environment Variables

Create a `.env` file in the `/server` directory with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/libri
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_BOOKS_API_KEY=your_google_books_api_key 
NODE_ENV=development
REACT_APP_API_URL=if_you_host
GOOGLE_CLIENT_ID=your_google_client_id_if_you_want_google_auth
GOOGLE_CLIENT_SECRET=your_google_client_secret_if_you_want_google_auth
```

## Installation & Running

This project uses a split structure (separate `client` and `server` folders).

### 1. Clone the project
```bash
https://github.com/MiyuruDilakshan/Libri-Personal-Library-Manager.git
```

### 2. Setup Backend
```bash
cd server
npm install
npm run dev
# Server will start on http://localhost:5000
```

### 3. Setup Frontend
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
