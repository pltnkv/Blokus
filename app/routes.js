/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 04.09.13
 * Time: 21:35
 * To change this template use File | Settings | File Templates.
 */
var log = require('logger')(module)
	, core = require('core');

var game = core.gamesManager.createGame('qwe');
log.info('core');
log.info('game =  ' + game.getTitle());

function init(app) {


	app.get('/newgame', function (req, res) {
		log.info("newgame");
		res.render('newgame', makeParams());
	});

	app.get('/listgames', function (req, res) {
		log.info("listgames");
		res.render('listgames', makeParams());
	});

	app.post('/game', function (req, res) {
		var numPlayers = parseInt(req.param('numplayers'));
		log.info(numPlayers);
		res.render('game', makeParams({numPlayers: numPlayers}));
	});
	app.get('/game', function (req, res) {
		res.render('game', makeParams({numPlayers: 4}));
	});


	app.get('/rules', function (req, res) {
		log.info("rules");
		res.render('rules', makeParams());
	});

	app.get('/results', function (req, res) {
		log.info("results");
		res.render('results', makeParams());
	});

	app.get('/', function (req, res) {
		log.info("index");
		res.render('index', makeParams());
	});

	//######################################
	// AJAX
	//######################################


	//######################################
	// SEO
	//######################################


	//######################################
	// HELPERS
	//######################################
	var debug = app.get('debug');

	function makeParams(value) {
		if (value == undefined) {
			value = {};
		}
		value.debug = debug;
		return value;
	}
}


exports.init = init;
