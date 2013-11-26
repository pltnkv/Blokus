/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 16.11.13
 * Time: 14:53
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var log = require('logger')(module);

mongoose.connect('mongodb://localhost/test1');


var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;


var Game = new Schema({
    fieldType: { type: Number, required: true }, //2-small_classic_on_2, 3-trigon, 4-classic
    minutesPerSide: { type: Number, required: true },
    onlineMode: { type: Boolean, required: true },
    players: { type: [Schema.Types.Mixed], required: true },
    fieldData: [Schema.Types.Mixed],
    finished: { type: Boolean, default: false},
    startDate: { type: Date, default: Date.now }
});

// validation
Game.path('fieldType').validate(function (v) {
    return v >= 2 && v <= 4;
}, 'validation of `{PATH}` failed with value `{VALUE}`');

Game.path('minutesPerSide').validate(function (v) {
    return v >= 5 && v <= 40;
}, 'validation of `{PATH}` failed with value `{VALUE}`');


var GameModel = mongoose.model('Game', Game);

/*var game = new GameModel({
    fieldType: 4,
    minutesPerSide: 15,
    demoMode: false,
    players: [
        {name: "orange", score: 0},
        {name: "red", score: 0},
        {name: "red3", score: 10},
        {name: "red4", score: 0}
    ]
});*/
/*game.save(function (err) {
    if (err) {
        log.error(err);
    }
});*/

GameModel.findOne({}, function (err, doc) {
    if (err) {
        log.error(err);
    }

    log.info(doc.players[0].name, doc.players[0].score);
    doc.players[0].score = 333;
    doc.markModified('players');

    doc.save(function (err) {
        if (err) {
            log.error(err);
        }
    });

    /*for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
        log.info(doc)
    }*/
});

/* ArticleModel.remove({ title: 'ARRRGH' }, function (err) {
 if (err) {
 log.error(err);
 }
 });*/


module.exports.GameModel = GameModel;
