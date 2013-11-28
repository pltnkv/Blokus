/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 24.11.13
 * Time: 22:21
 * To change this template use File | Settings | File Templates.
 */

var log = require('logger')(module)
    , Class = require('../classy.js')
    , mongoose = require('./mongoose.js')
    , clientModule = require('./client.js');


var GameObject = Class.$extend({
    __init__: function () {
        this.players = [];
        this.objectId = undefined;
    },

    configure: function (filedType, isOnlineGame, callback) {
        var that = this;
        var i, gameModel, gameData = {
            fieldType: filedType,
            minutesPerSide: 15,
            onlineMode: isOnlineGame,
            players: []
        };

        this.createPlayers(filedType);//temporary filedType == numPlayers

        for (i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            var playerData = {
                hash: player.hash,
                score: 0
            };
            gameData.players.push(playerData);
        }

        //save to BD
        gameModel = new mongoose.GameModel(gameData);
        gameModel.save(function (err) {
            if (err) {
                log.error(err);
            } else {
                that.objectId = '' + gameModel._id;
            }
            callback(err);
        });
    },

    getFreePlayerHash: function () {
        var freePlayerHash = undefined;
        for (var i = 0, l = this.players.length; i < l; i++) {
            var player = this.players[i];
            if (player.free) {
                player.free = false;
                freePlayerHash = player.hash;
                if (i == 0) {
                    player.isCreator = true;
                }
                break;
            }
        }
        return freePlayerHash;
    },

    createPlayers: function (num) {
        for (var i = 0; i < num; i++) {
            var player = new clientModule.Client();
            this.players.push(player);
        }
    },

    getObjectId: function () {
        return this.objectId;
    }

});


module.exports.GameObject = GameObject;