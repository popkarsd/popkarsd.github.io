const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;

class Player{
	constructor(){
		this.position = {
			x: 0,
			y: 0,
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

	draw(){
		c.fillStyle = 'red';
		c.fillRect(this.position.x,
				this.position.y + 50*(1-this.squishy),
				50*(2-this.squishy),
				50*(this.squishy));
	}

	update(){
		this.draw();
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
		if (this.velocity.x >5){
			this.velocity.x = 5;
		}
		if (this.velocity.x < -5){
			this.velocity.x = -5;
		}
		this.position.x += this.velocity.x;

		this.squishy = 1 + this.velocity.y/50;
		
	}
}

const player = new Player();

function animate(){
	window.requestAnimationFrame(animate);
	c.fillStyle='white';
	c.fillRect(0,0,canvas.width, canvas.height);
	player.update();

}

animate();

window.addEventListener('keydown', (event) =>{
	console.log(event);
	switch (event.key){
		//movement
		case 'd':
			player.acceleration.x =0.8;
			// player.velocity.x = 4;
			break;
		case 'a':
			player.acceleration.x =-0.8;
			// player.velocity.x = -4;
			break;
		case ' ':
			if (player.velocity.y > 0){
				player.velocity.y = 2;
			}
			player.acceleration.y = -5;
			// player.velocity.y = -12;
			break;

		//squishy?
		case 'k':
			player.squishy+=0.02;
			break;
	}
});


window.addEventListener('keyup', (event) =>{
	console.log(event);
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
