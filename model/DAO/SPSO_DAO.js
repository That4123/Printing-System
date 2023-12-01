var connect_DB = require('./connect_db');

function checkNoEmpty(obj) {
    if (obj == null || typeof obj !== 'object' || JSON.stringify(obj) === '{}') return false;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
                return false;
            }
        }
    }
    return true;
}


function addNewPrinter(printer, controller) {
    if (!checkNoEmpty(printer)) {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin máy in cần thêm!" }, null);
        return;
    };
    let sql = "INSERT INTO printer (brand, model, description, campusName, roomNumber, buildingName, printer_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connect_DB.query(sql, [
        printer.brand,
        printer.model,
        printer.description,
        printer.campusName,
        printer.roomNumber,
        printer.buildingName,
        printer.printer_status
    ], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            controller(null, result);
        }
    });
}

function editPrinter(printer, controller) {
    if (!checkNoEmpty(printer)) {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin cần cập nhật cho máy in!" }, null);
        return;
    };
    connect_DB.query("SELECT * FROM printer WHERE printer_id = ?", [printer.printer_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
        }
        else {
            let sql = "UPDATE printer SET brand = ?, model = ?, description = ?, campusName = ?, roomNumber = ?, buildingName = ? WHERE printer_id = ?";
            connect_DB.query(sql, [
                printer.brand,
                printer.model,
                printer.description,
                printer.campusName,
                printer.roomNumber,
                printer.buildingName,
                printer.printer_id
            ], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })

        }
    });
}

function enablePrinter(printer_id, controller) {
    if (printer_id == undefined || printer_id == null || printer_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id máy in cần kích hoạt!" }, null);
        return;
    }
    connect_DB.query("SELECT * FROM printer WHERE printer_id = ?", [printer_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
        }
        else if (result[0].printer_status == "Active") {
            controller({ code: 400, message: "Máy in đã ở trạng thái kích hoạt trước khi cập nhật!" }, null);
        }
        else {
            connect_DB.query("UPDATE printer SET printer_status = ? WHERE printer_id = ?", ["Đang hoạt động", printer_id], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    });
}

function disablePrinter(printer_id, controller) {
    if (printer_id == undefined || printer_id == null || printer_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id máy in cần vô hiệu hoá!" }, null);
        return;
    }
    connect_DB.query("SELECT * FROM printer WHERE printer_id = ?", [printer_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần kích hoạt không tồn tại!" }, null);
        }
        else if (result[0].printer_status == "Disable") {
            controller({ code: 400, message: "Máy in đã ở trạng thái vô hiệu hoá trước khi cập nhật!" }, null);
        }
        else {
            connect_DB.query("UPDATE printer SET printer_status = ? WHERE printer_id = ?", ["Không hoạt động", printer_id], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    });
}

function removePrinter(printer_id, controller) {
    if (printer_id == undefined || printer_id == null || printer_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id máy in cần xoá!" }, null);
        return;
    }
    connect_DB.query("SELECT * FROM printer WHERE printer_id = ?", [printer_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Máy in cần xoá không tồn tại!" }, null);
        }
        else {
            connect_DB.query("DELETE FROM printer WHERE printer_id = ?", [printer_id], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    });
}

function addNewPermittedFileType(permittedFileType, controller) {
    if (!checkNoEmpty(permittedFileType)) {
        controller({ code: 400, message: "Vui lòng nhập đủ thông tin loại file cần thêm!" }, null);
    };
    let sql = "INSERT INTO permitted_file_type (file_type, max_file_size) VALUES (?, ?)";
    connect_DB.query(sql, [
        permittedFileType.file_type,
        permittedFileType.max_file_size
    ], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else {
            controller(null, result);
        }
    });
}

function editPermittedFileType(permittedFileType, controller) {
    if (!checkNoEmpty(permittedFileType)) {
        controller({ code: 400, message: "Vui lòng nhập đầy đủ thông tin cần cập nhật cho loại file được phép in!" }, null);
    }
    else if (result.length == 0) {
        controller({ code: 400, message: "Loại file được phép in cần cập nhật không tồn tại!" }, null);
    }
    else {
        let sql = "UPDATE permitted_file_type SET file_type = ?, max_file_size = ? WHERE peritted_id = ?";
        connect_DB.query(sql, [
            permittedFileType.file_type,
            permittedFileType.max_file_size,
            permittedFileType.permitted_id
        ], function (err, result) {
            if (err) {
                controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
            }
            else {
                controller(null, result);
            }
        });
    }
}

function removePermittedFileType(permitted_id, controller) {
    if (permitted_id == undefined || permitted_id == null || permitted_id == "") {
        controller({ code: 400, message: "Vui lòng chọn id loại file được phép in cần xoá!" }, null);
    }
    connect_DB.query("SELECT * FROM permitted_file_type WHERE permitted_id = ?", [permitted_id], function (err, result) {
        if (err) {
            controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
        }
        else if (result.length == 0) {
            controller({ code: 400, message: "Loại file được phép in cần xoá không tồn tại!" }, null);
        }
        else {
            connect_DB.query("DELETE FROM permitted_file_type WHERE permitted_id = ?", [permitted_id], function (err, result) {
                if (err) {
                    controller({ code: 500, message: "Có lỗi đã xảy ra. Vui lòng thử lại sau" }, null);
                }
                else {
                    controller(null, result);
                }
            })
        }
    })
}

const getPrintingLog = (callback) => {
    connect_DB.query("SELECT * FROM printing_log JOIN user ON printing_log.student_id=user.user_id", function (err, result) {
        if (err) {
            console.log(err)
            callback(err, null)
        }
        else {
            callback(null, result)
        }
    })
}

module.exports = {
    addNewPrinter,
    editPrinter,
    enablePrinter,
    disablePrinter,
    removePrinter,
    addNewPermittedFileType,
    editPermittedFileType,
    removePermittedFileType,
    getPrintingLog
}
