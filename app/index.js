/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.08.13
 * Time: 21:25
 * To change this template use File | Settings | File Templates.
 */


var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server)
    , log = require('logger')(module)
    , swig = require('swig')
    , config = require('../config.json')
    , routes = require('./routes.js')
	, mongoose = require('./mongoose.js');


// assign the swig engine to .html files
app.engine('html', swig.renderFile);


app.set('debug', config.debug);
app.set('view engine', 'html');
app.set('views', __dirname + '/../client/views');
app.set('view cache', false);

app.use(express.static(__dirname + '/../client/public'));
app.use(express.bodyParser());

log.info('debug = '  +app.get('debug'));


routes.init(app);


io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

log.info("config: " + config.host, config.port);
server.listen(config.port, config.host);
log.info("Server started");