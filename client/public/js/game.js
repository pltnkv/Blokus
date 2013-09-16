/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.09.13
 * Time: 22:29
 * To change this template use File | Settings | File Templates.
 */
var game = function () {

	//prepare shapes
	var i, l, gameField;

	for (i = 0, l = shapes.length; i < l; i++) {
		var shapeInfo = shapes[i];
		var el = new Shape(shapeInfo);
	}

	gameField = new GameField();
}


var Shape = (function () {
	// static private variables
	var blockSize = settings.blockSize;
	var shapesMarginTop = 50;
	var maxZIndex = 100;

	// constructor
	function Shape(info) {
		var that = this;
		var offsetX, offsetY;

		that.info = info;

		var htmlView = '<div class="game-shape">';
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (info.data[i][j] != 0) {
					var style = "width:{0}px; height:{0}px; left:{1}px; top:{2}px;".format(blockSize, blockSize * j, blockSize * i);
					htmlView += '<div class="shape-block" style="' + style + '"></div>';
				}
			}
		}
		htmlView += '</div>';
		that.visual = $(htmlView);
		that.visual.appendTo("body");

		//set default position
		that.x = that.info.offX;
		that.y = that.info.offY + shapesMarginTop;

		that.visual.mousedown(down);


		function down(e) {
			console.log('down = ', name, e);
			offsetX = $(e.target).position().left + e.offsetX;
			offsetY = $(e.target).position().top + e.offsetY;
			$(document).bind('mousemove', move);
			that.visual.bind('mouseup', up);

			that.visual.css('z-index', maxZIndex);
			maxZIndex++;
		}

		function move(e) {
			console.log('move  = ', name, offsetX, offsetY);
			that.x = e.clientX - offsetX;
			that.y = e.clientY - offsetY;
		}

		function up(e) {
			$(document).unbind('mousemove', move);
			that.visual.unbind('mouseup', up);
			var success = false;
			if (success) {

			} else {
				//to default position
				//that.x = that.info.offX;
				//that.y = that.info.offY;
			}
		}
	};


	Object.defineProperty(Shape.prototype, "x", {
		set: function x(value) {
			this.visual.css('left', value + 'px');
		}
	});

	Object.defineProperty(Shape.prototype, "y", {
		set: function y(value) {
			this.visual.css('top', value + 'px');
		}
	});

	Shape.prototype.getVisual = function () {
		return _title;
	};

	return Shape;
})();



var GameField = (function () {
	// static private variables
	var fieldSize = 20;

	// constructor
	function GameField() {
		var that = this;
		var blocks = [],
			visual;


		that.visual = visual = $('<div class="game-field"></div>');
		visual.css('left', 400).css('top', 50);
		visual.appendTo("body");

		//filling
		var i, j, block;
		for (i = 0; i < fieldSize; i++) {
			if(blocks[i] == undefined) {
				blocks[i] = [];
			}
			for (j = 0; j < fieldSize; j++) {
				block = new GameFieldBlock(j, i);
				block.visual.appendTo(visual);

				blocks[i][j] = block;
			}
		}
	};


	Shape.prototype.getVisual = function () {
		//return _title;
	};

	return GameField;
})();



var GameFieldBlock = (function () {

	function GameFieldBlock(posX, posY) {
		var that = this;
		that.posX = posX;
		that.posY = posY;

		var style = "width:{0}px; height:{0}px; left:{1}px; top:{2}px;".format(settings.blockSize, settings.blockSize * posX, settings.blockSize * posY);
		var htmlView = '<div class="field-block" style="' + style + '"></div>';

		that.visual = $(htmlView);
	};


	GameFieldBlock.prototype.getVisual = function () {
		return this.visual;
	};

	GameFieldBlock.prototype.setInfo = function (id, calor) {
		return this.visual;
	};

	return GameFieldBlock;
})();


$(function () {
	game();
});

