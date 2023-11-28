var connect_DB = require("./connect_db");
const getAllPrintRequest = (callback) => {
  const query = "SELECT * FROM print_request";
  connect_DB.query(query, (err, result) => {
    if (err) {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  });
};

module.exports = {
    getAllPrintRequest
}