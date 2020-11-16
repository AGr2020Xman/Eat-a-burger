const connection = require('./connection');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

const printQuestionMarks = (num) => {
    const array = [];
  
    for (let i = 0; i < num; i++) {
      array.push("?");
    }  
    return array.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  const objToSql = (obj) => {
    const array = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (const key in obj) {
      let value = obj[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(obj, key)) {
        // if string with spaces, add quotations (chicken burger => 'chicken burger')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {burger_name: 'chicken burger'} => ["burger_name='chicken burger'"]
        // e.g. {devoured: false} => ["devoured=false"]
        array.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return array.toString();
  }
  
  // Object for all our SQL statement functions.
  const orm = {
    selectAll: (tableInput, callback) => {
      let queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, (err, result) => {
        if (err) throw err;
        callback(result);
      });
    },
    insertOne: (table, columns, values, callback) => {
      let queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += columns.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(values.length);
      queryString += ") ";
  
      // check final queryString
      console.log(queryString);
  
      connection.query(queryString, values, (err, result) => {
        if (err) throw err;  
        callback(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: (table, objColVals, condition, callback) => {
      let queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      // check final queryString
      console.log(queryString);

      connection.query(queryString, (err, result) => {
        if (err) throw err;  
        callback(result);
      });
    },
    delete: (table, condition, callback) => {
      let queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
        
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) throw err;  
        callback(result);
      });
    }
  };
  
  // Export the orm object for the model (burgers.js).
  module.exports = orm;
  