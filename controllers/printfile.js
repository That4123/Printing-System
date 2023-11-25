const path = require("path");
const printer = require('../model/DAO/printer_DAO');
const student = require('../model/DAO/student_DAO');
const PrintRequest = require('../model/DTO/print_request')
module.exports = {
    getPrinterList: function (req, res) {
        printer.getPrinterList(res)
    },
    makePrintRequest: function (req, res) {
        student.makePrintRequest(req.body.completeState, res)
    }

}
