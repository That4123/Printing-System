const express = require('express');
const print_file_router = express.Router();
const print_file_controller = require('../controllers/print_file');
const path = require("path");

print_file_router.post("/", print_file_controller.printFile);
module.exports = print_file_router;

