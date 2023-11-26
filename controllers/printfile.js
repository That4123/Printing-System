const path = require("path");
const printer = require('../model/DAO/printer_DAO');
const student = require('../model/DAO/student_DAO');
const PrintRequest = require('../model/DTO/print_request')
const printingRestriction = require('../model/DAO/permitted_file_type_DAO')
module.exports = {
    getPrinterList: function (req, res) {
        printer.getPrinterList(res)
    },
    makePrintRequest: function (req, res) {
        student.makePrintRequest(req.body.completeState, res);
    },
    makeUpdateRequest:function(req,res){
        if (!student.checkNoEmpty(req.body.sharedState)){
            res.status(400).json({ message: "Vui lòng không để trống trường nào!" });
        }
        res.status(200).json({});
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
}
