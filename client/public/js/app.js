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
	},

	prepareGameField: function () {
		this.field = new GameField();
	},

	preparePlayers: function (params) {
		var i, plr;

		this.players = [];
		for (i = 0; i < params.players.length; i++) {
			plr = new Player(params.players[i].id, params.players[i].name);
			this.players.push(plr);
		}
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
				{id: 1, name: 'Green'},
				{id: 2, name: 'Blue'},
				{id: 3, name: 'Yellow'},
				{id: 4, name: 'Red'}
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
		var i, l, shapeInfos = shapesStorage.cloneItems();

		this.shapes = [];

		for (i = 0, l = shapeInfos.length; i < l; i++) {
			this.shapes.push(new Shape(shapeInfos[i], app.field));
		}
	},

	play: function () {

	},

	hide: function () {

	}

});


var app, serverConnector;

$(function () {
	app = new App();
	serverConnector = new ServerConnector();
});

