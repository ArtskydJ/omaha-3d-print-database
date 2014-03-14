var test = require('tap').test
var safeErrMessage = require("../../safe-error-message/index.js")
var Index = require("../mock.js")
var index = new Index()

var fakeHash = "ba4301c9e5aa93d96bdb5c87d9cf089d"	//mock database

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
	normalsFixed: 12
}

test("test the mock database!", function(t) {
	t.plan(6)
	
	t.equal(typeof index.insert, "function", "Has a function called 'insert'")
	t.equal(typeof index.get, "function", "Has a function called 'get'")
	
	index.insert(fakeHash, insertObject, function(err) {
		t.notOk(err, "'insert' error" + safeErrMessage(err))
		index.get(fakeHash, function(err, data) {
			t.notOk(err, "'get' error" + safeErrMessage(err))
			t.equal(typeof data, "object", "returned data is an obj")
			t.equal(data, insertObject, "returned data is the expected data")
			
			index.insert(fakeHash, insertObject, function(err) {
				t.ok(err, "does not allow same hash 2x")
			})
		})
	})
	
	setTimeout(function() {
		t.end()
	}, 5000)
})