//add the bg here becuz why not


//what a scene needs:
//1 series of text
//bg image
//extra stuff?
//arrows pointing to the next scene
//LEFT AND RIGHT BOUNDARIES?
//add audio based on space between player and object?
const player = new Player();
const camera = new Camera(player);
const titleheight = 150;
const subtitleheight = 220;
const displayheight = 300;
class Scene{
	constructor({bg=introbg, textseries, boundaries, drawableobjects=[]}){
		this.bg = bg;
		this.textseries = textseries;
		this.boundaries = boundaries;
		this.drawableobjects = drawableobjects;
	}
	addobject(object){
		this.drawableobjects.push(object);
	}
	update(camera){
		// this.bg.update(camera);
		this.textseries.update(camera);
		this.drawableobjects.forEach(item => item.update(camera));
		//draw walls
		c.fillStyle='black';
		c.fillRect(this.boundaries.left-camera.position.x-canvas.width,-4*canvas.height-camera.position.y, canvas.width, 8*canvas.height);
		c.fillRect(this.boundaries.right-camera.position.x,-4*canvas.height-camera.position.y, canvas.width, 8*canvas.height);
	}

}