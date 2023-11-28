const printRequest = require('../model/DAO/printRequest_DAO')
module.exports = {
    getPrintRequestList: function (req, res) {
        printRequest.getAllPrintRequest((err, printRequests) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error')
            }
            else {
                res.json(printRequests);
            }
        })
    }
}