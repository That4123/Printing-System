var connect_DB = require('./connect_db');
function makePrintRequest(req, res) {
        console.log(req)
        let sql = "INSERT INTO print_request (file_name, file_path, chosen_printer, paper_size, pages_to_print, is_double_size, number_of_copies) VALUES (?, ?, ?, ?, ?, ?, ?)"
        connect_DB.query(sql, [
            req.file_name,
            req.file_path,
            req.printer_id,
            'A3',
            '1-10',
            0,
            34
            
        ], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result);
            }
        })
}
module.exports = {
    makePrintRequest}