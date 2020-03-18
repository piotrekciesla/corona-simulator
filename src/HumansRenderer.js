class HumansRenderer {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.

  constructor(sk) {
    this.sk = sk;
  }

  draw(humans) {
    humans.forEach((human, index) => {
      this.drawHuman(human);
      this.drawEncounters(human, humans.slice(index));
    });
  };

  drawHuman(human) {
    this.sk.noStroke();
    this.sk.fill("rgba(200,169,169,0.5)");

    if ( human.isSick() ) {
      this.sk.fill("rgba(200,1,0,0.5)");
    }

    if ( human.isDead() ) {
      this.sk.fill("rgba(3,0,98,0.77)");
    }

    if ( human.isImmune() ) {
      this.sk.fill("rgba(0,200,19,0.59)");
    }

    this.sk.circle(human.x, human.y, human.r*2);

  }

  drawEncounters(human, humans) {
    humans.forEach(humanEncountered => {
      if ( !(human.isSick() || humanEncountered.isSick()) ||
        human.isImmune() ||
        human.isDead() ||
        humanEncountered.isImmune() ||
        humanEncountered.isDead()
      ) {
        return;
      }

      let distance = this.sk.dist(human.x, human.y, humanEncountered.x, humanEncountered.y);
      if ( distance < 80 ) {
        const distancePercent = distance - 40 > 0 ? distance - 40 : 0;
        const opacity = Math.round((distancePercent / 40) * 100) / 100;
        const whiteRemaining = Math.round(255 * opacity);

        this.sk.stroke(`rgba(255,${ whiteRemaining },${ whiteRemaining },${ 1-opacity })`);
        this.sk.line(human.x, human.y, humanEncountered.x, humanEncountered.y);
      }
    });
  }

}

export default HumansRenderer;
