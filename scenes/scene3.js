const scene3boundaries = {
	left:0,
	right:2050,
	top:0,
	midx:1025,
}

const project = new Text({
	text:'Project Showcase: Animations',
	position:{
		x:scene3boundaries.midx,
		y:titleheight,
	}
});
const projecttext = new Text({
	text:"Here are some of the 2D animations I have created with \n Blender, a free and open source animation suite.",
	position:{
		x:scene3boundaries.midx,
		y:subtitleheight,
	},
	font:'20pt Verdana',
	displayspeed:2,
});


///THEGIFS////////////////////////////////////////////////
const discordpfp = new GIFSprite({
	position:{
		x:scene3boundaries.midx,
		y:300,
	},
	gifSrc:{
		name:'discordpfp',
		numpics: 127,
	},
	scale:0.2,
	border:1
});

// console.log(discordpfp.width);

const ommc = new GIFSprite({
	position:{
		x:scene3boundaries.midx+300,
		y:displayheight,
	},
	gifSrc:{
		name:'ommc',
		numpics: 66,
	},
	scale:0.1,
	border:1,
});
const co2 = new GIFSprite({
	position:{
		x:scene3boundaries.midx+600,
		y:displayheight,
	},
	gifSrc:{
		name:'co2',
		numpics: 60,
	},
	scale:0.1,
	border:1,
});
const novacrypt = new GIFSprite({
	position:{
		x:scene3boundaries.midx-300,
		y:displayheight,
	},
	gifSrc:{
		name:'novacryptlogo',
		numpics: 121,
	},
	scale:0.1,
	border:1,
});
const bouncingball = new GIFSprite({
	position:{
		x:scene3boundaries.midx-600,
		y:displayheight,
	},
	gifSrc:{
		name:'bouncingball',
		numpics: 26,
	},
	scale:0.1,
	border:1,
});

///THEGIFS END////////////////////////////////////////////////

//onloads

const bg3 = new Sprite({
	position:{
		x:0,
		y:0,
	},
	imageSrc: './img/bg3.png',
	scale:2
});
const projectseries = new Seriestext({
	textlist: [project, projecttext],
	timelist: [0, 3000, 8000],
});
const scene3 = new Scene({
	boundaries:scene3boundaries,
	bg:bg3,
	textseries:projectseries,
	drawableobjects: [discordpfp,ommc,co2,novacrypt,bouncingball],
})