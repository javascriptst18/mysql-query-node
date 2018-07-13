// filesystem module to read/write files on the disk
const fs = require('fs');

// mysql module that lets node interact with mysql databases
const mysql = require('mysql');

// Assign path to the configurations file
const configFile = './config.json';

// Load the configurations
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

// Assign file paths
const queryStringFile = config.queryStringFile;
const logFile = config.logFile;

// Select the database to use
const db = config.database;

// Pass the selected object to the mysql driver
const connection = mysql.createConnection(db);

// Define a variable to store the query string
let queryString = '';

/** 
  *  "process.argv[2]" is the first argument you pass to 
  *   the node app when running it from the terminal. i.e.
  *  "node sql-query <ARGUMENT>"
  */

 if (process.argv[2]) { // If an argument is passed in via terminal, use that
  queryString = process.argv[2];
} else { // If no argument is passed in via terminal, get the query string from a file instead
  queryString = fs.readFileSync(queryStringFile,'utf8');
}

// Log the connection attempt to a log file
fs.appendFileSync(logFile, `\n${new Date().toGMTString()}\nConnecting to ${db.host} as ${db.user}. Query sent: \n\n"${queryString}"\n`);

// Open a connection to the selected database
connection.connect();

/**   Send the queryString, which either <ARGUMENT> from when you 
  *   ran the app in the terminal with "node sql-query <ARGUMENT>"
  *   or the string in query string file if there is no <ARGUMENT>
  *   passed via terminal.
  */
connection.query(queryString, (error, results, fields) => {
  if (error) { // If there's an error, log it
    console.log(error);
    fs.appendFileSync(logFile, `\nQuery failed: ${error}\n`);
  } else if (Array.isArray(results)) { // If not publish results
    fs.appendFileSync(logFile, '\nQuery successful. Showing results:\n\n-- Start of results --\n\n');
    results.map((resultArrayElement) => {
      console.log(resultArrayElement);
      fs.appendFileSync(logFile, `${JSON.stringify(resultArrayElement)}\n`);
    })
    fs.appendFileSync(logFile, `\n-- End of results --\n`);
  } else if (results.constructor.name == 'OkPacket') {
    fs.appendFileSync(logFile, '\nQuery successful. Recieved an OK packet from the database.\n\n');
  } else {
    fs.appendFileSync(logFile, '\nQuery successful. Result could not be parsed. See console for details.\n\n');
    console.log(results);
  }
  connection.end();
});

