/**
 * Created with JetBrains WebStorm.
 * User: oleg
 * Date: 14.09.13
 * Time: 22:29
 * To change this template use File | Settings | File Templates.
 */

var fieldSize = 20,
	fieldLeft = 400,
	fieldTop = 50,
	fieldRight = fieldSize * settings.blockSize + fieldLeft,
	fieldBottom = fieldSize * settings.blockSize + fieldTop;

var GameField = Class.$extend({

	__init__: function () {
		this.blocks = [];
		this.data = [];

		this.visual = $('<div class="game-field"></div>');
		this.visual.css('left', fieldLeft).css('top', fieldTop);
		this.visual.appendTo("body");

		//filling visual blocks
		var i, j, block;
		for (i = 0; i < fieldSize; i++) {
			if (this.blocks[i] == undefined) {
				this.blocks[i] = [];
			}
			for (j = 0; j < fieldSize; j++) {
				block = new GameFieldBlock(j, i);
				block.visual.appendTo(this.visual);

				this.blocks[i][j] = block;
			}
		}

		//filling empty data with borders
		for (i = 0; i < fieldSize + 2; i++) {
			if (this.data[i] == undefined) {
				this.data[i] = [];
			}
			for (j = 0; j < fieldSize + 2; j++) {
				this.data[i][j] = 0;
			}
		}

		this.data[fieldSize + 1][0] = 2; //red
		this.data[0][0] = 4; //yellow
		this.data[0][fieldSize + 1] = 6; //green
		this.data[fieldSize + 1][fieldSize + 1] = 8; //blue
	},


	checkOnSnap: function (shape, posX, posY) {
		var snapPoint = {'x': posX, 'y': posY, overField: false},
			blockX, blockY;

		if (posX > fieldLeft && posX < fieldRight && posY > fieldTop && posY < fieldBottom) {
			blockX = div(posX - fieldLeft, settings.blockSize)
			blockY = div(posY - fieldTop, settings.blockSize);
			//использовать привязку, если фигура вписывается в поле
			if (fieldSize - shape.wLenght - blockX >= 0 && fieldSize - shape.hLenght - blockY >= 0) {
				snapPoint.x = fieldLeft + blockX * settings.blockSize;
				snapPoint.y = fieldTop + blockY * settings.blockSize;
				snapPoint.overField = true;
				snapPoint.blockX = blockX + 1;//учитываем хак с инициирующими границами
				snapPoint.blockY = blockY + 1;
			}
		}
		return snapPoint;
	},


	checkRulesCompliance: function (shape, blockX, blockY) {
		console.log('checkRulesCompliance', blockX, blockY);
		var res = false;
		if (this.checkNoIntersections(shape, blockX, blockY) &&
			this.checkFriendlyContact(shape, blockX, blockY)) {
			res = true;
		}
		return res;
	},

	checkNoIntersections: function (shape, blockX, blockY) {
		var i, j, iLen, jLen, shapeData = shape.data;
		for (i = 0, iLen = shape.hLenght; i < iLen; i++) {
			for (j = 0, jLen = shape.wLenght; j < jLen; j++) {
				if (this.data[blockY + i][blockX + j] != 0 && shapeData[i][j] != 0) {
					return false;
				}
			}
		}
		return true;
	},

	checkFriendlyContact: function (shape, blockX, blockY) {
		var i, j, iLen, jLen, shapeData = shape.data;
		var angleContactExist = false;
		var contactNumber = shape.contactNumber;

		console.log(this.data);

		for (i = 0, iLen = shape.hLenght; i < iLen; i++) {
			for (j = 0, jLen = shape.wLenght; j < jLen; j++) {
				//проверка угловых контактов
				var posx = blockX + j,
					posy = blockY + i;
				if (!angleContactExist && shapeData[i][j] == contactNumber) {
					if (this.data[posy + 1][posx + 1] == contactNumber ||
						this.data[posy + 1][posx - 1] == contactNumber ||
						this.data[posy - 1][posx + 1] == contactNumber ||
						this.data[posy - 1][posx - 1] == contactNumber) {
						angleContactExist = true;
					}
				}

				//проверка прямых контактов
				if (shapeData[i][j] == contactNumber || shapeData[i][j] == contactNumber - 1) {
					if (this.data[posy][posx + 1] == contactNumber || this.data[posy][posx + 1] == contactNumber - 1 ||
						this.data[posy][posx - 1] == contactNumber || this.data[posy][posx - 1] == contactNumber - 1 ||
						this.data[posy + 1][posx] == contactNumber || this.data[posy + 1][posx] == contactNumber - 1 ||
						this.data[posy - 1][posx] == contactNumber || this.data[posy - 1][posx] == contactNumber - 1) {
						return false;
					}
				}
			}
		}
		return angleContactExist;
	},


	setShape: function (shape, blockX, blockY) {
		//filling
		var i, j, iLen, jLen, shapeData = shape.data;
		console.log(shapeData, blockX, blockY, shape.hLenght, shape.wLenght);

		for (i = 0, iLen = shape.hLenght; i < iLen; i++) {
			for (j = 0, jLen = shape.wLenght; j < jLen; j++) {
				if (shapeData[i][j] != 0) {
					this.blocks[blockY + i - 1][blockX + j - 1].setColorClass(shape.colorClass);
					this.data[blockY + i][blockX + j] = shapeData[i][j];
				}
			}
		}
	}

});


