var connect_DB = require("./connect_db");
const getAllPrintRequest = (callback) => {
  const query = "SELECT request_id, request_status, user_name FROM print_request NATURAL JOIN user";
  connect_DB.query(query, (err, result) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getPrintRequestById = (request_id, callback) => {
  connect_DB.query("SELECT * FROM print_request NATURAL JOIN printer NATURAL JOIN user WHERE request_id = ?", [request_id], function (err, result) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const processPrintRequest = (request_id, type, callback) => {
  connect_DB.query("UPDATE print_request SET request_status = ? WHERE request_id = ?", [type, request_id], function (err, result) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  getAllPrintRequest,
  getPrintRequestById,
  processPrintRequest
};
