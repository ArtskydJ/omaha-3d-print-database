var useMock = false
/**
To pass tests: (if useMock is false)
	Open SQLyog with settings:
		localhost
		root
		[password]
	Open create.sql
	Ctrl+F9 will run the file
	Open cmd to omaha-3d-print-database
	Run npm test
*/
var test = require('tap').test
var Database = require('omaha-3d-print-database')
var mysql = require('mysql')
var util = require('util')
var _ = require('underscore')
var mysqlPassword = require("../../#sensitive-info/mysql-pw")
var safeErrMessage = require('safe-err-msg')

var connection
if (!useMock) {
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : mysqlPassword,
		database : "omaha3dprint"
	})
}

var database = new Database(connection)

if (useMock) {
	connection = {
		connect: function(cb) { cb() },
		end: function() {}
	}
}

var fakeHash = "ba4301c9e5aa93d96bdb5c87d9cf089d"

var insertObject = { //mysql stores only 4 numerals after the '.'
	volume: 10.8892,
	parts: 1,
	x: { min: -1.3345, max: 1.3709 },
	y: { min: -1.3779, max: 1.3772 },
	z: { min: -1.3732, max: 1.2428 }
}

test("test the actual database!", function(t) {
	t.plan(10)
	
	t.equal(typeof database.insert, "function", "Has a function called 'insert'")
	t.equal(typeof database.get, "function", "Has a function called 'get'")
	
	connection.connect(function (err) {
		t.notOk(err, "connection error " + safeErrMessage(err))
		//database.remove(fakeHash, function(err) {					//mock did not have this
		//	t.notOk(err, "'remove' error " + safeErrMessage(err))
			database.insert(fakeHash, insertObject, function(err) {
				t.notOk(err, "'insert' error " + safeErrMessage(err))
				database.get(fakeHash, function(err, data) {
					t.notOk(err, "'get' error " + safeErrMessage(err))
					t.ok(data, "data is truthy (not null)")
					t.equal(typeof data, "object", "returned data is an obj")
					
					insertObject.id = data.id
					insertObject.hash = fakeHash
					t.ok(_.isEqual(data, insertObject), "returned data is the expected data")
					
					database.insert(fakeHash, insertObject, function(err) {
						t.ok(err, "throws error for duplicate hash")
						t.equal(err.errno, 1062, "correct error is thrown for duplicate hash")
						connection.end()
						t.end()
					})
				})
			})
		//})
	})
})

/* MOCK DB PREVIOUS TESTS!!!
	database.insert(fakeHash, insertObject, function(err) {
		t.notOk(err, "'insert' error" + safeErrMessage(err))
		database.get(fakeHash, function(err, data) {
			t.notOk(err, "'get' error" + safeErrMessage(err))
			t.equal(typeof data, "object", "returned data is an obj")
			t.equal(data, insertObject, "returned data is the expected data")
			
			database.insert(fakeHash, insertObject, function(err) {
				t.ok(err, "does not allow same hash 2x")
				t.end()
			})
		})
	})
*/


