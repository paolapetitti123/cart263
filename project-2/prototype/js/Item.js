class Item {
  constructor(p,x, y, image) {
    this.x = x;
    this.y = y;
    this.p = p;
    this.image = image;
    this.angle = 0;
  }

  update() {
    this.display();
  }

  display() {
    this.p.push();
    this.p.imageMode(this.p.CENTER);
    this.p.translate(this.x, this.y);
    this.p.rotate(this.angle);
    this.p.image(this.image, 0, 0);
    this.p.pop();
  }
}
