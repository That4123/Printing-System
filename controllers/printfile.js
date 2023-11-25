const path = require("path");
const printer = require('../model/DAO/printer_DAO');
const student = require('../model/DAO/student_DAO');
const PrintRequest = require('../model/DTO/print_request')
module.exports = {
    getPrinterList: function (req, res) {
        printer.getPrinterList(res)
    },
    makePrintRequest: function (req, res) {
        /*let print_request = new PrintRequest(
            req.body.sharedState.file_name,
            req.body.sharedState.file_path,
            req.body.sharedState.printer_id,
            'A3',
            '1-10',
            true,
            34
        )*/
        student.makePrintRequest(req.body.completeState, res)
       
    }

}
