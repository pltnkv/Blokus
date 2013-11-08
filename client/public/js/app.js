/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 07.11.13
 * Time: 8:04
 * To change this template use File | Settings | File Templates.
 */



var App = Class.$extend({

	run: function (params) {
		this.prepareGameField();
		this.preparePlayers(params);
		this.nextPlayer();
	},

	prepareGameField: function () {
		this.field = new GameField();
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
		this.players[this.currentPlayer].play();
	}

});


var ServerConnector = Class.$extend({
	__init__: function () {
		this.connected();
	},

	connected: function () {
		var params = {
			gameType: 1,//offline
			players: [
				{id: 0, name: 'Green'},
				{id: 1, name: 'Blue'},
				{id: 2, name: 'Yellow'},
				{id: 3, name: 'Red'}
			]
		};
		app.run(params);
	}
});


var Player = Class.$extend({
	__init__: function (id, name) {
		this.id = id;
		this.name = name;

		this.createShapes();
	},

	createShapes: function () {
		var shapeInfos = shapesStorage.cloneItems(),
			colorClass = 'shape-block-color' + this.id;

		this.shapes = [];

		for (var i = 0, l = shapeInfos.length; i < l; i++) {
			this.shapes.push(new Shape(shapeInfos[i], colorClass, app.field));
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
});

