const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect Database;
if (process.env.MONGO_URI) {
    connectDB();
} else {
    // Fallback if no MONGO_URI for now
    console.log("No MONGO_URI provided, skipping DB connect for this step unless local.");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', require('./routes/publicBooks'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/library', require('./routes/library'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Libri API' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
