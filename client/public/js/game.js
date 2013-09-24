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

	//создать независимую


	var shapes = shapesStorage.cloneItems();
	console.log(shapes);
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

		that.visual = $('<div class="game-shape"></div>');
		that.visual.appendTo("body");

		this.visualize();

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
			return false;
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
		var i, j,
			data = this.info.data,
			tempData = [];

		//копирование в промежуточный массив
		for (i = 0; i < 5; i++) {
			tempData[i] = [];
			for (j = 0; j < 5; j++) {
				tempData[i][j] = data[i][j];
			}
		}

		for (i = 0; i < 5; i++) {
			for (j = 0; j < 5; j++) {
				data[4 - j][i] = tempData[i][j];
			}
		}

		this.normalizeData();
		this.visualize();
	};

	//перевернуть фигуру
	Shape.prototype.upend = function () {
		var data = this.info.data,
			tempLine0 = data[0],
			tempLine1 = data[1];
		data[0] = data[4];
		data[1] = data[3];
		data[3] = tempLine1;
		data[4] = tempLine0;

		this.normalizeData();
		this.visualize();
	};

	Shape.prototype.normalizeData = function () {
		var i, j, l,
			doOffsetV = true,
			doOffsetH = true,
			data = this.info.data,
			offsetV = 0,
			offsetH = 0;

		i = 0;
		do {
			for (j = 0; j < 5; j++) {
				doOffsetV = doOffsetV && data[i][j] == 0;
				doOffsetH = doOffsetH && data[j][i] == 0;
			}
			if (doOffsetV) offsetV++;
			if (doOffsetH) offsetH++;
			i++;
		} while ((doOffsetV || doOffsetH) && i < 5);


		//remove vertical offset
		if (offsetV > 0) {
			for (i = 0, l = 5 - offsetV; i < l; i++) {
				data[i] = data[i + offsetV];
			}
			for (i = 5 - offsetV; i < 5; i++) {
				data[i] = [0, 0, 0, 0, 0];
			}
		}

		//remove horizontal offset
		if (offsetH > 0) {
			var offArr = [];
			for (i = 0; i < offsetH; i++) {
				offArr[i] = 0;
			}
			for (i = 0; i < 5; i++) {
				data[i] = data[i].slice(offsetH).concat(offArr);
			}
		}
	};

	Shape.prototype.visualize = function () {
		var htmlView = '', data = this.info.data;
		this.wLenght = 0;
		this.hLenght = 0;

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (data[i][j] != 0) {
					var style = "width:{0}px; height:{0}px; left:{1}px; top:{2}px;".format(blockSize, blockSize * j, blockSize * i);
					htmlView += '<div class="shape-block" style="' + style + '"></div>';
					if (this.wLenght < j) {
						this.wLenght = j;
					}
					if (this.hLenght < i) {
						this.hLenght = i;
					}
				}
			}
		}

		this.visual.html(htmlView);
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


	return GameFieldBlock;
})();


$(function () {
	game();
});

