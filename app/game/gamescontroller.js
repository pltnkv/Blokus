/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 24.11.13
 * Time: 21:17
 * To change this template use File | Settings | File Templates.
 */

var log = require('logger')(module)
	, goModule = require('./gameobject.js');

var GameObject = goModule.GameObject;
var allGames = [];

var gamesController = {

	createGame: function (fieldType, isOnlineGame, callback) {
        var newGameObject = new GameObject();

		newGameObject.configure(fieldType, isOnlineGame, function (err) {
			var gameData;
			if (!err) {
				var playerHash = newGameObject.getFreePlayerHash();
				if (playerHash) {
					gameData = {
						gameId: newGameObject.objectId,
                        playerHash: playerHash
					};
				} else {
					err = "game have not free players";
				}
			}
			callback(err, gameData);
		});
		allGames.push(newGameObject);
	},

	joinToGame: function (gameId, callback) {
        var gameObject = this.getGameById(gameId);

		if (!gameObject) {
			callback('No game found');
		}
	},

    getGameById : function(gameId) {
        var i, gameObject, res;
        for (i = 0; i < allGames.length; i++) {
            gameObject = allGames[i];
            if (gameObject.getObjectId() == gameId) {
                res = gameObject;
                break;
            }
        }
        return res;
    },

	getGamesStat: function () {
		var games = [
			{title: "t1"},
			{title: "t2"}
		];
		return games;
	}
};


module.exports = gamesController;
