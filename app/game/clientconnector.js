/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 24.11.13
 * Time: 23:39
 * To change this template use File | Settings | File Templates.
 */
var log = require('logger')(module)
    , Class = require('../classy.js')
    , io = require('socket.io');


io.set('log level', 1);
var numClients = 0;

io.sockets.on('connection', function (socket) {
    numClients++;
    log.info('client connected ' + numClients);
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        log.info(data);
    });
    socket.on('disconnect', function () {
        log.info('disconnected');
        numClients--;
    })
});