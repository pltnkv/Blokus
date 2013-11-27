/**
 * Created by oleg on 27.11.13.
 */

var Class = require('../classy.js');

var Client = Class.$extend({
	__init__ : function() {
		this.free = true;
		this.isCreator = false;
		this.hash = '' + Math.random();
	}
});


module.exports.Client = Client;
