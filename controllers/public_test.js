const path = require("path");
const authorization_model = require('../model/DAO/authorization');

module.exports = {
    loadCommentFrame: [authorization_model.loadCurMember, authorization_model.authorizeStudent, function (req, res) {
        res.status(200).json({});
    }],
    loadMemberConfig: [authorization_model.loadCurMember, authorization_model.authorizeAdmin, function (req, res) {
        res.json({})
    }]
}