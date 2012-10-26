var observer = require('./observer');
var startingPlaces = [{x:50,y:50,rot:0},{x:250,y:350,rot:2},{x:300,y:200,rot:3}];

module.exports = {
	playersNeeded : 3,
	startGame : function (){
		for(var i = 0;i<module.exports.playersNeeded;i++){
			observer.setXYofPlayer(i,startingPlaces[i].x,startingPlaces[i].y,startingPlaces[i].rot);

		}
		//observer.
		//observer.
		//release players on login
	}
	//do something with observer
	//observer.	
};