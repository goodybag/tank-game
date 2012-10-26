//?move -1,0,1
var observer = require('../observer');

var mainGame = require('../mainGame');

var tankSpeed = 5;

exports.index = function(req, res){
	//needs to identify with session
	console.log("player " + req.session._id + " tank moved");
	var rot = observer.getPlayers()[req.session._id].rot;
	var x = observer.getPlayers()[req.session._id].x;
	var y = observer.getPlayers()[req.session._id].y;
	var queSpeed = req.query.move * tankSpeed;
	if(req.query.move != null){
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
	
	observer.addActionCallback(res);
//	res.json(200, {thing:req.session._id});
}
