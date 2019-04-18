var express = require('express');
var router = express.Router();
var db = require('../ticketsDb.js');
var util = require('../util.js');

router.get('/', function(req, res) {
    db.getAllTickets(res);
});

router.get('/:id', function (req, res) {
    console.debug("get request: ", req.body);
    var ticketId = req.url.slice(1);
    if (!(util. isTicketIdValid(ticketId))) {
        console.error("Input ticket Id is Invalid: ", ticketId );
        res.sendStatus(400);
        return;
    }
    db.getTicketById(ticketId, res);
});
  
router.post('/', function (req, res) {
    console.debug("post request: ", req.body);
    if (!(util. isCategoryValid(req.body.category))) {
        console.error("Input Category is Invalid: ", req.body.category);
        res.sendStatus(400);
        return;
    }
    var ticket = util.createNewTicketObject(req.body.category, req.body.subject,
                 req.body.creator_email);
    db.addTicket(ticket, res);
});

router.put('/:id', function (req, res) {
    console.debug("put request: ", req.body);
    var ticketId = req.url.slice(1);
    if (!(util. isTicketIdValid(ticketId))) {
        console.error("Input ticket Id is Invalid: ", ticketId);
        res.sendStatus(400);
        return;
    }
    if (!(util. isCategoryValid(req.body.category))) {
        console.error("Input Category is Invalid:", req.body.category);
        res.sendStatus(400);
        return;
    }
    db.updateTicket(ticketId, req.body, res);
});

router.delete('/:id', function (req, res) {
    console.debug("delete request: ", req.body);
    var ticketId = req.url.slice(1);
    if (!(util. isTicketIdValid(ticketId))) {
        console.error("Input ticket Id is Invalid");
        res.sendStatus(400);
        return;
    }
    console.log("inside delete", ticketId);
    db.deleteTicket(ticketId, res);
});

module.exports = router;
