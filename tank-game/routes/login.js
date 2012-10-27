var observer = require('../observer');

exports.index = function(req, res){
	console.log(req.params.name + " just joined the game.");
	var id = observer.getNextId();
	req.session._id = id;
	if(observer.getPlayerWait(id)){
		res.json(200, {response: "nopppe"});
	}
	else{
		var name = observer.addPlayer(req.params.name);
		observer.addLoginCallback(res,id);
	}
	//	observer.setPlayerWait(req.session._id,true);
}
