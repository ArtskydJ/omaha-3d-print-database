//write a javascript module to write to sql database

var mysql = require('mysql')
var mock = require("./mock.js")

var insert = function insert(conn, hash, obj, cb) { //adds a row by running and "insert" query)
	conn.query("INSERT INTO stl_properties (hash, volume, parts, minX, maxX, minY, maxY, minZ, maxZ) " +
		"VALUES (?, '?', '?', '?', '?', '?', '?', '?', '?')", [hash, obj.volume,
		obj.parts, obj.x.min, obj.x.max, obj.y.min, obj.y.max, obj.z.min, obj.z.max], cb)
}

var get = function get(conn, hash, cb) { //get a row (hash, cb) (SELECT)
	conn.query("SELECT * FROM stl_properties WHERE hash = ?", [hash], cb)
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
