export default class Emoji {
  constructor(width, emojiCode) {
    console.log(emojiCode)
    this.code = emojiCode;
    this.x = Math.random() * (width - 0) + 0;
    this.y = 0;
    this.speed = Math.random() * (2 - 0.5) + 0.5;
    this.scale = Math.random() * (50 - 20) + 20;
  }

  draw() {
    this.y += this.speed;
  }
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}