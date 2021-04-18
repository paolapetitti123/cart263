class Key extends Item {
  constructor(p,x,y,image){
    super(p,x,y,image);
    this.found = false;
    this.rotationSpeed = 0.25;
    this.active = true;
  }

  update(){
    super.update();
    if(this.found){
      this.active = false;
    }
  }
  mousePressed(){
    if(this.p.mouseX > this.x - this.image.width/2 &&
     this.p.mouseX < this.x + this.image.width/2 &&
     this.p.mouseY > this.y - this.image.height/2 &&
     this.p.mouseY < this.y + this.image.height/2){
       this.found = true;
  }
  }
}
