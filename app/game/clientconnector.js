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
        var io = app.get('io');
        io.set('log level', 1);

        io.sockets.on('connection', function (socket) {
            this.numClients++;
            log.info('client connected' + this.numClients);
            //socket.emit('news', { hello: 'world' });

            socket.on('disconnect', function () {
                log.info('client disconnected');
                this.numClients--;
            });

            socket.on('init', function (data) {
                // data format: {clientHash:String}
                Client.getClientByHash(data.clientHash);
                log.info(data);
            });



        });
    }
};


module.exports = clientConnector;