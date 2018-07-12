// filesystem module to read/write files on the disk
const fs = require('fs');

// mysql module that lets node interact with mysql databases
const mysql = require('mysql');

// Define database objects with login information for different databases
const db4free = {
  host: '85.10.205.173',
  user: 'academy_db_user',
  password: 'academy18',
  database: 'academy_db',
};

const localhost = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_db',
};

// Assign the log file path to a variable
const logFile = './log.txt';

// Select the database to use
const db = localhost;

// Pass the selected object to the mysql driver
const connection = mysql.createConnection(db);

// "process.argv[2]" is the first argument you pass to the node app when running it from the terminal. i.e. "node sql-query <ARGUMENT>"
const queryString = process.argv[2];

// Log the connection attempt to a log file
fs.appendFileSync(logFile, `\n${new Date().toGMTString()}\nConnecting to ${db.host} as ${db.user}\nQuery sent: "${queryString}"\n`);

// Open a connection to the selected database
connection.connect();

// Send the queryString (which is <ARGUMENT> from when you ran the app in the terminal with "node sql-query <ARGUMENT>")
connection.query(queryString, (error, results, fields) => {
  if (error) {
    console.log(error);
    fs.appendFileSync(logFile, `Query failed: ${error}\n`);
  } else {
    fs.appendFileSync(logFile, 'Query successful. Showing results:\n\n-- Start of results --\n\n');
    results.map((resultArrayElement) => {
      console.log(resultArrayElement);
      fs.appendFileSync(logFile, `${JSON.stringify(resultArrayElement)}\n`);
    })
    fs.appendFileSync(logFile, `\n-- End of results --\n`);
  }
});

