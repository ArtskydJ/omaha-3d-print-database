var mock = require("./mock.js")

var insert = function insert(conn, hash, obj, cb) { //adds a row by running and "insert" query)
	//console.log("inserting:", hash, obj)
	conn.query("INSERT INTO stl_properties (hash, volume, parts, minX, maxX, minY, maxY, minZ, maxZ) " +
		"VALUES (?, '?', '?', '?', '?', '?', '?', '?', '?')", [hash, obj.volume,
		obj.parts, obj.x.min, obj.x.max, obj.y.min, obj.y.max, obj.z.min, obj.z.max], cb)
}

var get = function get(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("SELECT * FROM stl_properties WHERE hash = ?;", [hash], function(err, arr) {
		//console.log("arr", arr[0])
		/*if (arr === null) {
			arr = []
			err = new Error("null returned from mySQL database")
		}*/
		result = arr[0]
		result.x = {min: result.minX, max: result.maxX}
		result.y = {min: result.minY, max: result.maxY}
		result.z = {min: result.minZ, max: result.maxZ}
		delete result.minX
		delete result.maxX
		delete result.minY
		delete result.maxY
		delete result.minZ
		delete result.maxZ
		cb(err, result)
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
