const path = require("path");
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    authorize: [authorization_model.loadCurMember, authorization_model.authorizeAdmin, function (req, res) {
        res.status(200).json({});
    }],
    load: [authorization_model.loadCurMember, authorization_model.authorizeAdmin, function (req, res) {
        res.json({ message: "Phản hồi từ server: Đăng nhập vào tài khoản quản trị thành công!" })
    }]
}