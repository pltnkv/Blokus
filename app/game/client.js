/**
 * Created by oleg on 27.11.13.
 */

var Class = require('../classy.js');

var clients = [];

var Client = Class.$extend({
	__init__ : function() {
		this.free = true;
		this.isCreator = false;
		this.hash = '' + Math.random();
        this.socket = undefined;
        clients.push(this);
	},

	linkSocket: function(socket) {
        this.socket = socket;
	}
});

Client.getClientByHash = function(hash) {
    var res;
    for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        if(client.hash = hash){
            res = client;
            break;
        }
    }
    return res;
}

module.exports.Client = Client;
