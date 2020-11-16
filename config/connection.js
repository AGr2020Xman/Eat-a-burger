const mysql = require('mysql');

//JAWSDB connection
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'H0n@s0up1234',
        database: 'burger_db',
    });
};

// Local development connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'burger_db',
// });

connection.connect((err)=>{
    if (err) {
        console.error('Error connecting: ' + err.stack)
        return;
    };
    console.log('Connection established as id ' + connection.threadId);
});

// exporting for ORM
module.exports = connection;