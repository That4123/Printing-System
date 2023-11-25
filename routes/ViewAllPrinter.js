// server/printerView.js
const express = require('express');
const ViewAllPrinter = require('../controllers/ViewAllPrinter');
const path = require("path");
const ViewAllPrinter_router = express.Router();

// Endpoint để lấy tất cả máy in
ViewAllPrinter_router.post('/', ViewAllPrinter.getPrinterList);

// Các endpoint khác liên quan đến hiển thị máy in

module.exports = ViewAllPrinter_router;
