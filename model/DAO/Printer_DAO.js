var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const getPrinters = (callback) => {
    const query = 'SELECT * FROM printer';
    connect_DB.query(query, (err, result) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };
  
  module.exports = { getPrinters };

 