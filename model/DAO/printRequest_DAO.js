var connect_DB = require("./connect_db");
const getAllPrintRequest = (callback) => {
  const query = "SELECT print_request_id, printing_status, user_name FROM printing_log INNER JOIN user ON printing_log.student_id=user.user_id";
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
  connect_DB.query("SELECT * FROM (printing_log NATURAL JOIN printer INNER JOIN user ON printing_log.student_id=user.user_id INNER JOIN print_request ON printing_log.print_request_id=print_request.request_id) WHERE print_request_id = ?", [request_id], function (err, result) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const processPrintRequest = (request_id, type, callback) => {
  connect_DB.query("UPDATE printing_log SET printing_status = ? WHERE print_request_id = ?", [type, request_id], function (err, result) {
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
