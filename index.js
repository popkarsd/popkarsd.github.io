// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');

let currentscene = 0;
const scenes = [scene1, scene2, scene3];
const base = new Base();
let introseq = true;
let starttime = new Date();
let currenttime = new Date();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

particlesJS.load('particles-js', 'particles/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

function animate(){
	currenttime = new Date();
	if (currenttime-starttime > 8000) introseq = false;
	window.requestAnimationFrame(animate);
	//draw dark background
	c.fillStyle="rgba(250, 250, 250, 0.5)";
	c.fillRect(-4*canvas.width,-4*canvas.height,8*canvas.width, 8*canvas.height);

	//update particles
	window.pJSDom[0].pJS.switchdir = false;
	if (player.velocity.x > 0 && player.prevv.x <= 0){
		console.log("left");
		window.pJSDom[0].pJS.switchdir = true;
		window.pJSDom[0].pJS.particles.move.direction="left";
	}
	else if (player.velocity.x < 0 && player.prevv.x >= 0){
		window.pJSDom[0].pJS.switchdir = true;
		window.pJSDom[0].pJS.particles.move.direction="right";
	}
	else if (player.velocity.x == 0 && player.prevv.x != 0){
		window.pJSDom[0].pJS.switchdir = true;
		window.pJSDom[0].pJS.particles.move.direction="random";
	}
	//switch speed
	if (player.velocity.x != 0){
		window.pJSDom[0].pJS.particles.move.speed =1+Math.abs(player.velocity.x)/15;
	}
	else{
		window.pJSDom[0].pJS.particles.move.speed =1;
	}

	// console.log(player.changescene);
	base.update(camera);
	scenes[currentscene].update(camera);
	// draw object that the player is sliding on



	// console.log(scenes[currentscene].textseries.currentdisplay);

	//switch scenes if needed
	if (player.changescene == 1 && currentscene < scenes.length-1){
		player.changescene = 0;
		//move right scene if possible
		currentscene++;
		scenes[currentscene].textseries.start();
		//reset player position
		player.position.x = scenes[currentscene].boundaries.left+100;
		//center camera
		camera.center(player);

	}
	else if (player.changescene == -1 && currentscene > 0){
		player.changescene = 0;
		//move left if possible
		currentscene--;
		scenes[currentscene].textseries.start();
		//reset player position
		player.position.x = scenes[currentscene].boundaries.right-100;
		//center camera
		camera.center(player);
	}
	camera.update(player);
	if (introseq){
		return;
	}
	player.update(camera, scenes[currentscene]);
	
	// camera.updateview(player);
	

}

animate();

window.addEventListener('keydown', (event) =>{
	if (event.key == 'i'){
		introseq = false;
	}
	if (introseq){
		return;
	}
	console.log(event);
	switch (event.key){
		//movement
		case 'ArrowRight':
		case 'd':
			player.acceleration.x =0.8;
			break;
		case 'ArrowLeft':
		case 'a':
			player.acceleration.x =-0.8;
			break;
		case 'w':
		case 'ArrowUp':
		case ' ':
			if (player.velocity.y > 0){
				player.velocity.y = 2;
			}
			player.acceleration.y = -5;
			break;
		case 'p':
			player.maxspeed= 20-player.maxspeed;
			break;
		case 'g':
			player.antigravity = !player.antigravity;

		//squishy?
		// case 'k':
		// 	player.squishy+=0.02;
		// 	break;
	}
});


window.addEventListener('keyup', (event) =>{
	if (introseq){
		return;
	}
	// console.log(event);
	switch (event.key){
		case 'ArrowRight':
		case 'd':
			if (player.velocity.x > 0){
				player.acceleration.x = 0;
				player.velocity.x = 0;
			} 
			break;
		case 'ArrowLeft':
		case 'a':
			if (player.velocity.x < 0){
				player.acceleration.x = 0;
				player.velocity.x = 0;
			}
			break;
	}

});

// window.addEventListener("wheel", (event) => {
// 	// console.log(event.deltaY);
// 	camera.zoom(event.deltaY);
// });
