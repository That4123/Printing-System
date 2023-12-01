var connect_DB = require('./connect_db');
function calculatePrintCount(input) {
    const ranges = input.split(',');
    let totalCount = 0;
    ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);
        const rangeCount = end ? end - start + 1 : 1;
        totalCount += rangeCount;
    });
    return totalCount;
}
function checkValidNumberToPrint(req,callback){
    let sql = "SELECT `page_num_left` FROM `student` WHERE `student_id`=?";
    connect_DB.query(sql, [
        req.cur_member.user_id, 
    ], function (err, result, field) {
        if (err) {
            console.log(err);
            callback({code:500, message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" },null);
            return;
        }
        else {
            const num_of_page_to_print=calculatePrintCount(req.body.completeState.pages_to_print)*req.body.completeState.number_of_copies;
            const pageLeft=result[0].page_num_left-num_of_page_to_print;
            if(pageLeft<0){
                callback({code:500,message:"Số giấy trong tài khoản không đủ"},null);
                return;
            }
            else{
                callback(null,num_of_page_to_print);
            }
        }
    })
}
function makeChangePageLeft(student_id,amount,callback){
    let sql = "UPDATE `student` SET `page_num_left` = `page_num_left`-? WHERE `student_id` = ?";
    connect_DB.query(sql, [
        amount,
        student_id,
    ], function (err, result, field) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        else {
            callback(null);
            return;
        }
    })
}

function makePrintRequest(req, res) {
    console.log('/////////makeprintrequest////////');
    makeRequest(req.body.completeState,res,function(print_request_id){
        let sql = "INSERT INTO printing_log (student_id, printer_id, print_request_id, num_of_page_to_print, printing_status) VALUES (?, ?, ?, ?, ?)";
        connect_DB.query(sql, [
            req.cur_member.user_id, 
            req.body.completeState.printer_id, 
            print_request_id, 
            req.body.completeState.num_of_page_to_print, 
            "Pending"
        ], function (err, result, field) {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                makeChangePageLeft(req.cur_member.user_id,req.body.completeState.num_of_page_to_print,function(err){
                    if(err){
                        callback(err,null);
                    }
                    else{
                        res.status(200).json({message:"success make print request"});
                    }
                });
                
            }
        })
    })
    
        
}
function makeRequest(req,res,next) {
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
            console.log(err);
            res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
        }
        else {
            next(result.insertId);
        }
    })
}
async function getPrintReqStatusList(student_id,res){
    getPrintReqStatusListId(student_id,function(err,listId){
        if (err){
            res({ code: err.code || 500, message: err.message || "Có lỗi đã xảy ra khi truy vấn dữ liệu. Vui lòng thử lại sau" }, null);
            return;
        }
        connect_DB.query("SELECT * FROM `printing_log` WHERE print_request_id IN (?)",[listId],function (err, allRowsResult) {
            if (err) {
                res({ code: err.code || 500, message: err.message || "Có lỗi đã xảy ra khi truy vấn dữ liệu. Vui lòng thử lại sau" }, null);
                return;
            } else if (allRowsResult.length === 0) {
                res({ code: 400, message: "Bạn không có yêu cầu in nào" }, null);
                return;
            } else {
                res(null, allRowsResult);
            }
        });
    });
}
async function getPrintReqStatusListId(student_id,callback){
    let sql = "SELECT `print_request_id` FROM `printing_log` WHERE student_id=?";
    connect_DB.query(sql, [
        student_id
    ],function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            callback({ code: 400, message: "Bạn không có yêu cầu in nào" }, null);
        }
        else {
            const listId = result.map(row => row.print_request_id);
            callback(null,listId);
        }
    });
}
function getConfigDetail(print_request_id,callback){
    let sql = "SELECT * FROM `print_request` WHERE request_id=?";
    connect_DB.query(sql, [
        print_request_id    
    ],function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            callback({ code: 400, message: "Bạn không có" }, null);
        }
        else {
            callback(null,result);
        }
    });
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
function getPaperNumber(student_id,callback) {
    let sql = "SELECT `page_num_left` FROM `student` WHERE student_id=?";
    connect_DB.query(sql, [
        student_id   
    ],function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            callback(null,result);
        }
    });
}
function loadPurchaseLog(student_id,callback) {
    let sql = "SELECT * FROM `paper_purchase_log` WHERE student_id=?";
    connect_DB.query(sql, [
        student_id   
    ],function (err, result) {
        if (err) {
            callback({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            callback(null,result);
        }
    });
}
module.exports = {
    makePrintRequest,
    checkNoEmpty,
    checkValidNumberOfCopies,
    checkValidPagesToPrint,
    getPrintReqStatusList,
    getConfigDetail,
getPaperNumber,
checkValidNumberToPrint,
    loadPurchaseLog}