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
    const width = this.sk.width;
    for ( let i = 1; i < width; i++ ) {
      healthy[i - 1] = healthy[i];
      sick[i - 1] = sick[i];
      immune[i - 1] = immune[i];
      dead[i - 1] = dead[i];
    }

    healthy[width-1] = document.humanStatesCount.healthy / document.humanStatesCount.total;
    sick[width-1] = document.humanStatesCount.sick / document.humanStatesCount.total;
    immune[width-1] = document.humanStatesCount.immune / document.humanStatesCount.total;
    dead[width-1] = document.humanStatesCount.dead / document.humanStatesCount.total;
  }

  drawData() {
    const height = this.sk.height;
    const width = this.sk.width;
    for (let i = 1; i <= width; i++) {
      const healthyHeight = healthy[i]*statisticsHeight;
      const sickHeight = sick[i]*statisticsHeight;
      const immuneHeight = immune[i]*statisticsHeight;
      const deadHeight = dead[i]*statisticsHeight;

      this.sk.stroke(humanStateColors.DEAD);
      this.sk.line(
        i,
        height,
        i,
        height - deadHeight || height
      );

      this.sk.stroke(humanStateColors.SICK);
      this.sk.line(
        i,
        height - deadHeight || height,
        i,
        height - deadHeight - sickHeight || height
      );

      this.sk.stroke(humanStateColors.IMMUNE);
      this.sk.line(
        i,
        height - deadHeight - sickHeight || height,
        i,
        height - deadHeight - sickHeight - immuneHeight || height,
      );

      this.sk.stroke(humanStateColors.HEALTHY);
      this.sk.line(
        i,
        height - deadHeight - sickHeight - immuneHeight || height,
        i,
        height - deadHeight - sickHeight - immuneHeight - healthyHeight  || height,
      );
    }
  }
}

export default StatisticsRenderer;
