const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;





class Camera{
	constructor(player){
		this.position = {
			x: 0,
			y: 0,

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
}

class Sprite{
	constructor({position, imageSrc, scale=1}){
		this.position = position;
		this.image = new Image();
		this.image.src = imageSrc;
		this.scale = scale
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
		this.width = 50;
		this.height = 50;
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
			(this.width)*(2-this.squishy),
			(this.height)*(this.squishy)
		);
	}

	update(offset){
		this.draw(offset);
		this.hitfloor = false;

		if (this.position.y > 500 && this.velocity.y > 0){
			this.hitfloor = true;
		}			


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
		
	}
}

const player = new Player();
const camera = new Camera(player);
const bg = new Sprite({
	position:{
		x:0,
		y:-100,
	},
	imageSrc: './img/bg.jpg',
	scale: 0.3
});

function animate(){
	window.requestAnimationFrame(animate);
	c.fillStyle='white';
	c.fillRect(0,0,canvas.width, canvas.height);
	bg.update(camera);
	player.update(camera);
	camera.update(player);

}

animate();

window.addEventListener('keydown', (event) =>{
	// console.log(event);
	switch (event.key){
		//movement
		case 'd':
			player.acceleration.x =0.8;
			break;
		case 'a':
			player.acceleration.x =-0.8;
			break;
		case ' ':
			if (player.velocity.y > 0){
				player.velocity.y = 2;
			}
			player.acceleration.y = -5;
			break;

		//squishy?
		case 'k':
			player.squishy+=0.02;
			break;
	}
});


window.addEventListener('keyup', (event) =>{
	// console.log(event);
	switch (event.key){
		case 'd':
			if (player.velocity.x > 0){
				player.acceleration.x = 0;
				player.velocity.x = 0;
			} 
			break;
		case 'a':
			if (player.velocity.x < 0){
				player.acceleration.x = 0;
				player.velocity.x = 0;
			}
			break;
	}

});
