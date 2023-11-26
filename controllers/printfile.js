const path = require("path");
const printer = require('../model/DAO/printer_DAO');
const student = require('../model/DAO/student_DAO');
const PrintRequest = require('../model/DTO/print_request');
const authorization_model = require('../model/DAO/authorization');
module.exports = {
    getPrinterList: function (req, res) {
        printer.getPrinterList(res)
    },
    makePrintRequest:[authorization_model.loadCurMember, authorization_model.authorizeStudent, function (req, res) {
        if (!student.checkNoEmpty(req.body.completeState)||
            !student.checkValidNumberOfCopies(req.body.completeState)||
            !student.checkValidPagesToPrint(req.body.completeState)){
            res.status(400).json({ message: "Vui lòng bấm nút hoàn thành để cập nhật yêu cầu" });
        }
        student.makePrintRequest(req.body.completeState, res);
        res.status(200).json("success make request");
    }],
    makeUpdateRequest:[authorization_model.loadCurMember, authorization_model.authorizeStudent,function(req,res){
        if (!student.checkNoEmpty(req.body.sharedState)){
            res.status(400).json({ message: "Vui lòng không để trống trường nào!" });
        }
        if (!student.checkValidNumberOfCopies(req.body.sharedState)){
            res.status(400).json({message: "Số bản in phải là tự nhiên lớn hơn 0"});
        }
        if (!student.checkValidPagesToPrint(req.body.sharedState)){
            res.status(400).json({message: "nhập sai định dạng trang in"});
        }
        res.status(200).json({});
    }]
}
