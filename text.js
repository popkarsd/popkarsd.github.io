const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Text{
	constructor({text, position,font='50pt Verdana'}){
		this.orig_text = text;
		this.text = '';
		this.displayposition = 0;
		this.frameelapsed=0;
		this.dashelapsed=0;
		this.position = {
			x: position.x,
			y: position.y
		}
		this.font = font;
	}
	update(){
		if (this.displayposition < this.orig_text.length && this.frameelapsed == 0){
			this.displayposition++;
			this.frameelapsed++;
		}
		else if (this.frameelapsed != 0){
			this.frameelapsed = (this.frameelapsed+1)%6;
		}
		this.text = this.orig_text.substring(0,this.displayposition);


		//get the typewriter effect
		this.dashelapsed  = (this.dashelapsed+1)%50;
		if (this.dashelapsed >= 24){this.text += '|';}
	}
	draw(offset){
		// this.position.x = canvas.width/2 - c.measureText(this.text).width/2;

		c.fillStyle = 'white';
		c.strokeStyle = 'black';
		c.lineWidth=1;

		c.font = this.font;
		// context.fillText('Some text', this.position.x, 50);
		c.fillText(this.text,this.position.x-offset.position.x, this.position.y-offset.position.y);
		c.strokeText(this.text,this.position.x-offset.position.x, this.position.y-offset.position.y);

	}
}

class Seriestext{
	//list of text
	constructor({textlist, timelist}){
		this.starttime = new Date();
		this.textlist = textlist;
		this.timelist = timelist;
		this.display = true;
		this.currentdisplay=0;
	}
	update(camera){
		this.draw(camera);
		let now = new Date();
		if (this.currentdisplay <= this.textlist.length-1 && now-this.starttime >= this.timelist[this.currentdisplay+1]){
			this.textlist[this.currentdisplay].text = this.textlist[this.currentdisplay].orig_text;
			this.currentdisplay++;
		}	
		//actively flash through the current text
		if (this.currentdisplay < this.textlist.length){
			this.textlist[this.currentdisplay].update();
		}
	}
	draw(camera){
		if (this.display){
			this.textlist.forEach(item => item.draw(camera));
		}
	}

}