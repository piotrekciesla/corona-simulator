const getInfectionDistance = () => document.getElementById('infectionDistance').value;
import humanStatesColors from "./humanStateColors";
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
    this.sk.fill(humanStatesColors.HEALTHY);

    if ( human.isSick() ) {
      this.sk.fill(humanStatesColors.SICK);
    }

    if ( human.isDead() ) {
      this.sk.fill(humanStatesColors.DEAD);
    }

    if ( human.isImmune() ) {
      this.sk.fill(humanStatesColors.IMMUNE);
    }

    this.sk.circle(human.x, human.y, human.r*2);

  }

  drawEncounters(human, humans) {
    const infectionDistance = getInfectionDistance();
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
      if ( distance < infectionDistance * 2 ) {
        const distancePercent = distance - infectionDistance > 0 ? distance - infectionDistance : 0;
        const opacity = Math.round((distancePercent / infectionDistance) * 100) / 100;
        const whiteRemaining = Math.round(255 * opacity);

        this.sk.stroke(`rgba(255,${ whiteRemaining },${ whiteRemaining },${ 1-opacity })`);
        this.sk.line(human.x, human.y, humanEncountered.x, humanEncountered.y);
      }
    });
  }

}

export default HumansRenderer;
