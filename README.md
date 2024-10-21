# ERP Dashboard Project

## Description
This project is an ERP Dashboard built using Node.js, Express.js, MySQL, Alpine.js, and Tailwind CSS. It provides functionality to add users and display them in a dashboard.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or higher)
- **MySQL** (version 5.7 or higher)
- **XAMPP** (for MySQL management)
- **Postman** (for testing APIs)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/erp-dashboard.git
   cd erp-dashboard

Install dependencies: npm install
Set up MySQL:

Open XAMPP and start the MySQL service.
Create a new database called erp_db.
Run the following SQL commands to create a users table: 
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15) NOT NULL,
    role ENUM('Admin', 'User') NOT NULL
);
Configure your database connection:

Open the server.js file in the root directory. Modify the MySQL connection details as needed
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: '', // leave empty if no password
    database: 'erp_db'
});
Start the server: node server.js
Access the application: Open your web browser and go to http://localhost:5000.                         

Database Configuration: Update the database connection details in server.js.
Frontend Changes: Ensure you have linked all required CSS and JS files in your HTML files.
API Endpoints: The /api/users endpoint in server.js should be configured to handle user creation with the following code:
app.post('/api/users', (req, res) => {
    const user = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to add user' });
        }
        res.status(201).json({ message: 'User added successfully' });
    });
});
You can use Postman to test the API endpoints. Here’s how to test the POST /api/users endpoint:

Open Postman.
Set the method to POST.
Enter the URL http://localhost:5000/api/users.
In the body, select raw and set the type to JSON.
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "role": "Admin"
}
Send the request and check for a success message.


If you would like to contribute to this project, feel free to submit a pull request or open an issue for discussion.
