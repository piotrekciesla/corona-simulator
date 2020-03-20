import humanStateColors from './humanStateColors.js';

let healthy = [];
let sick = [];
let immune = [];
let dead = [];

const statisticsHeight = 100;

class StatisticsRenderer {
  constructor(sk) {
    this.sk = sk;
  }

  draw() {
    this.updateData();
    this.drawData();
  };

  updateData() {
    const width = Math.round(this.sk.width);
    for ( let i = 1; i < width; i++ ) {
      sick[i - 1] = sick[i] || 0;
      immune[i - 1] = immune[i] || 0;
      dead[i - 1] = dead[i] || 0;
    }

    healthy[width-1] = document.humanStatesCount.healthy / document.humanStatesCount.total * statisticsHeight;
    sick[width-1] = document.humanStatesCount.sick / document.humanStatesCount.total * statisticsHeight;
    immune[width-1] = document.humanStatesCount.immune / document.humanStatesCount.total * statisticsHeight;
    dead[width-1] = document.humanStatesCount.dead / document.humanStatesCount.total * statisticsHeight;
  }

  drawData() {
    const height = this.sk.height;
    const width = Math.round(this.sk.width);
    this.sk.strokeWeight(2);
    for (let i = 1; i < width; i++) {
      const sickHeight = sick[i];
      const immuneHeight = immune[i];
      const deadHeight = dead[i];

      if (deadHeight > 0){
      this.sk.stroke(humanStateColors.DEAD);
      this.sk.line(
        i,
        height,
        i,
        height - deadHeight
      );
      }

      if (sickHeight > 0) {
        this.sk.stroke(humanStateColors.SICK);
        this.sk.line(
          i,
          height - deadHeight,
          i,
          height - deadHeight - sickHeight
        );
      }

      if (immuneHeight > 0) {
        this.sk.stroke(humanStateColors.IMMUNE);
        this.sk.line(
          i,
          height - deadHeight - sickHeight,
          i,
          height - deadHeight - sickHeight - immuneHeight,
        );
      }
    }
    this.sk.strokeWeight(1);
  }
}

export default StatisticsRenderer;
