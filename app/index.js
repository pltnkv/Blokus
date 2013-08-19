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
    , swig = require('swig');


// assign the swig engine to .html files
app.engine('html', swig.renderFile);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/../client/views');

log.info("path = " + __dirname + '../client/views');

app.get('/', function (req, res) {
    log.info("asd 2 ");
    res.render('index2', {
        title: 'Consolidate.js'
    });
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.listen(8888);
