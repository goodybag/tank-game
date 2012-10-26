//var mainGame = require('./mainGame');

var mainGame;
var playersArray = [];
var bulletsArray = [];

var loginCallbackArray = [];
var actionCallbackArray = [];
var bulletSpeed = 20;
var maxX = 400;
var maxY = 400;
var tankSize = 30;
var bulletSize = 1;


function moveBullets() {
	for(var i = 0;i<bulletsArray.length;i++){
		var x = bulletsArray[i].x;
		var y = bulletsArray[i].y;
		var rot = bulletsArray[i].rot;
		switch(bulletsArray[i].rot){
			case 0:
				y -= bulletSpeed;
				break;
			case 1:
				x += bulletSpeed;
				break;
			case 2:
				y += bulletSpeed;
				break;
			case 3:
				x -= bulletSpeed;
				break;
		}
		bulletsArray[i].x = x;
		bulletsArray[i].y = y;
	}
	checkForCollisions();
}



function checkForCollisions(){
	for(var i = 0;i < playersArray.length;i++){
		for(var ii = 0;ii<bulletsArray.length;ii++){
			if(bulletsArray[ii].x >= playersArray[i].x - tankSize/2 && bulletsArray[ii].x <= playersArray[i].x + tankSize/2 && bulletsArray[ii].y > playersArray[i].y - tankSize/2 && bulletsArray[ii].y < playersArray[i].y + tankSize/2){
				console.log("collision"); // add llinear collision
				bulletsArray.splice(ii,1);
				playersArray[i].alive = false;
				break;
			}
		}
	}
}

module.exports = {
	init: function(game){
		mainGame = game;
	},
	getPlayers: function(){
		return playersArray;
	},
	addPlayer: function(player){
		playersArray.push({name: player, id: playersArray.length, x: 0, y: 0, rot : 0, alive: true});
		if(playersArray.length >= mainGame.playersNeeded){
			module.exports.initGame();
			mainGame.startGame();
		}
		return playersArray.length - 1;
	},
	getGameObj: function(){
		
		return {players: playersArray, bullets: bulletsArray};
	},
	initGame: function(){
		for(var i = 0;i < loginCallbackArray.length;i++){
			//loginCallbackArray[i].func(loginCallbackArray[i].id);
			loginCallbackArray[i].res.json(200, {id: loginCallbackArray[i].id});
		}
	},
	addLoginCallback: function(result, _id){
		loginCallbackArray.push({res: result, id: _id});
	},
	addActionCallback: function(result){
		actionCallbackArray.push({res:result});
		if(actionCallbackArray.length >= mainGame.playersNeeded){
			moveBullets();
			for(var i = 0;i<actionCallbackArray.length;i++){
				actionCallbackArray[i].res.json(200, module.exports.getGameObj());
			}
			actionCallbackArray = [];
		}
	},
	getNextId: function(){
		return playersArray.length;
	},
	addBullet: function(id){
		var bullet = {};
		bullet.x = playersArray[id].x;
		bullet.y = playersArray[id].y;
		bullet.rot = playersArray[id].rot;
		//do this to give it lead
		switch(bullet.rot){
			case 0:
				bullet.y -= bulletSpeed/2;
				break;
			case 1:
				bullet.x += bulletSpeed/2;
				break;
			case 2:
				bullet.y += bulletSpeed/2;
				break;
			case 3:
				bullet.x -= bulletSpeed/2;
				break;
		}
		bulletsArray.push(bullet);
		console.log("wut up");
	},
	setXYofPlayer: function(cid,cx,cy,rot){
		playersArray[cid].x = cx;
		playersArray[cid].y = cy;
		playersArray[cid].rot = rot;
	}
};
