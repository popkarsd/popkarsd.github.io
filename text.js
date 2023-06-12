const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

class Text{
	constructor({text, position,font='50pt Helvetica', displayspeed=6, align='center'}){
		this.orig_text = text;
		this.text = '';
		this.displayposition = 0;
		this.frameelapsed=0;
		this.dashelapsed=0;
		this.displayspeed=displayspeed;
		this.position = {
			x: position.x,
			y: position.y,
		}
		this.font = font;
		this.align = align;
		this.spacing = 4;
	}
	reset(){
		this.text='';
		this.displayposition = 0;
		this.dashelapsed=0;
	}
	update(){
		if (this.displayposition < this.orig_text.length && this.frameelapsed == 0){
			this.displayposition++;
			this.frameelapsed++;
		}
		else if (this.frameelapsed != 0){
			this.frameelapsed = (this.frameelapsed+1)%this.displayspeed;
		}
		this.text = this.orig_text.substring(0,this.displayposition);


		//get the typewriter effect
		this.dashelapsed  = (this.dashelapsed+1)%(48);
		if (this.dashelapsed >= 24){this.text += '|';}
	}
	fillTextMultiLine(text, x, y, align='left') {
  		var lineHeight = c.measureText("M").width * 1.2;
  		var lines = text.split("\n");
  		for (var i = 0; i < lines.length; ++i) {
  			if (align == 'left'){
  				c.fillText(lines[i], x, y);
  			}
  			else if (align == 'center'){
  				if (text.slice(-1) == '|' && i == lines.length-1){
  					c.fillText(lines[i], x-getTextWidth(lines[i].slice(0,-1), this.font)/2, y);
  				}
  				else{
  					c.fillText(lines[i], x-getTextWidth(lines[i], this.font)/2, y);
  				}
  			}
  			else if (align == 'right'){
  				if (text.slice(-1) == '|'&& i == lines.length-1){
  					c.fillText(lines[i], x-getTextWidth(lines[i].slice(0,-1), this.font), y);
  				}
  				else{
  					c.fillText(lines[i], x-getTextWidth(lines[i], this.font), y);
  				}
  			}
    		
    		y += lineHeight + this.spacing;
  		}
	}
	strokeTextMultiLine(text, x, y, align='left') {
  		var lineHeight = c.measureText("M").width * 1.2;
  		var lines = text.split("\n");
  		for (var i = 0; i < lines.length; ++i) {
    		if (align == 'left'){
  				c.strokeText(lines[i], x, y);
  			}
  			else if (align == 'center'){
  				if (text.slice(-1) == '|' && i == lines.length-1){
  					c.strokeText(lines[i], x-getTextWidth(lines[i].slice(0,-1), this.font)/2, y);
  				}
  				else{
  					c.strokeText(lines[i], x-getTextWidth(lines[i], this.font)/2, y);
  				}
  			}
  			else if (align == 'right'){
  				if (text.slice(-1) == '|'&& i == lines.length-1){
  					c.strokeText(lines[i], x-getTextWidth(lines[i].slice(0,-1), this.font), y);
  				}
  				else{
  					c.strokeText(lines[i], x-getTextWidth(lines[i], this.font), y);
  				}
  			}
    		y += lineHeight + this.spacing;
  		}
	}
	draw(offset){
		// this.position.x = canvas.width/2 - c.measureText(this.text).width/2;

		c.fillStyle = 'black';
		c.strokeStyle = 'black';
		c.lineWidth=0;

		c.font = this.font;
		// context.fillText('Some text', this.position.x, 50);
		if (this.align != 'left' && this.align != 'right' && this.align != 'center'){
			console.log('textalignment for ' + this.orig_text + ' is undefined');
			return;
		} 
		if (this.align == 'left'){
			this.fillTextMultiLine(this.text,this.position.x-offset.position.x, this.position.y-offset.position.y);
			this.strokeTextMultiLine(this.text,this.position.x-offset.position.x, this.position.y-offset.position.y);
		}
		else if (this.align == 'center'){
			this.fillTextMultiLine(this.text,this.position.x-offset.position.x,
			 this.position.y-offset.position.y, this.align);
			this.strokeTextMultiLine(this.text,this.position.x-offset.position.x,
			 this.position.y-offset.position.y, this.align);
		}
		else if (this.align == 'right'){
			this.fillTextMultiLine(this.text,this.position.x-offset.position.x,
			 this.position.y-offset.position.y, this.align);
			this.strokeTextMultiLine(this.text,this.position.x-offset.position.x,
			 this.position.y-offset.position.y, this.align);
		}
		else if (this.align == 'center-right'){

		}

	}
}

class Seriestext{
	//list of text
	constructor({textlist, timelist}){
		this.starttime = new Date();
		this.textlist = textlist;
		this.timelist = timelist;
		this.display = true;
		this.currentdisplay=-1;
	}
	reset(){
		//reset each text
		this.currentdisplay = 0;
		this.textlist.forEach(item=>{
			item.reset();
		});
	}
	start(){
		// this.reset();
		this.starttime = new Date();
	}

	update(camera){
		this.draw(camera);
		let now = new Date();
		if (this.currentdisplay <= this.textlist.length-1 && now-this.starttime >= this.timelist[this.currentdisplay+1]){
			if (this.currentdisplay >=0 ){
				this.textlist[this.currentdisplay].text = this.textlist[this.currentdisplay].orig_text;
			}
			this.currentdisplay++;
		}	
		//actively flash through the current text
		if (this.currentdisplay < this.textlist.length && this.currentdisplay >=0){
			this.textlist[this.currentdisplay].update();
		}
	}
	draw(camera){
		if (this.display){
			this.textlist.forEach(item => item.draw(camera));
		}
	}

}