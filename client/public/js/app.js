/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 07.11.13
 * Time: 8:04
 * To change this template use File | Settings | File Templates.
 */



var App = Class.$extend({

	run: function (params) {
		this.prepareGameField(params.gameType);
		this.preparePlayers(params);
		this.nextPlayer();
	},

	prepareGameField: function (gameType) {
		this.gameType = gameType;
		this.field = new GameField(gameType);
	},

	preparePlayers: function (params) {
		var i, plr;

		this.currentPlayer = -1;
		this.players = [];

		for (i = 0; i < params.players.length; i++) {
			plr = new Player(params.players[i].id, params.players[i].name);
			this.players.push(plr);
		}
	},

	nextPlayer: function () {
		if (this.currentPlayer == -1) {
			this.currentPlayer = 0;
		} else {
			var numPlayers = this.players.length;
			this.players[this.currentPlayer].hide();
			this.currentPlayer = this.currentPlayer + 1 == numPlayers ? 0 : this.currentPlayer + 1;
		}
		var plr = this.players[this.currentPlayer];
		plr.play();
		$('.player-name').text(plr.name + ' player turn');
	}

});


var ServerConnector = Class.$extend({
	__init__: function () {
		var paramsOffline;
		if (globalSettings.numPlayers == 4) {
			paramsOffline = {
				gameType: 1,//offline
				players: [
					{id: 0, name: 'Blue'},
					{id: 1, name: 'Yellow'},
					{id: 2, name: 'Red'},
					{id: 3, name: 'Green'}
				]
			};
		} else {
			paramsOffline = {
				gameType: 2,
				players: [
					{id: 0, name: 'Purple'},
					{id: 1, name: 'Orange'},
				]
			};
		}

		this.connected(paramsOffline);
	},

	connected: function (params) {
		app.run(params);
	}
});


var Player = Class.$extend({
	__init__: function (id, name) {
		this.id = id;
		this.name = name;
		this.isFirstStep = true;

		this.createShapes();
	},

	createShapes: function () {
		var shapeInfos = shapesStorage.cloneItems(this.id);

		this.shapes = [];
		this.colorClass = 'shape-block-color' + (this.id + (app.gameType == 1 ? 0 : 4));


		for (var i = 0, l = shapeInfos.length; i < l; i++) {
			this.shapes.push(new Shape(shapeInfos[i], this, app.field));
		}
	},

	play: function () {
		for (var i = 0, l = this.shapes.length; i < l; i++) {
			this.shapes[i].visible(true);
		}
	},

	hide: function () {
		for (var i = 0, l = this.shapes.length; i < l; i++) {
			this.shapes[i].visible(false);
		}
	}

});


var app, serverConnector;

$(function () {
	app = new App();
	serverConnector = new ServerConnector();

	//temp skip turn
	$(document).keydown(function (e) {
		if (e.keyCode == 13) { //enter
			app.nextPlayer();
		}
	});
});