var GameFieldBlock = Class.$extend({
	__init__: function (posX, posY) {
		var style = "width:{0}px; height:{0}px; left:{1}px; top:{2}px;".format(settings.blockSize, settings.blockSize * posX, settings.blockSize * posY);
		var htmlView = '<div class="field-block" style="' + style + '"></div>';
		this.visual = $(htmlView);
	},

	setColorClass: function (className) {
		this.visual.addClass(className);
	}
});


var maxZIndex = 100;
var Shape = Class.$extend({

	__init__: function (info, player, gameField) {

		var shapesMarginTop = 50,
			shapesMarginLeft = 30;

		var that = this;
		var offsetX, offsetY;

		this.used = false;
		this.info = info;
		this.data = info.data;
		this.colorClass = 'shape-block-color' + player.id;
		this.contactNumber = 2 + player.id * 2;

		this.visual = $('<div class="game-shape"></div>');
		this.visual.appendTo("body");

		this.visible(false);
		this.visualize();


		//remember default data
		var i, j;
		this.defaultData = [];
		for (i = 0; i < 5; i++) {
			if (this.defaultData[i] == undefined) {
				this.defaultData[i] = [];
			}
			for (j = 0; j < 5; j++) {
				this.defaultData[i][j] = this.data[i][j];
			}
		}

		//set default position
		this.x(this.info.offX + shapesMarginLeft);
		this.y(this.info.offY + shapesMarginTop);

		this.visual.mousedown(down);


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
			var snapPoint = gameField.checkOnSnap(that, e.clientX - offsetX, e.clientY - offsetY);

			that.x(snapPoint.x);
			that.y(snapPoint.y);
		}

		function up(e) {
			$(document).unbind('mousemove', move);
			$(document).unbind('mouseup', up);
			$(document).unbind('mousewheel', mousewheel);
			var snapPoint = gameField.checkOnSnap(that, e.clientX - offsetX, e.clientY - offsetY);
			var rulesCompliance = snapPoint.overField ? gameField.checkRulesCompliance(that, snapPoint.blockX, snapPoint.blockY) : false;

			if (rulesCompliance) {
				gameField.setShape(that, snapPoint.blockX, snapPoint.blockY);
				that.used = true;
				that.visible(false);
				app.nextPlayer();
			} else {
				//to default position
				var i, j;
				for (i = 0; i < 5; i++) {
					for (j = 0; j < 5; j++) {
						that.data[i][j] = that.defaultData[i][j];
					}
				}
				that.info.data = that.data;
				that.visualize();
				that.x(that.info.offX + shapesMarginLeft);
				that.y(that.info.offY + shapesMarginTop);
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

	},

	visible: function (value) {
		if (value && !this.used) {
			this.visual.css("display", "block");
		} else {
			this.visual.css("display", "none");
		}

	},

	x: function (value) {
		if (value != undefined) {
			this.visual.css('left', value + 'px');
		} else {
			return parseInt(this.visual.css('left'));
		}
	},

	y: function (value) {
		if (value != undefined) {
			this.visual.css('top', value + 'px');
		} else {
			return parseInt(this.visual.css('top'));
		}
	},


	//повернуть 1 раз по часовой стрелке
	turn: function () {
		var i, j,
			data = this.data,
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
	},

	//перевернуть фигуру
	upend: function () {
		var data = this.data,
			tempLine0 = data[0],
			tempLine1 = data[1];
		data[0] = data[4];
		data[1] = data[3];
		data[3] = tempLine1;
		data[4] = tempLine0;

		this.normalizeData();
		this.visualize();
	},

	normalizeData: function () {
		var i, j, l,
			doOffsetV = true,
			doOffsetH = true,
			data = this.data,
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
	},

	visualize: function () {
		var htmlView = '',
			data = this.data,
			blockSize = settings.blockSize;

		this.wLenght = 0;
		this.hLenght = 0;

		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (data[i][j] != 0) {
					var style = "width:{0}px; height:{0}px; left:{1}px; top:{2}px;".format(blockSize, blockSize * j, blockSize * i);
					htmlView += '<div class="shape-block ' + this.colorClass + '" style="' + style + '"></div>';
					if (this.wLenght < j + 1) {
						this.wLenght = j + 1;
					}
					if (this.hLenght < i + 1) {
						this.hLenght = i + 1;
					}
				}
			}
		}

		this.visual.html(htmlView);
	}
});
