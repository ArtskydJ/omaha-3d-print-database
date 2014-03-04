//write a javascript module to write to sql database

var mysql = require('mysql');
var tableName = "admeshtable"

var insert = function insert(conn, hash, obj, cb) { //adds a row by running and "insert" query)
	conn.query("INSERT INTO "+tableName+"\nVALUES ("+hash+","+obj.all.toString()+");", cb)	
}

var get = function get(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("SELECT * FROM "+tableName+"\nWHERE hash = '"+hash+"'", cb)
}

module.exports = {
	insert: insert,
	get: get
}