omaha-3d-print-database
=======================
Node JS and [node-mysql](https://github.com/felixge/node-mysql "node-mysql") program for a server to get a javascript object and save its info to the database.

This program is specifically for the objects that [admesh-parser](https://github.com/coding-in-the-wild/admesh-parser "admesh-parser") outputs.

##Install (mock and actual)

	npm install omaha-3d-print-database
	
##Require (mock and actual)

	var Database = require('omaha-3d-print-database')

##Create mock database object
	
	var database = new Database()
	
##Create actual database object (with mySQL)

	var mysql = require('mysql')
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'YOUR_PASSWORD_HERE',
		database : "omaha3dprint"
	})
	var database = new Database(connection)

##Use the database

	
