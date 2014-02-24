
//write a javascript module to write to sql database

var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'example.org',
	user     : 'root',
	password : 'secret'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
});

var insert = function insert(hash, obj) {
	//insert function (hash, obj, cb)
	//(adds a row by running and "insert" query)
	
}

var get = function get(connection, cb) {
	//get function (hash, cb) (runs a select query)
	connection.query("SELECT ", cb) //Fix this string to do the stuff we want.
}

module.exports = {
	insert: insert,
	get: get
}

