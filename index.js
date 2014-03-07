//write a javascript module to write to sql database

var mysql = require('mysql');

var insert = function insert(conn, hash, obj, cb) { //adds a row by running and "insert" query)
	conn.query("INSERT INTO admeshtable\nVALUES ("+hash+","+obj.all.toString()+");", cb)	
}

var all = function all(conn, cb) { //get all (hash, cb) (SELECT)
	console.log("index.all(" + conn + ", " + cb + ")")
	conn.query("SELECT * FROM admeshtable", cb)
}

var get = function get(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("SELECT * FROM admeshtable\nWHERE hash = '"+hash+"'", cb)
}

module.exports = {
	insert: insert,
	all: all,
	get: get
}