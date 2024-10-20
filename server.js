const express = require('express');
const path = require('path');
const userRoutes = require('./api/userRoutes'); // Import user API routes
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables


const app = express();

// Middleware to parse incoming request bodies in JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'css' and 'js' directories
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js',express.static(path.join(__dirname, 'js')));

// Serve static files (for HTML pages) from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));


// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});


// Fetch users
app.get('/api/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ users: results });
    });
});
// Use the modularized user routes for all '/api' requests
app.use('/api', userRoutes);

// Add user
app.post('/api/users', (req, res) => {
    const { firstName, lastName, email, mobile, role } = req.body;
    const sql = `INSERT INTO users (firstName, lastName, email, mobile, role) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [firstName, lastName, email, mobile, role], (err, result) => {
        if (err) {
            console.error('Error adding user:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ success: true, message: "User added successfully" });
    });
});

// Use the modularized user routes for all '/api' requests
app.use('/api', userRoutes);


// Serve the index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
