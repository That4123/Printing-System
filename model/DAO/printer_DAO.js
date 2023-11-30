var connect_DB = require('./connect_db');
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

function getPrinterDetail(printer_id, controller) {
  connect_DB.query("SELECT * FROM printer WHERE printer_id = ?", [printer_id], function (err, result) {
    if (err) {
      controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
    }
    else if (result.length == 0) {
      controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
    }
    else {
      controller(null, result);
    }
  });
}
function getPrintersDetail(id, res) {
  let sql = "SELECT * FROM printer WHERE printer_id = ?";
  connect_DB.query(sql, [id], function (err, result, field) {
      if (err) {
          res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      }
      else if (result.length == 0) {
          res.status(400).json({ message: "Không có máy in" });
      }
      else {
          res.json(result[0])
          //console.log(result)
      }
  })
}
function getPrinterListID(res) {
  let sql = "SELECT printer_id FROM printer";
  connect_DB.query(sql, function (err, result, field) {
      if (err) {
          res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      }
      else if (result.length == 0) {
          res.status(400).json({ message: "Không có máy in" });
      }
      else {
          res.json(result)
      }
  })
}
module.exports = {
  getPrinters,
  getPrinterDetail,
  getPrinterListID,
  getPrintersDetail
};
