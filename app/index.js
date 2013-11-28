/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.08.13
 * Time: 21:25
 * To change this template use File | Settings | File Templates.
 */


var express = require('express')
    , Class = require('./classy.js')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server)
    , log = require('logger')(module)
    , swig = require('swig')
    , config = require('../config.json')
    , clientconnector = require('./game/clientconnector.js')
    , routes = require('./routes.js');

// assign the swig engine to .html files
app.engine('html', swig.renderFile);


app.set('debug', config.debug);
app.set('view engine', 'html');
app.set('views', __dirname + '/../client/views');
app.set('view cache', false);

app.use(express.static(__dirname + '/../client/public'));
app.use(express.bodyParser());


routes.init(app);

log.info('debug = ' + app.get('debug'));
log.info("config: " + config.host, config.port);
server.listen(config.port, config.host);
log.info("Server started");