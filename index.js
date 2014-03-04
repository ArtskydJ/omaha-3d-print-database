//write a javascript module to write to sql database

var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'example.org',
	user     : 'root',
	password : 'secret'
})
var nameOfTable = "admeshObjs"

var insert = function insert(hash, obj, cb) {
	//(adds a row by running and "insert" query)
	connection.query(
		"INSERT INTO " + nameOfTable + "\nVALUES (" + hash + obj.all.toString() + ");",
	cb)	
}

var get = function get(hash, cb) {
	//get function (hash, cb) (runs a select query)
	connection.query("SELECT * FROM "+nameOfTable, cb) //Fix this string to do the stuff we want.
}

module.exports = {
	insert: insert,
	get: get
}

