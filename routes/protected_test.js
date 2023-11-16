const express = require('express');
const protected_test_router = express.Router();
const protected_test_controller = require('../controllers/protected_test');
const path = require("path");

protected_test_router.post("/", protected_test_controller.load);
protected_test_router.post("/authorization", protected_test_controller.authorize);

module.exports = protected_test_router;

