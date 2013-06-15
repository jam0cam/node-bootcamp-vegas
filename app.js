var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,	socketio = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app),
	io = socketio.listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



var winners=new Array("0","0","0", "0", "0");

io.on('connection', function(socket) {
  var address = socket.handshake;
  io.sockets.emit('members', socket.handshake);

  //this is called when a answer is submitted in the format {number, response}
  socket.on('answer', function(data){
    var address = socket.handshake;

    if (data.number == '1' && winners[0] == '0'){      
      if (data.response == '2') {
        winners[0] = address;
        io.sockets.emit('winner', {number: data.number, winner: address, answer: '2'})  
      } 
    }

    if (data.number == '2' && winners[1] == '0'){      
      if (data.response == '17') {
        winners[1] = address;
        io.sockets.emit('winner', {number: data.number, winner: address, answer: '17'})  
      } 
    }


    if (data.number == '3' && winners[2] == '0'){      
      if (data.response == '64') {
        winners[2] = address;
        io.sockets.emit('winner', {number: data.number, winner: address, answer: '64'})  
      } 
    }


  });



});















