# IT Tickets Management Application 
Single page web application to perform CRUD operations.
## Steps to run
### Setup DynamoDB
Download DynamoDB and extract the contents in below path
```bash
cd ticket-management/dynamoDb
tar -xzvf <dynamodb.tar.gz>
```

Navigate to rest-api directory and perform install  
```bash
cd ticket-management/rest-api
npm install
```
Start DynamoDB and let it run in the terminal. Create Tickets table.
```bash

npm run-script db_start
npm run-script tbl_create
```
#### Optional steps
 To load (backedup) tickets from a file to DB, copy the tickets data to the file bkpTickets.json under ticket-management/initDbScripts/ and run a script as below,
```bash
npm run-script tbl_load_from_file
```
To delete the table,
```bash
npm run-script tbl_delete
```
### Setup server app
Navigate to rest-api directory and start the server app.

```bash
npm start
```

Server is started and it provides RESTful APIs, listening on the port 3000 as seen in below examples. 

###  Examples
```bash
#curl -X GET http://localhost:3000/tickets
[{"created_date":"12-3-2019","id":"ABC-123456","category":"General","creator_email":"emp1@zyllu.com","subject":"could not login to the system","status":"Open"},{"created_date":"20-3-2019","id":"DFG-123456","category":"Hardware","creator_email":"emp3@zyllu.com","subject":"system is getting hot","status":"Assigned"},{"created_date":"15-3-2019","id":"BCD-123456","category":"Software","creator_email":"emp2@zyllu.com","subject":"could not update anti-virus sw","status":"In Progress"}]
```

```bash
#curl -X GET http://localhost:3000/tickets/ABC-123456
{"id":"ABC-123456","created_date":"12-3-2019","category":"General","subject":"could not login to the system","creator_email":"emp1@zyllu.com","status":"Open"}
```

#### Contents of ticData.json
{
    "category" : "General",
    "subject" : "could not login to the system",
    "creator_email" : "emp4@zyllu.com"
}


```bash
#curl -d"@ticData.json" -H "Content-Type: application/json" -X POST http://localhost:3000/tickets
{"id":"DCZ-163342","category":"General","subject":"could not login to the system","creator_email":"emp4@zyllu.com","created_date":"19-3-2019","status":"Open"}
```

#### Contents of updateData.json
updateData.json contents:
{
    "category" : "General",
    "subject" : "login prompt says password incorrect",
    "creator_email" : "emp4@zyllu.com"
}

```bash
#curl -d"@updateData.json" -H "Content-Type: application/json" -X PUT http://localhost:3000/tickets/DCZ-163342
{"created_date":"19-3-2019","id":"DCZ-163342","category":"General","creator_email":"emp4@zyllu.com","subject":"login prompt says password incorrect","status":"Open"}
```

```bash
C:\Users\ramya>curl -X DELETE http://localhost:3000/tickets/DCZ-163342
{"created_date":"19-3-2019","id":"DCZ-163342","category":"General","creator_email":"emp4@zyllu.com","subject":"login prompt says password incorrect","status":"Open"}
```

## Setup AngularJS front-end App:
The application consumes the above REST ful APIs.

```bash
cd ticket-management/angular-httpclient-app
 ng serve --open
```

The app is listening on port 4200.

In Browser go to http://localhost:4200/.

### Screenshots

![ticketsList](https://user-images.githubusercontent.com/49765474/56458950-1b239000-635b-11e9-9352-35f9637cc88d.PNG)

![CreateTable](https://user-images.githubusercontent.com/49765474/56459195-101e2f00-635e-11e9-8835-bd489ce97354.PNG)

![updateTicket](https://user-images.githubusercontent.com/49765474/56458965-5c1ba480-635b-11e9-89b4-7c104215fcae.PNG)

















