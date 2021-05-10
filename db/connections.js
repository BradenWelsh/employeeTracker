const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker'
    },
    console.log("You have successfully connected to the associate database.")
);
module.exports = db