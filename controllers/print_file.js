const path = require("path");
const printer = require('../model/DAO/Printer_DAO');
const student = require('../model/DAO/Student_DAO');
const PrintRequest = require('../model/DTO/print_request')
const printingRestriction = require('../model/DAO/permitted_file_type_DAO')
const authorization_model = require('../model/DAO/authorization');
module.exports = {
    
    getPrinterListID: function (req, res){
        printer.getPrinterListID(res)
    },
    getPrintersDetail: function (req, res){
        printer.getPrintersDetail(req.body.printer_id, res);
    },
    getPrinterList: function (req, res){
        printerModel.getPrinters((err, printers) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json(printers);
          }
        });
      },
    handleUploadFile: async function(req, res){
        try {
            const isFileTypeAllowed = await printingRestriction.checkFileType(req.body.obj.file_type, res);
            
            if (!isFileTypeAllowed) {
                res.json({ message: 'Loại tệp tin không hợp lệ' });
            } else {
                    try {
                       
                        const isFileSizeAllowed = await printingRestriction.checkFileSize(req.body.obj, res);
                        if (!isFileSizeAllowed) {
                            res.json({ message: 'Kích thước tệp đạt quá giới hạn' });
                        } else {
                            res.json({ message: '' });
                        }
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Internal server error.' });
                    }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },
    getPermittedFileType: function (req, res) {
        printingRestriction.getPermittedFileType(res)
        
    },
    makePrintRequest:[authorization_model.loadCurMember, authorization_model.authorizeStudent, function (req, res) {
        if (!student.checkNoEmpty(req.body.completeState)||
            !student.checkValidNumberOfCopies(req.body.completeState)||
            !student.checkValidPagesToPrint(req.body.completeState)){
            res.status(400).json({ message: "Vui lòng bấm nút hoàn thành để cập nhật yêu cầu" });
        }
        student.makePrintRequest(req,res)
            .then(() => {
                // res.status(200).json({message:"success make request"});
            })
            .catch((error) => {
                // res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }) 
        
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
