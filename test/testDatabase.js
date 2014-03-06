var test = require('tap').test
var index = require("../index.js")
var mysql = require("mysql")
var mysqlPassword = require("../../#sensitive-info/mysql-pw")
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : mysqlPassword,
//	database : "admeshtable"
//	database : "newdatabase20140219"
//	database : "newdatabase20140224"
	database : "newdatabase20140306"
})
var createSql = require("../create-3.js")

var fakeHash = "ba4301c9e5aa93d96bdb5c87d9cf089d"

var insertObject = {
	x: { min: -1.334557, max: 1.370952 },
	y: { min: -1.377953, max: 1.37723 },
	z: { min: -1.373225, max: 1.242838 },
	facets: {
		overall:       { before: 3656, after: 3656 },
		disconnected1: { before: 18,   after: 0 },
		disconnected2: { before: 3,    after: 0 },
		disconnected3: { before: 0,    after: 0 },
		disconnected:  { before: 21,   after: 0 },
		degenerate: 4,
		removed: 14,
		added: 3,
		reversed: 2
	},
	edges: { fixed: 24, backwards: 0 },
	volume: 10.889216,
	parts: 1,
	normalsFixed: 12,
	all: [
		-1.334557,	1.370952,	-1.377953,	1.37723,
		-1.373225,	1.242838,	3656,		3656,
		1,	18,	0,	2,	3,	0,	3,	0,	0,	21,	0,
		1,	10.889216,	4,	24,	14,	3,	2,	0,	12
	]
}


test("insert descriptive description here!", function(t) {
	t.plan(5)
	connection.connect()
	console.log("testing")
	
	t.equal(typeof index.insert, "function", "Has a function called 'insert'")
	t.equal(typeof index.get, "function", "Has a function called 'get'")
	
	console.log("createSql: "+createSql)
	
	connection.query(createSql, function(err) {
		console.log("create: "+err.message||"lolz")
		if (err) {
			console.log("oh noes!!! - 0")
			throw err
		} else {
			console.
			index.all(connection, function(err, data) {
				if (err) {
					throw err
				} else {
					console.log("data: " + data)
				}
			})
			index.insert(connection, fakeHash, insertObject, function(err) {
				console.log("insert")
				if (err) {
					console.log("oh noes!!! - 1")
					throw err
				} else {
					console.log("no err so far...")
					index.get(connection, fakeHash, function(err, data) {
						console.log("get")
						if (err) {
							throw err
						} else {
							t.equal(typeof data, "object", "returned data is an obj")
							t.equal(data, insertObject, "returned data is the expected data")
							
							index.insert(connection, fakeHash, insertObject, function(err) {
								t.ok(err, "does not allow same hash 2x")
							})
						}
					})
				}
			})
		}
	})
	console.log("testing 2")
	
	setTimeout(function() {
		t.end()
	}, 5000)
})
