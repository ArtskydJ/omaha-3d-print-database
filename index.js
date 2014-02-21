var insert = function insert(hash, obj) {
	
}

var get = function get(connection, cb) {
	connection.query("SELECT ", cb) //Fix this string to do the stuff we want.
}

module.exports = {
	insert: insert,
	get: get
}