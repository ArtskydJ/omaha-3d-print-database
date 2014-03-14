var test = require('tap').test
var Index = require("../index.js")
var mysql = require("mysql")
var mysqlPassword = require("../../#sensitive-info/mysql-pw")
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : mysqlPassword,
	database : "omaha3dprint"
})
var safeErrMessage = require("../../safe-error-message/index.js")
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


test("insert descriptive description here!", function(t) {
	t.plan(11)
	
	t.equal(typeof index.insert, "function", "Has a function called 'insert'")
	t.equal(typeof index.get, "function", "Has a function called 'get'")
	
	connection.connect(function (err) {
		t.notOk(err, "connection error" + safeErrMessage(err))
		index.remove(fakeHash, function(err) {
			t.notOk(err, "'remove' error" + safeErrMessage(err))
			index.insert(fakeHash, insertObject, function(err) {
				t.notOk(err, "'insert' error" + safeErrMessage(err))
				index.get(fakeHash, function(err, data) {
					t.notOk(err, "'get' error" + safeErrMessage(err))
					t.ok(data, "data is truthy (not null)")
					t.equal(typeof data, "object", "returned data is an obj")
					t.equal(data.length, 1, "only returned one object")
					console.log("\n\n\n\n\n\nDATA:\n")
					console.dir(data[0])
					console.log("\n\n\n\n\n\n")
					expectedObject.id = data[0].id
					t.similar(data[0], expectedObject, "returned data is the expected data")
				})
				index.insert(fakeHash, insertObject, function(err) {
					t.ok(err, "does not allow same hash 2x") //if objs are truthy, then this is buggy
				})
			})
		})
	})
	
	setTimeout(function() {
		t.end()
	}, 5000)
})
