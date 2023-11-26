var connect_DB = require('./connect_db');
function makePrintRequest(req, res) {
        let sql = "INSERT INTO print_request (file_name, file_path, chosen_printer, paper_size, pages_to_print, is_double_side, number_of_copies, print_type) VALUES (?,?, ?, ?, ?, ?, ?, ?)"
        connect_DB.query(sql, [
            req.file_name,
            req.file_path,
            req.printer_id,
            req.paper_size,
            req.pages_to_print,
            req.is_double_side,
            req.number_of_copies,
            req.print_type,
        ], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result);
            }
        })
}
function checkNoEmpty(obj) {
    for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
            return false;
        }
    }
    return true;
}
function checkValidNumberOfCopies(obj){
    if (/^\d+$/.test(obj.number_of_copies)) return true;
    return false;
}
function checkValidPagesToPrint(obj){
    if (/^(\d+(-\d+)?)(,\d+(-\d+)?)*$/.test(obj.pages_to_print)) return true;
    return false;
}
module.exports = {
    makePrintRequest,
    checkNoEmpty,
    checkValidNumberOfCopies,
    checkValidPagesToPrint}