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
                
                listPrinter = []
                for (let i = 0; i < result.length; i++){
                    const printer_ = new printer(result[i].printer_id, result[i].brand, result[i].model, result[i].description,
                        result[i].campusName, result[i].roomNumber, result[i].buildingName, result[i].printer_status)
                    listPrinter.append(printer_);
                    console.log(printer_)
                }
                res.json(listPrinter)
                
            
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