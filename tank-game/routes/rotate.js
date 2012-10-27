var observer = require('../observer');
var mainGame = require('../mainGame');

exports.index = function(req, res){
	//needs to identify with session
	if(!observer.getPlayers()[req.session._id].alive){
			res.json(200, {message: "you dead, why you still tryin?"});
	}
	if(observer.getPlayerWait(req.session._id)){
		res.json(200, {response:"wait yo' turn"});
	}
	else{
		req.session.wait = true;
			console.log("player " + req.session._id + " tank rotated");
			var rot = parseInt(observer.getPlayers()[req.session._id].rot);
			var x = observer.getPlayers()[req.session._id].x;
	var y = observer.getPlayers()[req.session._id].y;
	if(req.params.rot != null){
		rot = parseInt(req.params.rot);
	}
	observer.setXYofPlayer(req.session._id,x,y,rot);
	observer.addActionCallback(res);
	}
//	res.json(200, {thing:req.session._id});
}
