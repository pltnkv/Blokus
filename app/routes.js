/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 04.09.13
 * Time: 21:35
 * To change this template use File | Settings | File Templates.
 */
var log = require('logger')(module);

function init(app) {



    app.get('/newgame', function (req, res) {
        log.info("newgame");
        res.render('newgame', {
            title: 'Consolidate.js'
        });
    });

    app.get('/listgames', function (req, res) {
        log.info("listgames");
        res.render('listgames', {
            title: 'Consolidate.js'
        });
    });

    app.get('/game', function (req, res) {
        log.info("game");
        res.render('game', {
            title: 'Consolidate.js'
        });
    });

    app.get('/results', function (req, res) {
        log.info("results");
        res.render('results', {
            title: 'Consolidate.js'
        });
    });

    app.get('/', function (req, res) {
        log.info("index");
        res.render('index', {
            title: 'Consolidate.js'
        });
    });

    //######################################
    // AJAX
    //######################################


    //######################################
    // SEO
    //######################################
    app.get('/yandex_6bb0bc8153eeec86.html', function (req, res) {
        log.info("bot_yandex");
        res.render('bot_yandex', {});
    });

    app.get('/googlefda7d37e6aaac9e1.html', function (req, res) {
        log.info("bot_google");
        res.render('bot_google', {});
    });
}

exports.init = init;
