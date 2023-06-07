// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function animate(){
	window.requestAnimationFrame(animate);
	c.fillStyle='white';
	c.fillRect(-4*canvas.width,-4*canvas.height,8*canvas.width, 8*canvas.height);
	console.log(player.changescene);

	scenes[currentscene].update(camera);

	//switch scenes if needed
	if (player.changescene == 1 && currentscene < scenes.length-1){
		player.changescene = 0;
		//move right scene if possible
		currentscene++;
		//reset player position
		player.position.x = scenes[currentscene].boundaries.left+100;
		//center camera
		camera.center(player);

	}
	else if (player.changescene == -1 && currentscene > 0){
		player.changescene = 0;
		//move left if possible
		currentscene--;
		//reset player position
		player.position.x = scenes[currentscene].boundaries.right-100;
		//center camera
		camera.center(player);
	}

	player.update(camera, scene1);
	camera.update(player);
	// camera.updateview(player);
	

}

animate();

window.addEventListener('keydown', (event) =>{
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

		//squishy?
		// case 'k':
		// 	player.squishy+=0.02;
		// 	break;
	}
});


window.addEventListener('keyup', (event) =>{
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

window.addEventListener("wheel", (event) => {
	// console.log(event.deltaY);
	camera.zoom(event.deltaY);
});
