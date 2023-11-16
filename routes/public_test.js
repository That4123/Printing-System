const express = require('express');
const public_test_router = express.Router();
const public_test_controller = require('../controllers/public_test');
const path = require("path");

public_test_router.post("/loadCommentFrame", public_test_controller.loadCommentFrame);
public_test_router.post("/loadMemberConfig", public_test_controller.loadMemberConfig);

module.exports = public_test_router;