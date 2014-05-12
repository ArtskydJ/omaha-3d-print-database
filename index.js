var mock = require("./mock.js")

var insert = function insert(conn, hash, obj, cb) { //adds a row by running and "insert" query)
	console.log("inserting:", hash, obj)
	conn.query("INSERT INTO stl_properties (hash, volume, parts, minX, maxX, minY, maxY, minZ, maxZ) " +
		"VALUES (?, '?', '?', '?', '?', '?', '?', '?', '?')", [hash, obj.volume,
		obj.parts, obj.x.min, obj.x.max, obj.y.min, obj.y.max, obj.z.min, obj.z.max], cb)
}

var get = function get(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("SELECT * FROM stl_properties WHERE hash = ?", [hash], function(arr) {
		if (arr === null)
			arr = []
		setTimeout(function() {
			var result = {
				id:			arr[0], //hey not two '0's!!!
				hash:		arr[1],
				volume:		arr[2],
				parts:		arr[3],
				x: {min:	arr[4],
					max:	arr[5]},
				y: {min:	arr[6],
					max:	arr[7]},
				z: {min:	arr[8],
					max:	arr[9]}
			}
			//console.log(result)
			cb(false, result)
		}, 10)
	})
}

var remove = function remove(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("DELETE FROM stl_properties WHERE `hash` = ?;", [hash], cb)
}

module.exports = function(conn) {
	if (!conn) {
		return mock()
	} else {
		return {
			insert: insert.bind(null, conn),
			get:    get.bind(null, conn),
			remove: remove.bind(null, conn),
		}
	}
}
