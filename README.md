# mysql-query-node
A node.js application that can query mysql databases and log the results.

Instructions:

1. Run "git clone https://github.com/javascriptst18/mysql-query-node.git" in the terminal where you want to install the app

2. Run "npm install" to install dependencies

3. Open the "config.json" file and set your database options (host, username, password, default database to use)

4. Run "node sql-query" in the terminal to run a query. The query string will be read from either the terminal ("node sql-query <STRING>") or if no string is passed it will be read from the "query.sql" file, where you can write multi-line queries.

5. See the results or error message in the log.txt file and the terminal
