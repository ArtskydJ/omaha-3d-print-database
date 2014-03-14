//Javascript module to write to a mock database

var database = {}

var insert = function insert(hash, obj, cb) {
	if (typeof database[hash] !== "object") {
		database[hash] = obj
		setTimeout(function() { cb(false) }, 500) //no error
	} else {
		setTimeout(function() { cb(new Error("Hash exists in database already")) }, 500) //error
	}
}

var get = function get(hash, cb) {
	//get function (hash, cb) (runs a select query)
	//return (typeof database[hash] === "object") ? database[hash] : false
	setTimeout(function() { cb(
		(typeof database[hash] !== "object"),
		(typeof database[hash] !== "object") ? false : database[hash]
	) }, 500)
}

var remove = function remove(hash, cb) {
	if (typeof database[hash] === "object") {
		delete database[hash]
	}
	setTimeout(function() {
		cb(typeof database[hash] === "object")
	}, 500)
}

module.exports = function() {
	return {
		insert: insert,
		get: get
	}
}
