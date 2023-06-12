const gravity = 0.5;
const lightgravity = 0.2;
const floor = 650;



class Camera{
	constructor(player){
		this.position = {
			x: 0,
			y: 0,

		}
		// this.position = {
		// 	x: canvas.width/2+200,
		// 	y: floor,
		// }
		this.scale = {
			x: 1,
			y: 1,
		}
		this.playeroffset={
			x:canvas.width/2-player.width/2,
			y:5*canvas.height/9,
			neary: 7*canvas.height/9,
		}
	}
	//follow player
	update(player){
		if (this.position.x+this.playeroffset.x != player.position.x){
			// this.position.x= player.position.x-canvas.width/2;
			//snap in if its close enough
			if (Math.abs(this.position.x+this.playeroffset.x - player.position.x) < 20){
				// this.position.x = player.position.x-canvas.width/2;
				this.position.x += 1/8 * (player.position.x - this.position.x-this.playeroffset.x);
			}
			//otherwise inch towards it
			else{
				this.position.x += 1/40 * (player.position.x - this.position.x-this.playeroffset.x);
			}
		}
		// lock in camera y pos when player is around the floor
		// if (player.position.y >= floor-200){
		// 	//SPEED when dropping down
		// 	if (this.position.y+this.playeroffset.neary < player.position.y){
		// 		this.position.y += 1/5 * (player.position.y - this.position.y-this.playeroffset.neary);
		// 	}
		// 	//maybe not speed when going up
		// 	else{
		// 		// this.position.y += 1/10000 * (player.position.y - this.position.y-this.playeroffset.neary);
		// 	}

		// }
		// //transition stage?
		// else if (player.position.y >= floor-300 && player.position.y < floor-200){
		// 	console.log("transition");
		// 	//ratio of neary to y
		// 	let ratio = (floor-player.position.y-200)/100;
		// 	console.log(ratio);
		// 	//0 is closer to neary, 1 is closer to y

		// 	//SPEED when dropping down
		// 	if (this.position.y+this.playeroffset.neary < player.position.y){
		// 		this.position.y += 1/5 * (player.position.y - this.position.y-(ratio)*this.playeroffset.neary - (1-ratio)*this.playeroffset.y);
		// 	}
		// 	//maybe not speed when going up
		// 	else{
		// 		this.position.y += 1/40 * (player.position.y - this.position.y-this.playeroffset.neary);
			// }

		// }

		if (this.playeroffset.y >= player.position.y){
			// this.position.x= player.position.x-canvas.width/2;
			//SPEED when dropping down
			if (this.position.y+this.playeroffset.y < player.position.y){
				// let change = 1/5 * (player.position.y - this.position.y-this.playeroffset.y);
				// if (change > 0){
					this.position.y += 1/5 * (player.position.y - this.position.y-this.playeroffset.y);
				// }
				
			}
			//maybe not speed when going up
			else{
				this.position.y += 1/40 * (player.position.y - this.position.y-this.playeroffset.y);
			}
		}
		// else if (player.position.y >= this.playeroffset.y && player.velocity.y > 0){
		// 	this.position.y += 1/40 * (player.position.y - this.position.y-this.playeroffset.y);
		// }
		else if (player.velocity.y >= 0){
			let change = 1/15 * (player.position.y - this.position.y-this.playeroffset.neary);
			if (change > 0){
				this.position.y += 1/15 * (player.position.y - this.position.y-this.playeroffset.neary);
			}
			
		}

	}
	center(player){
		this.position.x = player.position.x - this.playeroffset.x;
		this.position.y = player.position.y - this.playeroffset.neary;
	}
	xtransform(x, player){
		//change = -(this.position.x+player.position.x) * this.scale.x+player.position.x
		return ((x-this.position.x)-player.position.x) * this.scale.x + player.position.x;
	}
	ytransform(y, player){
		return ((y-this.position.y)-player.position.y) * this.scale.y + player.position.y;
	}
	// updateview(player){
	// 	// console.log(this.scale.x);
	// 	// c.setTransform(this.scale.x, 0,0,this.scale.y,
	// 	// 	0,
	// 	// 	0);
	// 	// }

	// // 	c.setTransform(this.scale.x, 0,0,this.scale.y,
	// // 		(-(this.position.x+player.position.x) * this.scale.x + player.position.x),
	// // 		(-(this.position.y+player.position.y) * this.scale.y + player.position.y));
	// // }
	// }
}
class Sprite{
	constructor({position, imageSrc, scale=1}){
		this.position = position;
		this.image = new Image();
		this.image.src = imageSrc;
		this.scale = scale
		//changescene = 1 if want to go right,
		//changescene = -1 if want to go left scene
		this.changescene = 0;
	}
	draw(camera){
		if (!this.image){
			console.log('image not loaded');
			return;
		}
		// console.log('loaded');
		c.drawImage(this.image, this.position.x-camera.position.x, this.position.y-camera.position.y,
				this.image.width * this.scale, this.image.height * this.scale);
	}
	update(camera){
		this.draw(camera); 
	}
	
}

