
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
	, observer = require('./observer')
	, mainGame = require('./mainGame') 
  , moveTank = require('./routes/moveTank')
  , rotate = require('./routes/rotate')
  , fire = require('./routes/fire')
  , login = require('./routes/login')
  , path = require('path');

var app = express();

observer.init(mainGame);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'fuckyou'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
	
});

app.get('/', routes.index);
app.get('/moveTank', moveTank.index);
app.get('/fire', fire.index);
app.get('/rotate', rotate.index);
app.get('/login', login.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//observer.blabla