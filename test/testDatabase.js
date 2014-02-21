var test = require('tap').test
var index = require("../index.js")
var mysql = require("mysql")
var mysqlPassword = require("../../#sensitive-info/mysql-pw")
var connection = mysql.createConnection({
	user     : 'root',
	password : mysqlPassword
})

connection.connect()

test("insert descriptive description here!", function(t) {
	t.equal(typeof index.insert, "function", "Has a function called 'insert'")
	t.equal(typeof index.get, "function", "Has a function called 'get'")
	
	index.insert({
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
		inputFile: 'sphere.stl',
		processedByVersion: '0.97.3',
		volume: 10.889216,
		parts: 1,
		normalsFixed: 12
	})
	
	
	index.get(function(err, rows, fields) {
		if (err) throw err
		
		console.dir(rows)
		console.dir(fields)
	})
	
	
	t.end()
})