var observer = require('../observer');

exports.index = function(req, res){
	var id = observer.getNextId();
	observer.addLoginCallback(res,id);
	var name = observer.addPlayer(req.query.name);
	req.session._id = id;
}
