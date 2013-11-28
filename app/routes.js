/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 04.09.13
 * Time: 21:35
 * To change this template use File | Settings | File Templates.
 */
var log = require('logger')(module)
    ,gamesController = require('./game/gamescontroller.js');

function init(app) {

    app.get('/adm', function (req, res) {
        if (req.param('key') == 'qwedsa') {
            var games = pageProcessor.adm();
            res.render('adm', makeParams({games: games}));
        } else {
            res.send('No access', 401);
        }
    });


    app.get('/newgame', function (req, res) {
        log.info("newgame");
        res.render('newgame', makeParams());
    });

    app.get('/listgames', function (req, res) {
        log.info("listgames");
        res.render('listgames', makeParams());
    });

    app.post('/game', function (req, res) {
        var fieldType = parseInt(req.param('fieldType'));
        var isOnlineGame = !!req.param('onlineGame');
	    gamesController.createGame(fieldType, isOnlineGame, function (err, gameInfo) {
		    if (err) {
			    res.render('game_error', makeParams({error:err}));
		    } else {
			    res.render('game', makeParams({gameInfo: gameInfo}));
		    }
	    });
    });
    app.get('/game', function (req, res) {
        var numPlayers = parseInt(req.param('t'));
        log.info(numPlayers);
        res.render('game', makeParams({numPlayers: numPlayers}));
    });

    app.get('/join', function (req, res) {
        var gameId = req.param('id');
        gamesController.joinToGame(gameId, function(err, gameInfo){
            if (err) {
                res.render('game_error', makeParams({error:err}));
            } else {
                res.render('join', makeParams({gameInfo: gameInfo}));
            }
        });
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


var pageProcessor = {
    adm: function () {
        return gamesController.getGamesStat();
    }
};


exports.init = init;
