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
	type: { type: Number, required: true }, //0-2color, 1-4color_2Player, 2-4color_4Player, 3-4color_Team
	minutesPerSide: { type: Number, required: true },
	demoMode: { type: Boolean, required: true },
	players: { type: Boolean, default: false},
	fieldData: [Schema.Types.Mixed],
	finished: { type: Boolean, default: false},
	startDate: { type: Date, default: Date.now }
});

// validation
Game.path('type').validate(function (v) {
	return v >= 0 && v <= 3;
}, 'validation of `{PATH}` failed with value `{VALUE}`');

Game.path('minutesPerSide').validate(function (v) {
	return v >= 5 && v <= 40;
}, 'validation of `{PATH}` failed with value `{VALUE}`');


var GameModel = mongoose.model('Game', Game);

var game = new GameModel({
	title: 'ARRRGH',
	author: 'Diablo',
	age: 444
});
game.save(function (err) {
	if (err) {
		log.error(err);
	}
});

/*ArticleModel.find({ author: 'Diablo'}, function (err, docs) {
	if (err) {
		log.error(err);
	}

	for (var i = 0; i < docs.length; i++) {
		var doc = docs[i];
		log.info(doc.title)
	}


});

ArticleModel.remove({ title: 'ARRRGH' }, function (err) {
	if (err) {
		log.error(err);
	}
});*/


module.exports.GameModel = GameModel;
//module.exports.PlayerModel = PlayerModel;
