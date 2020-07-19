export default class Emoji {
  constructor(canvas, emojiCode) {
    this.code = emojiCode;
    this.x = Math.random() * (canvas.width - 0) + 0;
    this.y = 0;
    this.speed = Math.random() * (3 - 1) + 1;
    this.scale = Math.random() * (20 - 5) + 5;
  }

  draw() {
    this.y += this.speed;
  }
}