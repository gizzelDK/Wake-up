////Inspired by Javidx9 aka OneLoneCoder http://www.onelonecoder.com/ https://www.youtube.com/watch?v=s7EbrvA188A&t=500s
///Mechs mostly Emily Xie https://www.youtube.com/watch?v=S1TQCi9axzg&t=6s 

var streams = [];
var symbolSize = 16;
var fadeInterval = 0.2;
var framecount = 0;
var whatToDo = new WakeUp();
function mRain(){
	setup.start();
	var x = 0;
	for (var i = 0; i < window.innerWidth / symbolSize; i++) {
		var stream = new Stream();
		stream.genSymbols(x, Math.floor(Math.random() * -1000));
		streams.push(stream);
		x += symbolSize;
	}

	setup.update();
}

var setup = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	update : function(){
		this.interval = setInterval(updateCanvas, 200);
		this.context.font = symbolSize + "px Consolas";
		updateCanvas();

		},
	clear : function(){
		this.context.fillStyle = "rgba(0, 0, 0, 0.2)";
		this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

		}
	}


function updateCanvas(){
	setup.clear();
	streams.forEach(function(stream){
		stream.render();
	});
	if (framecount > 60 && framecount < 1000) {

		whatToDo.render();
	}
			framecount++;
	console.log(framecount);
}

function Symbol(x, y, speed, first, opacity){
	this.x = x;
	this.y = y;
	this.symbolVal;
	this.speed = speed;
	this.first = first;
	this.opacity = opacity;
	this.switchInterval = Math.floor(Math.random() * (124 - 8) +8);

	this.setSymbol = function(){
		var charType = Math.floor(Math.random() * 5 );
		if(framecount % this.switchInterval == 0){
			if(charType > 1){
				// this.symbolVal = "0";
				this.symbolVal = String.fromCharCode(0x30A0 + Math.floor(Math.random()* 97));
			}else{
				// this.symbolVal = "1";
				this.symbolVal = Math.floor(Math.random() * 1.5);
			}
		}
	}
	this.rain = function(){
		this.y = (this.y >= window.innerHeight) ? 0 : this.y += this.speed;
	}
}

function Stream(){
	this.symbols = [];
	this.numSymbols = Math.floor(Math.random() * (64 - 1)+1);
	this.speed = Math.random() * (30 - 5) + 5;

	this.genSymbols = function(x, y){
		var opacity = 255;
		var first = Math.floor(Math.random() * 6) == 1;
		for (var i = 0; i < this.numSymbols; i++) {
			symbol = new Symbol(
				x,
				y,
				this.speed,
				first,
				opacity);
			symbol.setSymbol();
			this.symbols.push(symbol);
			opacity -= (255 / this.numSymbols) / fadeInterval;
			y -= symbolSize;
			first = false;
		}
	}
	this.render = function(){
		this.symbols.forEach(function(symbol){
			if (symbol.first) {
				// setup.context.fillstyle = "#fff";
				setup.context.fillStyle = 'rgba(240, 250, 240, 0.8)';
			} else {
				// setup.context.fillstyle = "#fff";
				var colourVariant = Math.floor(Math.random() * (330 - 75) -75);
				//Backticks for literal string
				setup.context.fillStyle = `rgba(0, ${colourVariant}, 0, 0.8)`;
			}
			setup.context.fillText(symbol.symbolVal, symbol.x, symbol.y);
			symbol.rain();
			symbol.setSymbol();
		});
	}

}

function WakeUp(){
	this.msg = "Wake up";
	this.x = window.innerWidth / 2;
	this.y = window.innerHeight /2-50;
	this.render = function(x, y){
		setup.context.fillStyle = "rgb(0, 240, 90)";
		setup.context.fillText(this.msg, this.x, this.y);
	}
}