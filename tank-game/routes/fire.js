var observer = require('../observer');
var mainGame = require('../mainGame');

exports.index = function(req, res){
	//needs to identify with session
	observer.addBullet(req.session._id);
	observer.addActionCallback(res);
//	res.json(200, {thing:req.session._id});
}
