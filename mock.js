//Javascript module to write to a mock database

var database = {}

var insert = function insert(hash, obj, cb) {
	if (typeof database[hash] !== "object") {
		database[hash] = obj
		setTimeout(function() { cb(false) }, 100) //no error
	} else {
		setTimeout(function() { cb(new Error("Hash exists in database already")) }, 100) //error
	}
}

var get = function get(hash, cb) {
	if (typeof database[hash] !== "object")
		setTimeout(function() {
			cb(new Error("mock 'get' couldn't find data"), undefined)
		}, 100)
	else
		setTimeout(function() {
			cb(false, database[hash])
		}, 100)
}

var remove = function remove(hash, cb) {
	if (typeof database[hash] === "object") {
		delete database[hash]
	}
	setTimeout(function() {
		cb(typeof database[hash] === "object")
	}, 100)
}

module.exports = function() {
	return {
		insert: insert,
		get: get,
		remove: remove
	}
}
