xtransform(y, player){
	return ((y-this.position.x)-player.position.x) * this.scale.x + player.position.x;
}
ytransform(y, player){
	return ((y-this.position.y)-player.position.y) * this.scale.y + player.position.y;
}

TRSdrawImage(object, player){
	if (!object.image) return;
	c.drawImage(object.image, 
		this.xtransform(object.position.x, player), 
		this.ytransform(object.position.y, player),
		object.image.width * this.scale.x*object.scale, 
		object.image.height * this.scale.y*object.scale);
}
TRSdrawText(text, player){
	c.fillStyle = 'white';
	c.strokeStyle = 'black';
	c.lineWidth=1;

	c.font = this.font;
	// context.fillText('Some text', this.position.x, 50);
	c.fillText(this.text,
		this.xtransform(text.position.x, player), 
		this.xtransform(text.position.y, player));
	c.strokeText(this.text,
		this.xtransform(text.position.x, player), 
		this.xtransform(text.position.y, player));
}
zoom(deltaY){
	//at most 2, at l
	if (deltaY > 0){
		//zoom in -> scale up
		if (this.scale.x < 2){
			this.scale.x += deltaY/5000;
			if (this.scale.x > 2){
				this.scale.x = 2;
			}
		}
		if (this.scale.y < 2){
			this.scale.y += deltaY/5000;
			if (this.scale.y > 2){
				this.scale.y = 2;
			}
		}
	}
	else{
		//zoom out
		if (this.scale.x > 0.5){
			this.scale.x += deltaY/5000;
			if (this.scale.x < 0.5){
				this.scale.x = 0.5;
			}
		}
		if (this.scale.y > 0.5){
			this.scale.y += deltaY/5000;
			if (this.scale.y < 0.5){
				this.scale.y = 0.5;
			}
		}
	}
	// console.log(this.scale.x);
}