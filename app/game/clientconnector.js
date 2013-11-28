/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 24.11.13
 * Time: 23:39
 * To change this template use File | Settings | File Templates.
 */
var log = require('logger')(module)
    , Class = require('../classy.js')
    , clientModule = require('./client.js');

var Client = clientModule.Client;


var clientConnector = {
    numClients: 0,

    init: function (app) {
        var that = this;
        var io = app.get('io');
        io.set('log level', 1);

        io.sockets.on('connection', function (socket) {
            that.numClients++;
            log.info('client connected' + that.numClients);
            // socket.emit('news', { hello: 'world' });

            socket.on('disconnect', function () {
                log.info('client disconnected');
                that.numClients--;
            });

            socket.on('init', function (data) {
                // data format: {playerHash:String}
                log.info("data = ", data);
                var client = Client.getClientByHash(data.playerHash);
                client.linkSocket(socket);
            });


            socket.on('message', function (message, callback) {
                // data format: {playerHash:String}
                log.info("message = ", message);
                callback('123');
            });

        });
    }
};


module.exports = clientConnector;