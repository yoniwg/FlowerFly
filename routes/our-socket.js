const create = function(app) {

    const http = require('http').Server(app);
    const io = require('socket.io')(http);


    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', function(socket){
        console.log('a user connected');
    });




    return io;
};

module.exports = create;