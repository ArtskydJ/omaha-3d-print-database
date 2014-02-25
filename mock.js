
//write a javascript module to write to mock database

var database = {}

var insert = function insert(hash, obj, cb) {
	if (typeof database[hash] !== "object") {
		database[hash] = obj
		setTimeout(function() { cb(false) }, 500) //no err
	} else {
		setTimeout(function() { cb(true) }, 500) //err
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

module.exports = {
	insert: insert,
	get: get
}
