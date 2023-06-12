const scene1boundaries ={
	left:0,
	right:canvas.width,
	top:0,
	midx: 1075,
}


const intro = new Text({
	text:'Welcome to Brendon Jiang\'s website!',
	position:{
		x:canvas.width/2,
		y:titleheight,
	},
	displayspeed:5,
});
const intro2 = new Text({
	text:"Use WASD or the arrow keys to control the character.",
	position:{
		x:canvas.width/2,
		y:subtitleheight,
	},
	font:'20pt Verdana',
	displayspeed:2,
});
const intro3 = new Text({
	text:"Press P to speed up! ;-)",
	position:{
		x:canvas.width/2,
		y:subtitleheight+50,
	},
	font:'20pt Verdana',
	displayspeed:2,
});
const introseries = new Seriestext({
	textlist: [intro, intro2, intro3],
	timelist: [1000, 4000, 6000, 8000],
});
const introbg = new Sprite({
	position:{
		x:0,
		y:-100,
	},
	imageSrc: './img/bg.jpg',
	scale: 0.3
});

const scene1 = new Scene({
	boundaries:scene1boundaries,
	bg:introbg,
	textseries:introseries,
});