var test = require('tap').test
var index = require("../mock.js")

var fakeHash = [
	"17404a596cbd0d1e6c7d23fcd845ab82",	//mock
	"11e0eed8d3696c0a632f822df385ab3c"	//database
]

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
	t.plan(3)
	
	t.equal(typeof index.insert, "function", "Has a function called 'insert'")
	t.equal(typeof index.get, "function", "Has a function called 'get'")
	
	index.insert(fakeHash[0], insertObject, function(err) {
		if (!err) {
			index.get(fakeHash[0], function(err, row) {
				if (err) {
					throw err
				} else {
					console.dir(row)
					t.ok(true, "placeholder for actual test")
				}
			})
		}
	})
	
	setTimeout(function() {
		t.end()
	}, 5000)
})