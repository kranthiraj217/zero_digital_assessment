const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Get all users
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

// Add a new user
router.post('/users', (req, res) => {
    const { firstName, lastName, email, mobile, role } = req.body;
    
    if (!firstName || !lastName || !email || !mobile || !role) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = 'INSERT INTO users (firstName, lastName, email, mobile, role) VALUES (?, ?, ?, ?, ?)';
    //const values = [firstName, lastName, email, mobile, role];
    
    db.query(query, [firstName, lastName, email, mobile, role], (err, result) => {
        if (err) {
            console.error('Error adding user:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    });
});

module.exports = router;
