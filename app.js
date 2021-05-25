const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
	  host: "localhost",
      port: 3406,
      user: "root",
      password: "mypassword",
      database: "maxcoin",
});

app.get("/", (req, res) => {
	res.send("<h1>Home Page</h1>")
});



app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
var mysqlConfig = {
    host     : 'localhost',
    port     : '3000',
    user     : 'root',
    password : 'password',
    database : 'database'
}

// CONNECT TO USER DATABASE
var connection;
function connectToDB (){
    // Create connection to DB
    connection = mysql.createConnection(mysqlConfig);
    // Connect to db
    connection.connect((error)=>{
        if (error) {
            console.error(`Could not connect to DB`, error);
            setTimeout(connectToDB, 3000);
        }
    });
    console.log("Successfully connected to DB");
    // Deal with errors on connection
    connection.on('error', (error)=>{
        console.log("DB Err:", error);
        if(error.code === 'PROTOCOL_CONNECTION_LOST') {
            connectToDB();
        } else {
            console.log("Connection Error", error)
            throw error;
        }
    })
}
connectToDB();