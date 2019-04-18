var AWS = require("aws-sdk");
var fs = require("fs");
var creds = new AWS.Credentials('akid', 'secret', 'session');

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

const TABLENAME = "IT_TICKETS";
const KEYNAME = "id";

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function createTable() {
    var params = {
        TableName : TABLENAME,
        KeySchema : [       
            { AttributeName : KEYNAME, KeyType : "HASH"},  //Partition key
        ],
        AttributeDefinitions : [       
            { AttributeName : KEYNAME, AttributeType : "S" },
        ],
        ProvisionedThroughput : {       
            ReadCapacityUnits : 10, 
            WriteCapacityUnits : 10
        } 
    }; 
    
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));

        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}    

function deleteTable() {
    var params = {
        TableName : TABLENAME
    };
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

function loadTableFromFile(file) {
    var allTickets = JSON.parse(fs.readFileSync(file, 'utf8'));
    allTickets.forEach(function(ticket) {
        var params = {
            TableName : TABLENAME,
            Item : {
                "id" :  ticket.id,
                "category" : ticket.category,
                "subject" :  ticket.subject,
                "creator_email" : ticket.creator_email,
                "created_date" : ticket.created_date,
                "status" : ticket.status
            }
        
        };
        console.log(ticket.id, ticket.category, ticket.subject, 
                ticket.creator_email, ticket.created_date,
                ticket.status);
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add Employee", ticket.id, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", ticket.id);
            }
        });
    });
}

function init() {
    //deleteTable();
    createTable();
    //loadTableFromFile('./ticketsData.json');
    
}

function isResponseObjectDefined(res) {
    if (!(res)) {
        console.error("Response object is undefined");
        res.sendStatus(500);
        return false;
    }
    return true;
}

function getAllTickets(res) {
    if (!(isResponseObjectDefined(res))) {
        return;
    }
    var params = {
      TableName: TABLENAME,
      ProjectionExpression: "#id, #category, #subject, #creator_email, #created_date, #status",
      ExpressionAttributeNames: {
          "#id":  "id",
          "#category": "category",
          "#subject":  "subject",
          "#creator_email": "creator_email",
          "#created_date": "created_date",
          "#status" : "status"
      }
    };
    
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            res.sendStatus(500);
        } else {
            res.send(data.Items);
            // continue scanning if we have more tickets, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }   
    }
}

function getTicketById(ticketId, res) {
    if (!(isResponseObjectDefined(res))) {
        return;
    }
    var params = {
        TableName : TABLENAME,
        KeyConditionExpression : "#id = :id",
        ExpressionAttributeNames : {
            "#id" :  "id"
        },
        ExpressionAttributeValues : {
            ":id" : ticketId
        }
        
    };
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            if (err.code == "ConditionalCheckFailedException") {
                res.sendStatus(404);
            } else { 
                res.sendStatus(500);
            }
        } else {
            console.log("Query succeeded.");
            res.send(data.Items[0])
        }
    });
}

function addTicket(ticket, res) {
    if (!(isResponseObjectDefined(res))) {
        return;
    }
    var params = {
        TableName : TABLENAME,
        Item : {
                "id" : ticket.id,
                "category" : ticket.category,
                "subject" :  ticket.subject,
                "creator_email" : ticket.creator_email,
                "created_date" : ticket.created_date,
                "status" : ticket.status
        },
        ConditionExpression : "id <> :val",
        ExpressionAttributeValues : {
            ":val" : ticket.id
        }
        
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Ticket, Error JSON:", JSON.stringify(err, null, 2));
            res.sendStatus(500); //ConditionalCheckFailedException is also treated as internal error as duplicate ticket id should not be created. 
        } else {
            console.log("PutItem succeeded:",ticket.id);
            res.send(ticket);
        }
    });
}
function updateTicket(ticketId, givenTicket, res) {
    if (!(isResponseObjectDefined(res))) {
        return;
    }
    var params = {
        TableName : TABLENAME,
        Key:{
            "id" : ticketId
        },
        ConditionExpression: "id = :idVal",
        UpdateExpression: "set category = :cat, subject = :sub, creator_email = :email",
        ExpressionAttributeValues: {
            ":cat" : givenTicket.category,
            ":sub" : givenTicket.subject,
            ":email" : givenTicket.creator_email,
            ":idVal" : ticketId
        },
        ReturnValues: "ALL_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update ticket. Error JSON:", JSON.stringify(err, null, 2));
            if (err.code == "ConditionalCheckFailedException") {
                res.sendStatus(404);
            } else {
                res.sendStatus(500);
            }
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.send(data.Attributes);
        }
    }); 
}

function deleteTicket(ticketId, res) {
    if (!(isResponseObjectDefined(res))) {
        return;
    }
    var params = {
        TableName : TABLENAME,
        Key:{
            "id" : ticketId
        },
        ConditionExpression:"id = :val",
        ExpressionAttributeValues: {
            ":val" : ticketId
        },
        ReturnValues : "ALL_OLD"    
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            if (err.code == "ConditionalCheckFailedException") {
                res.sendStatus(404);
            } else { 
                res.sendStatus(500);
            }
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            res.send(data.Attributes);
        }
    });
}

module.exports = {
   //createTable,
   //deleteTable,
   //loadTableFromFile
   init,
   getAllTickets,
   getTicketById,
   addTicket,
   updateTicket,
   deleteTicket
}; 

