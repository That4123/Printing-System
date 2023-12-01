const studentModel = require('../model/DAO/student_DAO');
const authorization_model = require('../model/DAO/authorization');
const path = require("path");
const loadPaperNumber = [authorization_model.loadCurMember, authorization_model.authorizeStudent,(req, res) => {
studentModel.getPaperNumber(req.cur_member.user_id,function (err, result) {
  if (err) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.json(result);
  } 
});
}]
const loadPurchaseLog = [authorization_model.loadCurMember, authorization_model.authorizeStudent,(req, res) => {
  studentModel.loadPurchaseLog(req.cur_member.user_id,function (err, result) {
    if (err) {
      res.status(err.code).json({ message: err.message });
    } else {
      res.json(result);
    } 
  });
  }]
module.exports = {
    loadPaperNumber,
    loadPurchaseLog
}