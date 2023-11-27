var connect_DB = require('./connect_db');
function checkFileType(req, res) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT file_type FROM permitted_file_type";
        connect_DB.query(sql, function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                reject(err);
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].file_type === req) {
                        resolve(true);
                        return;
                    }
                }
                resolve(false);
            }
        });
    });
}
function checkFileSize(req) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT max_file_size FROM permitted_file_type WHERE file_type = ?";
        connect_DB.query(sql, [req.file_type], function (err, result, field) {
            if (err) {
                reject(err);
            } else {
                console.log(req.file_size);
                console.log(result[0].max_file_size);
                if (req.file_size <= result[0].max_file_size * 1048576) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}
function getPermittedFileType(res) {
    let sql = "SELECT file_type FROM permitted_file_type";
    connect_DB.query(sql, function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không có file đươc phép in" });
            }
            else {
                
                list = []
                for (let i = 0; i < result.length; i++){
                    list.push(result[i].file_type)
                }
                res.json({list: list})
                
            }
        })
}
const getPermittedFileTypes = (callback) => {
    const query = "SELECT * FROM permitted_file_type";
    connect_DB.query(query, (err, result) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
module.exports = {
    checkFileSize,
    checkFileType,
    getPermittedFileType,
    getPermittedFileTypes
}
