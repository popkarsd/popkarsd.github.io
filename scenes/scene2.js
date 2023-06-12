const scene2boundaries ={
	left:0,
	right:canvas.width,
	top:0,
}

//pictures
const staring = new Sprite({
	position:{
		x: canvas.width/2-570,
		y:subtitleheight,
	},
	imageSrc:'./img/staring.jpg',
	scale:0.18,
});
const portrait = new Sprite({
	position:{
		x: canvas.width/2-450,
		y:subtitleheight-120,
	},
	imageSrc:'./img/portrait.png',
	scale:0.1,
})


//test
/*
with \nthe foremost being the AMCs. A highly popular and prestigious math competition, \nI've prepared day after day for the AMCs series to earn a spot \namong the brightest math students in the United States. \n\nThese competitions taught me"
*/

//text
const aboutme = new Text({
	text:'About Me',
	position:{
		x:canvas.width/2,
		y:titleheight,
	},
});
const aboutmetext = new Text({
	text:"Hi there! I'm Brendon Jiang, a senior enrolled in Riverside STEM \nHigh School. Let me say it straight up: I'm a proud nerd! \n\nI love to compete in various math and programming competitions, such as the \nAMCs and USACO. Through these competitions, I've learned valuable life skills: \nto be a critical thinker, \nto be humble, \nand most importantly, to be persistantly passionate. \n\nAside from competitions, I enjoy playing tennis with fellow high schoolers.",
	position:{
		x:canvas.width/2-200,
		y:subtitleheight,
	},
	font:'16pt Verdana',
	displayspeed:1,
	align:'left',
});
const aboutmeseries = new Seriestext({
	textlist: [aboutme, aboutmetext],
	timelist: [0, 2000, 15000],
});
const bg2 = new Sprite({
	position:{
		x:0,
		y:-100,
	},
	imageSrc: './img/bg2.png',
});
const scene2 = new Scene({
	boundaries:scene2boundaries,
	bg:bg2,
	textseries:aboutmeseries,
	drawableobjects:[staring],
})
