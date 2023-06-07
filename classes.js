const gravity = 0.5;



class Camera{
	constructor(player){
		this.position = {
			x: 0,
			y: 0,

		}
		this.scale = {
			x: 1,
			y: 1,
		}
		this.playeroffset={
			x:canvas.width/2-player.width/2,
			y:5*canvas.height/9,
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
		if (this.position.y+this.playeroffset.y != player.position.y){
			// this.position.x= player.position.x-canvas.width/2;
			//snap in if its close enough
			if (Math.abs(this.position.y+this.playeroffset.y - player.position.y) < 20){
				// this.position.x = player.position.x-canvas.width/2;
				this.position.y += 1/8 * (player.position.y - this.position.y-this.playeroffset.y);
			}
			//SPEED when dropping down
			else if (this.position.y+this.playeroffset.y < player.position.y){
				this.position.y += 1/5 * (player.position.y - this.position.y-this.playeroffset.y);
			}
			//maybe not speed when going up
			else{
				this.position.y += 1/40 * (player.position.y - this.position.y-this.playeroffset.y);
			}
		}

	}
	center(player){
		this.position.x = player.position.x - this.playeroffset.x;
		this.position.y = player.position.y - this.playeroffset.y;
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
		if (!this.image) return;
		c.drawImage(this.image, this.position.x-camera.position.x, this.position.y-camera.position.y,
				this.image.width * this.scale, this.image.height * this.scale);
	}
	update(camera){
		this.draw(camera); 
	}
	
}

class Player{
	constructor(){
		this.position = {
			x: canvas.width/2,
			y: 0,
		}
		this.stable_width = 50;
		this.stable_height = 50;
		this.width = 50;
		this.height = 50;
		this.floor_y = 500;
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


		//position checks
		//first level
		if (this.position.y >= 500 && this.velocity.y > 0){
			this.hitfloor = true;
			this.floor_y = 500;
		}	

		//second level	
		if (this.position.y >= 500 && this.velocity.y > 0){
			this.hitfloor = true;
			this.floor_y = 500;
		}		
		//left boundary
		if (this.position.x<=scene.boundaries.left && this.velocity.x < 0){
			//change scene?
			this.changescene=-1;
			this.velocity.x = 0;
			this.position.x = scene.boundaries.left;
		}
		//right boundary
		if (this.position.x >= scene.boundaries.right && this.velocity.x > 0){
			this.changescene=1;
			this.velocity.x = 0;
			this.position.x = scene.boundaries.right;
		}



		///////////////////
		if (this.hitfloor){
			this.velocity.y = 0;
		}
		else{
			this.position.y += this.velocity.y;
		}
		this.velocity.y += this.acceleration.y;
		this.velocity.x += this.acceleration.x;
		if (this.velocity.y < -12){
			this.acceleration.y = gravity;
		}
		if (this.velocity.x >6){
			this.velocity.x = 6;
		}
		if (this.velocity.x < -6){
			this.velocity.x = -6;
		}
		this.position.x += this.velocity.x;

		this.squishy = 1 + this.velocity.y/50;
		this.width = (this.stable_width)*(2-this.squishy);
		this.height = (this.stable_height)*(this.squishy);
		
	}
}