//what a scene needs:
//1 series of text
//bg image
//extra stuff?
//arrows pointing to the next scene
//LEFT AND RIGHT BOUNDARIES?
const player = new Player();
const camera = new Camera(player);

class Scene{
	constructor({bg, textseries, boundaries}){
		this.bg = bg;
		this.textseries = textseries;
		this.boundaries = boundaries;
	}
	update(camera){
		this.bg.update(camera);
		this.textseries.update(camera);
	}

}

//SCENE1////////////////////////////////////////////////////////////////////////////////////////////////////////////
const text = new Text({
	text:'Welcome!',
	position:{
		x:canvas.width/2 - c.measureText(this.text).width/2,
		y:200,
	}
});
const text2 = new Text({
	text:"Use WASD or the arrow keys to move.",
	position:{
		x:canvas.width/2 - c.measureText(this.text).width/2,
		y:300,
	},
	font:'20pt Verdana'
});
const series = new Seriestext({
	textlist: [text, text2],
	timelist: [0, 3000, 10000],
});
const bg = new Sprite({
	position:{
		x:0,
		y:-100,
	},
	imageSrc: './img/bg.jpg',
	scale: 0.3
});

const scene1 = new Scene({
	boundaries:{
		left:0,
		right:1750,
		top:0,
	},
	bg:bg,
	textseries:series,
});
///SCENE1/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///SCENE2/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bg2 = new Sprite({
	position:{
		x:0,
		y:-100,
	},
	imageSrc: './img/bg2.png',
})
const scene2 = new Scene({
	boundaries:{
		left:0,
		right:1750,
		top:0,
	},
	bg:bg2,
	textseries:series,
})

///SCENE2/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentscene = 0;
const scenes = [scene1, scene2];
