var loginRequest = require('request');
var name = "popenode";
var id = -1;
var returnObj;
var iNeedToFire = 5;
var fireCount = 0;
var rotating = false;

loginRequest('http://irc.rebelwrath.com:3000/login?name='+name,function(error,response,body){
	if(!error && response.statusCode == 200){
		var obj = JSON.parse(body);
		id = obj.id;
		moveNullFunction();
	}
});

function moveNullFunction(){

var moveNullRequest = require('request');

moveNullRequest('http://irc.rebelwrath.com:3000/moveTank?move=0',function(error,response,body){
	if(!error && response.statusCode == 200){
		var gameObj = JSON.parse(body);
		determineNextMove(gameObj);
	}
});
}
function nextMove(commandString){
	var nextRequest = require('request');
	nextRequest('http://irc.rebelwrath.com:3000/' + commandString,function(error,response,body){
	if(!error && response.statusCode == 200){
		var gameObj = JSON.parse(body);
		determineNextMove(gameObj);
	}
	});
}

function determineNextMove(gameObj){
	var commandString = "moveTank?move=0";
	var moveTank = "moveTank?move=";
	var rotateTank = "rotate?rot=";
	var fire = "fire";
	for(var i = 0;i<gameObj.players.length;i++){
		if(gameObj.players[i].id != id){
			if(fireCount >= iNeedToFire || rotating == true){
				if(gameObj.players[i].y > gameObj.players[id].y && gameObj.players[id].rot != 0){
					//if tank is above, then rotate up suckka
					commandString = rotateTank + 0;
				}
				else if(gameObj.players[i].y < gameObj.players[id].y && gameObj.players[id].rot != 3){
					commandString = rotateTank + 3;
				}
				else{
					commandString = fire;
					rotating = false;
					fireCount = 0;
				}
			
			//else if(gameObj.players[i].x < gameObj.players[id].x
				
			}
			console.log("is it making it to here");
			//obtain good horiz pos
			//look right
			if(gameObj.players[i].x > gameObj.players[id].x){
				if(gameObj.players[id].rot == 1){//move backwards
					commandString = moveTank + "-1";
					console.log("move here");
				}
				else if(gameObj.players[id].rot == 3){//move fowards
					commandString = moveTank + "1";
					console.log("move here");
				}
				else{
					commandString = rotateTank + "3";//otherwise orient to enemy tank
					console.log("move here");
				}
			}
			//look left
			else if(gameObj.players[i].x < gameObj.players[id].x){
				if(gameObj.players[id].rot == 3){//move backwards
					commandString = moveTank + "-1";
					console.log('move where');
				}
				else if(gameObj.players[id].rot == 1){//move fowards
					commandString = moveTank + "1";
					console.log('move where');
				}
				else{
					commandString = rotateTank + "1";//otherwise orient to enemy tank
					console.log('move where');
				}
			}
		}
	}
	fireCount++;
	console.log(commandString);
	nextMove(commandString);
}
