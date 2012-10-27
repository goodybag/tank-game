//?move -1,0,1
var observer = require('../observer');
var mainGame = require('../mainGame');

var tankSpeed = 5;

exports.index = function(req, res){
	if(!observer.getPlayers()[req.session._id].alive){
			res.json(200, {message: "you dead, why you still tryin?"});
	}
	if(observer.getPlayerWait(req.session._id)){
				res.json(200, {message: "you failed to wait"});
	}
	else{
			console.log("player " + req.session._id + " tank moved");
		observer.setPlayerWait(req.session._id,true);
	var rot = observer.getPlayers()[req.session._id].rot + 0;
	var x = observer.getPlayers()[req.session._id].x;
	var y = observer.getPlayers()[req.session._id].y;
	var queSpeed = req.params.move * tankSpeed;
	if(req.params.move != null){
	switch(rot){
		case 0:
			y -= queSpeed;
			break;
		case 1:
			x += queSpeed;
			break;
		case 2:
			y += queSpeed;
			break;
		case 3:
			x-= queSpeed;
			break;
	}
	}
	observer.setXYofPlayer(req.session._id,x,y,rot);
	observer.addActionCallback(res,req.session._id);
	}
}
