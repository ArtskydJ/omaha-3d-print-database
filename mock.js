//Javascript module to write to a mock database

var database = {}

var insert = function insert(hash, obj, cb) {
	if (typeof database[hash] !== "object") {
		database[hash] = {
			id:		Math.random(),
			hash:	hash,
			volume:	obj.volume,
			parts:	obj.parts,
			x.min:	obj.x.min,
			x.max:	obj.x.max,
			y.min:	obj.y.min,
			y.max:	obj.y.max,
			z.min:	obj.z.min,
			z.max:	obj.z.max
		}
		setTimeout(function() { cb(false) }, 10) //no error
	} else {
		setTimeout(function() {
			var err = new Error("Hash exists in database already")
			err.errno = 1062 //this is the same errno that mysql throws for this
			cb()
		}, 10) //error
	}
}

var get = function get(hash, cb) {
	if (typeof database[hash] !== "object")
		setTimeout(function() {
			cb(new Error("mock 'get' couldn't find data"), undefined)
		}, 10)
	else
		setTimeout(function() {
			cb(false, database[hash])
		}, 10)
}

var remove = function remove(hash, cb) {
	var err = false
	if (typeof database[hash] === "object") {
		delete database[hash]
	} else {
		err = new Error("couldn't find "+hash+" in database")
	}
	setTimeout(function() {
		cb(err)
	}, 10)
}

module.exports = function() {
	return {
		insert: insert,
		get: get,
		remove: remove
	}
}