class Base{
	constructor(){
		this.y = 701;
		this.outlinewidth = 1;
		this.outlineinnerwidth=2;
	}
	draw(camera){
		c.fillStyle='black';
		c.fillRect(-canvas.width,this.y-camera.position.y, 2*canvas.width, this.outlinewidth);
		c.fillStyle='white';
		c.fillRect(-canvas.width,this.y-camera.position.y+this.outlinewidth, 2*canvas.width, this.outlineinnerwidth-this.outlinewidth);
		c.globalAlpha = 0.92;
		c.fillStyle='black';
		c.fillRect(-canvas.width,this.y+this.outlinewidth+this.outlineinnerwidth-camera.position.y, 2*canvas.width, canvas.height);
		c.globalAlpha = 1;
	}
	update(camera){
		this.draw(camera); 
	}
}

class Player{
	constructor(){
		this.antigravity = false;
		this.maxspeed=6;
		this.stable_width = 50;
		this.stable_height = 50;
		this.position = {
			x: canvas.width/2-this.stable_width/2,
			y: floor,
		}
		this.width = 50;
		this.height = 50;
		this.floor_y = floor;
		this.prevv= {
			x:0,
			y:1,
		}
		this.velocity = {
			x: 0,
			y: 1,
		}
		this.acceleration = {
			x: 0,
			y: gravity,
		}
		this.squishy = 1;
		this.hitfloor = false;
	}

	draw(offset){
		c.fillStyle = 'yellow';
		c.fillRect(
			this.position.x - (this.width/2)*(1-this.squishy) - offset.position.x-1,
			this.position.y + (this.height)*(1-this.squishy) - offset.position.y-1,
			// this.position.x - (this.width/2)*(1-this.squishy) - offset.position.x-c.getTransform().e,
			// this.position.y + (this.height)*(1-this.squishy) - offset.position.y-c.getTransform().f,
			this.width+2,
			this.height+2
		);
		c.fillStyle = 'black';
		c.fillRect(
			this.position.x - (this.width/2)*(1-this.squishy) - offset.position.x,
			this.position.y + (this.height)*(1-this.squishy) - offset.position.y,
			// this.position.x - (this.width/2)*(1-this.squishy) - offset.position.x-c.getTransform().e,
			// this.position.y + (this.height)*(1-this.squishy) - offset.position.y-c.getTransform().f,
			this.width,
			this.height
		);
	}

	update(offset, scene){
		this.draw(offset);
		this.hitfloor = false;
		this.prevv.x = this.velocity.x;
		this.prevv.y = this.velocity.y;


		//position checks
		//first level
		if (this.position.y >= floor && this.velocity.y > 0){
			this.hitfloor = true;
			this.floor_y = floor;
		}	

		//second level	
		// if (this.position.y >= 500 && this.velocity.y > 0){
		// 	this.hitfloor = true;
		// 	this.floor_y = 500;
		// }		
		//left boundary
		if (this.position.x<=scene.boundaries.left && this.velocity.x < 0){
			//change scene?
			this.changescene=-1;
			this.velocity.x = 0;
			this.position.x = scene.boundaries.left;
		}
		//right boundary
		if (this.position.x+this.stable_width >= scene.boundaries.right && this.velocity.x > 0){
			this.changescene=1;
			this.velocity.x = 0;
			this.position.x = scene.boundaries.right - this.stable_width;
		}



		///////////////////
		//velocity
		if (this.hitfloor ){
			this.velocity.y = 0;
			this.squishy = 1;
		}
		else{
			if (this.antigravity && this.velocity.y >0){
				this.velocity.y = 0;
				this.squishy = 1;
			}
			this.position.y += this.velocity.y;
			if (this.position.y > this.floor_y){
				this.position.y = this.floor_y;
			}
		}
		


		this.velocity.y += this.acceleration.y;
		this.velocity.x += this.acceleration.x;
		//gravity
		if (this.velocity.y < -12){
			this.acceleration.y = gravity;
		}
		//gravity
		if (this.velocity.x >this.maxspeed){
			this.velocity.x = this.maxspeed;
		}
		if (this.velocity.x < -this.maxspeed){
			this.velocity.x = -this.maxspeed;
		}
		this.position.x += this.velocity.x;

		if (this.squishy < 1.9 && this.squishy > 0.1){
			this.squishy = 1 + this.velocity.y/50;
		}
		this.width = (this.stable_width)*(2-this.squishy);
		this.height = (this.stable_height)*(this.squishy);
		
	}
}