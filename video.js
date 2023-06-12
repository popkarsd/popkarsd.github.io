class GIFSprite{
	constructor({position, gifSrc, scale=1, border=0}){
		//name & numpics
		this.position = position;
		this.imageseq = [];
		this.gifSrc =gifSrc;
		this.loop = true;
		this.currentimage = 0;
		for (var i = 0; i < gifSrc.numpics; i++) {
  			this.imageseq[i] = new Image();
  			this.imageseq[i].src = "./gif/"+this.gifSrc.name+"/"+(i+1)+".jpg";
		}
		this.image = this.imageseq[0];
		this.scale = scale;
		this.border = border;

	}
	draw(camera){
		if (this.currentimage >= 2*this.gifSrc.numpics){
			this.currentimage = this.gifSrc.numpics-1;
		}
		//odd or even
		if (this.currentimage %2 == 1){
			this.image = this.imageseq[(this.currentimage-1)/2];
		}
		else{
			this.image = this.imageseq[this.currentimage/2-1];
		}
		
		if (!this.image) return;
		if (this.border > 0){
			c.fillStyle = 'blue';
			c.fillRect(this.position.x-camera.position.x-this.border-this.image.width/2*this.scale, this.position.y-camera.position.y-this.border,
				this.image.width * this.scale+2*this.border, this.image.height * this.scale+2*this.border);

		}
		c.drawImage(this.image, this.position.x-camera.position.x-this.image.width/2*this.scale, this.position.y-camera.position.y,
				this.image.width * this.scale, this.image.height * this.scale);
	}
	update(camera){
		this.draw(camera); 
		this.currentimage++;
		if (this.loop) this.currentimage %= 2*this.gifSrc.numpics;
		if (this.currentimage == 0) this.currentimage++;

	}
}