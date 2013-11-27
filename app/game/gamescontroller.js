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
					log.info(newGameObject.objectId);
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
		var i, gameObject;
		for (i = 0; i < allGames.length; i++) {
			gameObject = allGames[i];
			if (gameObject.getObjectId() == gameId) {
				//gameObject.
				break;
			}
		}

		if (i == allGames.length) {
			callback('No game found');
		}
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
