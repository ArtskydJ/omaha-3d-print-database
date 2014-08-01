var useMock = true
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
var mysqlPassword = require("../../#sensitive-info/mysql-pw")
var safeErrMsg = require('safe-err-msg')

var connection
var database
var testMessage
if (!useMock) {
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : mysqlPassword,
		database : "omaha3dprint"
	})
	testMessage = "test the actual database!"
	database = new Database(connection)
} else {
	connection = {
		connect: function(cb) { cb() },
		end: function() {}
	}
	testMessage = "test the mock database!"
	database = new Database() //There is not supposed to be a connection here
}

var fakeHash = "ba4301c9e5aa93d96bdb5c87d9cf089d"

var insertObject = { //mysql stores only 4 numerals after the '.'
	id: null,
	hash: fakeHash,
	volume: 10.8892,
	parts: 1,
	x: { min: -1.3345, max: 1.3709 },
	y: { min: -1.3779, max: 1.3772 },
	z: { min: -1.3732, max: 1.2428 }
}

test(testMessage, function(t) {
	t.plan(11)
	
	t.equal(typeof database.insert, "function", "Has a function called 'insert'")
	t.equal(typeof database.get, "function", "Has a function called 'get'")
	
	connection.connect(function (err) {
		t.notOk(err, "connection error " + safeErrMsg(err))
		database.remove(fakeHash, function(err) {					//mock no likey, actual likey
			t.notOk(err, "'remove' error " + safeErrMsg(err))
			database.insert(fakeHash, insertObject, function(err) {
				t.notOk(err, "'insert' error " + safeErrMsg(err))
				database.get(fakeHash, function(err, data) {
					t.notOk(err, "'get' error " + safeErrMsg(err))
					t.ok(data, "data is truthy (not null)")
					t.equal(typeof data, "object", "returned data is an obj")
					insertObject.id = data.id
					t.deepEqual(data, insertObject, "returned data is the expected data")
					database.insert(fakeHash, insertObject, function(err) {
						t.ok(err, "throws error for duplicate hash")
						t.equal(err.errno, 1062, "correct error is thrown for duplicate hash")
						connection.end()
						t.end()
					})
				})
			})
		})
	})
})
