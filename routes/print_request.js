const express = require('express');
const choose_printer_router = express.Router();
const path = require("path");
const print_file_controller = require('../controllers/printfile');

choose_printer_router.get("/", print_file_controller.getPrinterList);
choose_printer_router.post("/", print_file_controller.makePrintRequest);
module.exports = choose_printer_router;