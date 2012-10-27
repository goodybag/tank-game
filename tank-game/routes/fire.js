var observer = require('../observer');
var mainGame = require('../mainGame');

exports.index = function(req, res){
	if(!observer.getPlayers()[req.session._id].alive){
			res.json(200, {message: "you dead, why you still tryin?"});
	}
	if(observer.getPlayerWait(req.session._id)){
				res.json(200, {message: "you failed to wait"});
	}
	else{
		observer.setPlayerWait(req.session._id,true);
		observer.addBullet(req.session._id);
		observer.addActionCallback(res,req.session._id);
	}
}
