const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'H0n@s0up1234',
    database: 'burger_db',
});

connection.connect((err)=>{
    if (err) {
        console.error('Error connecting: ' + err.stack)
        return;
    };
    console.log('Connection established as id ' + connection.threadId);
});

// exporting for ORM
module.exports = connection;