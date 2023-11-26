var connect_DB = require('./connect_db');
const printer = require('../DTO/printer')
function getPrinterList(res) {
        let sql = "SELECT * FROM printer";
        connect_DB.query(sql, function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không có máy in" });
            }
            else {
                res.json(result);
            }
        })
}

function getPrinterDetail(id) {
        let sql = "SELECT * FROM printer WHERE printer_id = ?";
        connect_DB.query(sql, [id], function (err, result, field) {
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
    getPrinterList,
    getPrinterDetail}