const express = require('express');
const choose_printer_router = express.Router();
const path = require("path");
const print_file_controller = require('../controllers/printfile');

choose_printer_router.get("/", print_file_controller.getPrinterList);
choose_printer_router.post("/makePrintRequest", print_file_controller.makePrintRequest);
choose_printer_router.post("/makeUpdateRequest", print_file_controller.makeUpdateRequest);

module.exports = choose_printer_router;