export default class Laser {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 2;
    this.height = 10;
    this.color = "red";
    this.speed = 20;
    this.active = false;
  }
  update() {
    if (this.active) {
      this.y = -this.speed;
      if (this.y < 0) {
        this.active = false;
      }
    }
  }
  draw() {
    if (this.active) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
