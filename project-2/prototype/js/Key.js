class Key extends Item {
  constructor(x,y,image){
    super(x,y,image);
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
    if(mouseX > this.x - this.image.width/2 &&
     mouseX < this.x + this.image.width/2 &&
     mouseY > this.y - this.image.height/2 &&
     mouseY < this.y + this.image.height/2){
       this.found = true;
  }
  }
}
