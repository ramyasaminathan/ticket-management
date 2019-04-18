var TICKET_CATEGORY = {
    "GENERAL" : "General",
    "SOFTWARE" : "Software",
    "HARDWARE" : "Hardware"
}; 

var TICKET_STATUS = {
    "OPEN" : "Open",
    "ASSIGNED" : "Assigned",
    "IN_PROGRESS" : "In Progress",
    "COMPLETED" : "Completed",
    "ON_HOLD" : "On Hold",
    "CANCELLED": "Cancelled"
};

function isCategoryValid(category) {
    switch(category) {
        case TICKET_CATEGORY.GENERAL:
        case TICKET_CATEGORY.SOFTWARE:
        case TICKET_CATEGORY.HARDWARE:
            return true;
        default:
            return false;
    }
}

function isTicketIdValid(ticket) {
   var ticketPattern = new RegExp("^[A-Z]{3}-[0-9]{6}$");
   return ticketPattern.test(ticket);
}

function randIndex() {
    return Math.floor(Math.random()*26);
}
function generateId() {
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alphaId = alphabets[randIndex()] +alphabets[randIndex()] + alphabets[randIndex()];
    var date = new Date();
    return alphaId+"-"+date.getHours()+String(date.getMinutes()).padStart(2,"0")
           +String(date.getSeconds()).padStart(2,0);
}

function getDate() {
    var date = new Date();
    return ""+date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
}

function createNewTicketObject(category, subject, email) {
    var ticket = {
        "id" : generateId(),
        "category" : category,
        "subject" : subject,
        "creator_email" : email,
        "created_date" : getDate(),
        "status" : TICKET_STATUS.OPEN
    }
    return ticket;
}

module.exports = {
    TICKET_CATEGORY,
    TICKET_STATUS,
    createNewTicketObject,
    isTicketIdValid,
    isCategoryValid       
}
