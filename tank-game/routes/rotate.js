var observer = require('../observer');
var mainGame = require('../mainGame');

exports.index = function(req, res){
	//needs to identify with session
	console.log("player " + req.session._id + " tank rotated");
	var rot = observer.getPlayers()[req.session._id].rot + 0;
	var x = observer.getPlayers()[req.session._id].x;
	var y = observer.getPlayers()[req.session._id].y;
	if(req.query.rot != null){
		rot = req.query.rot;
	}
	observer.setXYofPlayer(req.session._id,x,y,rot);
	observer.addActionCallback(res);
//	res.json(200, {thing:req.session._id});
}
