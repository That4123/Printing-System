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
    };
    let sql = "INSERT INTO printer (brand, model, description, campusName, roomNumber, buildingName, printer_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connect_DB.query(sql, [
        printer.brand,
        printer.model,
        printer.description,
        printer.campusName,
        printer.roomNumber,
        printer.buildingName,
        "Active"
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
            connect_DB.query("UPDATE printer SET printer_status = ? WHERE printer_id = ?", ["Active", printer_id], function (err, result) {
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
            connect_DB.query("UPDATE printer SET printer_status = ? WHERE printer_id = ?", ["Disable", printer_id], function (err, result) {
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

module.exports = {
    addNewPrinter,
    editPrinter,
    enablePrinter,
    disablePrinter,
    removePrinter
}