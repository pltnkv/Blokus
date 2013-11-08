/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 23.09.13
 * Time: 23:23
 * To change this template use File | Settings | File Templates.
 */

if (!String.prototype.format) {
	String.prototype.format = function () {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	};
}



function div(p1, p2) {
	return (p1 - (p1 % p2)) / p2;
}

var undefined;
document = document;// for code intelligence

//game settings
var settings = {
	blockSize: 30
};


var shapesStorage = {
	items: [
		{
			data: [
				[2, 1, 1, 1, 2],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 0
		},

		{
			data: [
				[2, 1, 1, 2, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 180,
			offY: 0
		},

		{
			data: [
				[2, 1, 2, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 60
		},
		{
			data: [
				[2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 120,
			offY: 60
		},
		{
			data: [
				[2, 1, 2, 0, 0],
				[0, 0, 2, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 210,
			offY: 60
		},
		{
			data: [
				[2, 2, 0, 0, 0],
				[2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 120
		} ,
		{
			data: [
				[2, 0, 0, 0, 0],
				[2, 2, 0, 0, 0],
				[0, 2, 2, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 90,
			offY: 120
		},
		{
			data: [
				[2, 2, 0, 0, 0],
				[0, 2, 1, 2, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 180,
			offY: 120
		},
		{
			data: [
				[2, 1, 2, 0, 0],
				[2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 210
		},
		{
			data: [
				[0, 2, 0, 0, 0],
				[2, 1, 2, 0, 0],
				[0, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 90,
			offY: 240
		},
		{
			data: [
				[2, 1, 2, 0, 0],
				[2, 0, 2, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 210,
			offY: 210
		},
		{
			data: [
				[0, 2, 0, 0, 0],
				[2, 1, 2, 0, 0],
				[2, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 300
		},
		{
			data: [
				[2, 1, 1, 2, 0],
				[0, 0, 2, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 120,
			offY: 360
		},
		{
			data: [
				[2, 1, 2, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 2, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 210,
			offY: 300
		},
		{
			data: [
				[0, 0, 2, 0, 0],
				[2, 1, 2, 0, 0],
				[2, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 390
		},
		{
			data: [
				[2, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 120,
			offY: 420
		},
		{
			data: [
				[0, 0, 0, 2, 0],
				[2, 1, 1, 2, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 180,
			offY: 420
		},
		{
			data: [
				[2, 1, 2, 0, 0],
				[0, 1, 0, 0, 0],
				[0, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 60,
			offY: 480
		},
		{
			data: [
				[2, 0, 0, 0, 0],
				[2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 0,
			offY: 510
		},
		{
			data: [
				[0, 2, 0, 0, 0],
				[2, 2, 0, 0, 0],
				[2, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 150,
			offY: 510
		},
		{
			data: [
				[0, 2, 0, 0, 0],
				[2, 1, 0, 0, 0],
				[0, 2, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			offX: 240,
			offY: 510
		}
	],

	cloneItems: function () {
		var i, l, j, item, newData, newItem, res = [];
		for (i = 0, l = this.items.length; i < l; i++) {
			item = this.items[i];
			newData = [];
			for (j = 0; j < 5; j++) {
				newData[j] = item.data[j].slice(0);
			}
			newItem = {};
			newItem.data = newData;
			newItem.offX = item.offX;
			newItem.offY = item.offY;
			res.push(newItem);
		}
		return res;
	}
};

