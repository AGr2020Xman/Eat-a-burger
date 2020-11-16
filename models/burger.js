const orm = require('../config/orm');

const burger = {
  selectAll: (callback) => {
    orm.selectAll("burgers", (res) => {
      callback(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: (columns, values, callback) => {
    orm.insertOne("burgers", columns, values, (res) => {
      callback(res);
    });
  },
  updateOne: (objColvalues, condition, callback) => {
    orm.updateOne("burgers", objColVals, condition, (res) => {
      callback(res);
    });
  },
  delete: (condition, callback) => {
    orm.delete("burgers", condition, (res) => {
      callback(res);
    });
  }
};

// Export the database functions for the controller
module.exports = burger;