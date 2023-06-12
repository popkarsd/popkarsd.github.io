const scene4boundaries ={
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


//text
const competition = new Text({
	text:'About Me',
	position:{
		x:canvas.width/2,
		y:titleheight,
	},
});
const competitionsub = new Text({
	text:"Hi there! I'm Brendon Jiang, a senior enrolled in Riverside STEM \nHigh School. Let me say it straight up: I'm a proud nerd! \n\nI love to compete in various math and programming competitions, such as the \nAMCs and USACO. Through these competitions, I've learned valuable life skills: \nto be a critical thinker, \nto be humble, \nand most importantly, to be persistantly passionate. \n\nAside from competitions, I enjoy playing tennis with fellow high schoolers.",
	position:{
		x:canvas.width/2-200,
		y:subtitleheight,
	},
	font:'16pt Verdana',
	displayspeed:1,
	align:'left',
});
const competitionseries = new Seriestext({
	textlist: [competition, competitionsub],
	timelist: [0, 2000, 15000],
});
const scene2 = new Scene({
	boundaries:scene2boundaries,
	bg:introbg,
	textseries:competitionseries,
	drawableobjects:[],
})
