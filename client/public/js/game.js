/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.09.13
 * Time: 22:29
 * To change this template use File | Settings | File Templates.
 */
var game = function () {

	//prepare shapes
	var el, i, l, gameField;

	gameField = new GameField();

	for (i = 0, l = shapes.length; i < l; i++) {
		var shapeInfo = shapes[i];
		el = new Shape(shapeInfo, gameField);
	}


}


var Shape = (function () {
	// static private variables
	var blockSize = settings.blockSize,
		shapesMarginTop = 50,
		shapesMarginLeft = 30,
		maxZIndex = 100;


	function Shape(info, gameField) {
		var that = this;
		var offsetX, offsetY;

		that.info = info;
		that.wLenght = 0;
		that.hLenght = 0;

		var htmlView = '<div class="game-shape">';
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (info.data[i][j] != 0) {
					var style = "width:{0}px; height:{0}px; left:{1}px; top:{2}px;".format(blockSize, blockSize * j, blockSize * i);
					htmlView += '<div class="shape-block" style="' + style + '"></div>';
					if (that.wLenght < j) {
						that.wLenght = j;
					}
					if (that.hLenght < i) {
						that.hLenght = i;
					}
				}
			}
		}
		htmlView += '</div>';
		that.visual = $(htmlView);
		that.visual.appendTo("body");

		//set default position
		that.x = that.info.offX + shapesMarginLeft;
		that.y = that.info.offY + shapesMarginTop;

		that.visual.mousedown(down);


		function down(e) {
			console.log('down = ', name, e);
			offsetX = $(e.target).position().left + e.offsetX;
			offsetY = $(e.target).position().top + e.offsetY;
			$(document).bind('mousemove', move);
			$(document).bind('mouseup', up);
			$(document).bind('mousewheel', mousewheel);

			that.visual.css('z-index', maxZIndex);
			maxZIndex++;
		}

		function move(e) {
			console.log('move  = ', name, offsetX, offsetY);

			var snapPoint = gameField.checkOnSnap(that, e.clientX - offsetX, e.clientY - offsetY);

			that.x = snapPoint.x;
			that.y = snapPoint.y;
		}

		function up(e) {
			$(document).unbind('mousemove', move);
			$(document).unbind('mouseup', up);
			$(document).unbind('mousewheel', mousewheel);
			var success = gameField.checkOnSnap(that, e.clientX - offsetX, e.clientY - offsetY).overField;
			if (success) {

			} else {
				//to default position
				that.x = that.info.offX + shapesMarginLeft;
				that.y = that.info.offY + shapesMarginTop;
			}
		}

		function mousewheel(e, delta) {
			if (delta > 0) {
				that.turn();
			} else {
				that.upend();
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


	//повернуть 1 раз по часовой стрелке
	Shape.prototype.turn = function () {

	};

	//перевернуть фигуру
	Shape.prototype.upend = function () {

	};


	return Shape;
})();


var GameField = (function () {
	// static private variables
	var fieldSize = 20,
		fieldLeft = 400,
		fieldTop = 50,
		fieldRight = fieldSize * settings.blockSize + fieldLeft,
		fieldBottom = fieldSize * settings.blockSize + fieldTop;


	// constructor
	function GameField() {
		var that = this;
		var blocks = [],
			visual;


		that.visual = visual = $('<div class="game-field"></div>');
		visual.css('left', fieldLeft).css('top', fieldTop);
		visual.appendTo("body");

		//filling
		var i, j, block;
		for (i = 0; i < fieldSize; i++) {
			if (blocks[i] == undefined) {
				blocks[i] = [];
			}
			for (j = 0; j < fieldSize; j++) {
				block = new GameFieldBlock(j, i);
				block.visual.appendTo(visual);

				blocks[i][j] = block;
			}
		}

	};


	GameField.prototype.checkOnSnap = function (shape, posX, posY) {
		var snapPoint = {'x': posX, 'y': posY, overField: false},
			blockX, blockY;

		if (posX > fieldLeft && posX < fieldRight && posY > fieldTop && posY < fieldBottom) {
			blockX = div(posX - fieldLeft, settings.blockSize);
			blockY = div(posY - fieldTop, settings.blockSize);
			//использовать привязку, если фигура вписывается в поле
			if (fieldSize - shape.wLenght - blockX > 0 && fieldSize - shape.hLenght - blockY > 0) {
				snapPoint.x = fieldLeft + blockX * settings.blockSize;
				snapPoint.y = fieldTop + blockY * settings.blockSize;
				snapPoint.overField = true;
			}
		}
		return snapPoint;
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

