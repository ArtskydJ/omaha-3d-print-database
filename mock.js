
//write a javascript module to write to mock database

var database = {}

var insert = function insert(hash, obj, cb) {
	if (typeof database[hash] !== "object") {
		database[hash] = obj
		return true
	} else
		return false
	}
}

var get = function get(hash, cb) {
	//get function (hash, cb) (runs a select query)
	return (typeof database[hash] === "object") database[hash] : false
}

module.exports = {
	insert: insert,
	get: get
}
