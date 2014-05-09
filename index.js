var mock = require("./mock.js")

var insert = function insert(conn, hash, obj, cb) { //adds a row by running and "insert" query)
	conn.query("INSERT INTO stl_properties (hash, volume, parts, minX, maxX, minY, maxY, minZ, maxZ) " +
		"VALUES (?, '?', '?', '?', '?', '?', '?', '?', '?')", [hash, obj.volume,
		obj.parts, obj.x.min, obj.x.max, obj.y.min, obj.y.max, obj.z.min, obj.z.max], cb)
}

var get = function get(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("SELECT * FROM stl_properties WHERE hash = ?", [hash], function(arr){
		cb({
			//id:		arr[0], //hey not two '0's!!!
			hash:	arr[0],
			volume:	arr[1],
			parts:	arr[2],
			x.min:	arr[3],
			x.max:	arr[4],
			y.min:	arr[5],
			y.max:	arr[6],
			z.min:	arr[7],
			z.max:	arr[8]
		})
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
