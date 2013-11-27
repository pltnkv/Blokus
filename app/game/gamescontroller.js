/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 24.11.13
 * Time: 21:17
 * To change this template use File | Settings | File Templates.
 */

var log = require('logger')(module);


var gamesController = {
    createGame: function (filedType, isOnlineGame, callback) {
        var res, game, gameData = {
            fieldType: filedType,
            minutesPerSide: 15,
            onlineMode: isOnlineGame,
            players: [
                {name: "orange", score: 0},
                {name: "red", score: 0},
                {name: "red3", score: 10},
                {name: "red4", score: 0}
            ]
        };

        game = new mongoouse.GameModel(gameData);


        game.save(function (err) {
            if (err) {
                log.error(err);
                res = {error: true}
            } else {
                res = {gameId: game._id};
            }
            callback(res);
        });
    },

    joinToGame: function (gameId, callback) {

    },

    getGamesStat: function () {
        var games = [
            {title: "t1"},
            {title: "t2"}
        ];
        return games;
    }
};


module.exports.instance = gamesController;
