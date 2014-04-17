/**
To pass tests:
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
var Index = require("../index.js")
var mysql = require('mysql')
var util = require('util')
var mysqlPassword = require("../../#sensitive-info/mysql-pw")
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : mysqlPassword,
	database : "omaha3dprint"
})
var safeErrMessage = require('safe-err-msg')
var index = new Index(connection)
var fakeHash = "ba4301c9e5aa93d96bdb5c87d9cf089d"

var insertObject = { //stores only 4 numerals after the '.'
	x: { min: -1.3345, max: 1.3709 },
	y: { min: -1.3779, max: 1.3772 },
	z: { min: -1.3732, max: 1.2428 },
	volume: 10.8892,
	parts: 1
}
var expectedObject = {
	id: 0, //this gets changed later
	hash: fakeHash,
	volume: insertObject.volume,
	parts: insertObject.parts,
	minX: insertObject.x.min, maxX: insertObject.x.max,
	minY: insertObject.y.min, maxY: insertObject.y.max,
	minZ: insertObject.z.min, maxZ: insertObject.z.max
}

var done=0
function end(conn, t) {
	done++
	if (done>=2) {
		conn.end()
		t.end()
	}
}

test("insert descriptive description here!", function(t) {
	t.plan(12)
	
	t.equal(typeof index.insert, "function", "Has a function called 'insert'")
	t.equal(typeof index.get, "function", "Has a function called 'get'")
	
	connection.connect(function (err) {
		t.notOk(err, "connection error " + safeErrMessage(err))
		index.remove(fakeHash, function(err) {
			t.notOk(err, "'remove' error " + safeErrMessage(err))
			index.insert(fakeHash, insertObject, function(err) {
				t.notOk(err, "'insert' error " + safeErrMessage(err))
				index.get(fakeHash, function(err, data) {
					t.notOk(err, "'get' error " + safeErrMessage(err))
					t.ok(data, "data is truthy (not null)")
					t.equal(typeof data, "object", "returned data is an obj")
					t.equal(data.length, 1, "only returned one object")
					expectedObject.id = data[0].id
					t.ok(util.inspect(data[0])===util.inspect(expectedObject),
						"returned data is the expected data")
					end(connection, t)
				})
				index.insert(fakeHash, insertObject, function(err) {
					t.ok(err, "throws error for duplicate hash")
					t.equal(err.errno, 1062, "correct error is thrown for duplicate hash")
					end(connection, t)
				})
			})
		})
	})
})
