var module = {}
module.__exports = {}
module.export = function(name, obj) {
	if (module.__exports[name] != null) {
		throw "export already exists::"+name
	}
	module.__exports[name] = obj
}
module.require = function(name) {
	if (module.__exports[name] == null) {
		throw "require cannot find::"+name
	}
	return module.__exports[name]
}