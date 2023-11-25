const printerModel = require('../model/DAO/Printer_DAO');
const path = require("path");
const getPrinterList = (req, res) => {
  printerModel.getPrinters((err, printers) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(printers);
    }
  });
};


module.exports = { getPrinterList };