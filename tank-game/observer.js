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
var numPlayers = 2;
var playerAddIndex = 0;

for (var i = 0;i < numPlayers;i ++){
	playersArray.push({name: "default", id: -1, x: 0, y: 0, rot : 0, alive: false, wait: false});
}

function getAliveCount(){
	var aliveCount = 0;
	for(var i = 0;i< playersArray.length;i++){
		if(playersArray[i].alive){
			aliveCount++;
		}
	}
	return aliveCount;
}

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
				//console.log("collision"); // add llinear collision
				bulletsArray.splice(ii,1);
				playersArray[i].alive = false;
				break;
			}
			if(bulletsArray[ii].x >= maxX || bulletsArray[ii].x <= 0 || bulletsArray[ii].y <= 0 || bulletsArray[ii].y >= maxY){
				console.log("bullet out of bounds");
				bulletsArray.splice(ii,1);
				ii--;
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
			playersArray[playerAddIndex].name = player;
			playersArray[playerAddIndex].id = playerAddIndex;
			playersArray[playerAddIndex].alive = true;
			playersArray[playerAddIndex].wait = false;
						playerAddIndex++;
		if(playersArray.length >= mainGame.playersNeeded){
			mainGame.startGame();
		}
		return playerAddIndex - 1;
	},
	
	getGameObj: function(){
		
		return {players: playersArray, bullets: bulletsArray};
	},
	addLoginCallback: function(result, _id){
		loginCallbackArray.push({res: result, id: _id});
		module.exports.setPlayerWait(_id,true);
		if(loginCallbackArray.length >= mainGame.playersNeeded){
			for(var i = 0;i < loginCallbackArray.length;i++){
				module.exports.setPlayerWait(i,false);
				loginCallbackArray[i].res.json(200, module.exports.getGameObj());
			}
			loginCallbackArray = [];
		}
	},
	addActionCallback: function(result,_id){
		actionCallbackArray.push({res:result,id:_id});
		if(actionCallbackArray.length >= getAliveCount()){
			moveBullets();
			for(var i = 0;i<actionCallbackArray.length;i++){
				module.exports.setPlayerWait(i,false);
				if(!playersArray[i].alive){
					actionCallbackArray[i].res.json(200, {message:"looser"});
				}
				else{

					if(getAliveCount() == 1){
						actionCallbackArray[i].res.json(200, {message:"winner"});
					}
					else{
							actionCallbackArray[i].res.json(200, module.exports.getGameObj());
					}
				}
			}
			actionCallbackArray = [];
		}
	},
	setPlayerWait: function(playId,waitBool){
		playersArray[playId].wait = waitBool;
	},
	getPlayerWait: function(playId){
		return playersArray[playId].wait;
	},
	getNextId: function(){
		return playerAddIndex;
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
	},
	setXYofPlayer: function(cid,cx,cy,rot){
		playersArray[cid].x = cx;
		playersArray[cid].y = cy;
		playersArray[cid].rot = rot;
	}
};
