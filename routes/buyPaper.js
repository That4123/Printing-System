const express = require('express');
const buyPage = require('../controllers/buyPaper');
const path = require("path");
const buyPaper_router = express.Router();


buyPaper_router.post('/load', buyPage.loadPaperNumber);
buyPaper_router.post('/log',buyPage.loadPurchaseLog);
module.exports =buyPaper_router;
